import { api } from '~/utils/api';

type UseToggleLikeProps = {
    id: string;
    user: {
        id: string;
        name?: string;
        image?: string;
    };
};

const useToggleLike = (props: UseToggleLikeProps) => {
    const trpcUtils = api.useContext();

    const toggleLike = api.tweet.toggleLike.useMutation({
        onSuccess: async ({ addedLike }) => {
            const updateData: Parameters<
                typeof trpcUtils.tweet.infiniteFeed.setInfiniteData
            >[1] = (oldData) => {
                if (oldData == null) return;

                const countModifier = addedLike ? 1 : -1;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => {
                        return {
                            ...page,
                            tweets: page.tweets.map((tweet) => {
                                if (tweet.id === props.id) {
                                    return {
                                        ...tweet,
                                        likeCount:
                                            tweet.likeCount + countModifier,
                                        likedByMe: addedLike,
                                    };
                                }

                                return tweet;
                            }),
                        };
                    }),
                };
            };

            trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
            trpcUtils.tweet.infiniteFeed.setInfiniteData(
                { onlyFollowing: true },
                updateData,
            );
            trpcUtils.tweet.infiniteProfileFeed.setInfiniteData(
                { userId: props.user.id },
                updateData,
            );
            await trpcUtils.tweet.getTweetById.refetch({ id: props.id });
        },
    });

    return toggleLike;
};

export default useToggleLike;
