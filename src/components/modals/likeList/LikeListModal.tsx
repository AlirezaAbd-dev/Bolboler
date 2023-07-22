import { api } from '~/utils/api';

import { LoadingSpinner } from '../../LoadingSpinner';
import InfiniteScroll from '../../ui/InfiniteScroll';
import LikeList from './LikeList';
import LikeListLayout from './LikeListLayout';

type LikeListModalProps = {
    openModal: () => void;
    closeModal: () => void;
    modalIsOpen: boolean;
    tweetId: string;
};

function LikeListModal(props: LikeListModalProps) {
    const likeList = api.tweet.likesList.useInfiniteQuery(
        { limit: 20, tweetId: props.tweetId },
        { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

    return (
        <LikeListLayout
            closeModal={props.closeModal}
            modalIsOpen={props.modalIsOpen}
        >
            {/* Loading spinner */}
            {likeList.isLoading && <LoadingSpinner />}

            {likeList.data?.pages.flatMap((data) => data.likeList).length ===
                0 && (
                <p className="my-5 text-center text-lg text-gray-400">
                    Nobody likes your tweet!
                </p>
            )}

            {/* List goes here */}
            {likeList.isSuccess && (
                <ul className="container mt-4 flex max-h-[70vh] flex-col overflow-y-auto">
                    <InfiniteScroll
                        fetchNewTweets={likeList.fetchNextPage}
                        hasMore={likeList.hasNextPage}
                        loader={<LoadingSpinner />}
                        threshold={1}
                    >
                        {likeList.data?.pages
                            .flatMap((data) => data.likeList)
                            .map((like) => (
                                <LikeList
                                    key={like.userId + like.tweetId}
                                    userId={like.userId}
                                    userImage={like.user.image}
                                    userName={like.user.name}
                                />
                            ))}
                    </InfiniteScroll>
                </ul>
            )}
        </LikeListLayout>
    );
}

export default LikeListModal;
