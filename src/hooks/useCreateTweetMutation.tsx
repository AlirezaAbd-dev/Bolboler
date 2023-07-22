import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

type UseCreateTweetProps = {
    setInputValue: (value: string) => void;
};

const useCreateTweetMutation = (props: UseCreateTweetProps) => {
    const trpcUtils = api.useContext();
    const session = useSession();

    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) => {
            props.setInputValue('');

            if (session.status !== 'authenticated') return;

            trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
                if (oldData == null || oldData.pages[0] == null) return;

                const newCacheTweet = {
                    ...newTweet,
                    likeCount: 0,
                    likedByMe: false,
                    subTweetCount: 0,
                    user: {
                        id: session.data.user.id,
                        name: session.data.user.name || null,
                        image: session.data.user.image || null,
                    },
                };

                return {
                    ...oldData,
                    pages: [
                        {
                            ...oldData.pages[0],
                            tweets: [newCacheTweet, ...oldData.pages[0].tweets],
                        },
                        ...oldData.pages.slice(1),
                    ],
                };
            });
        },
    });

    return createTweet;
};

export default useCreateTweetMutation;
