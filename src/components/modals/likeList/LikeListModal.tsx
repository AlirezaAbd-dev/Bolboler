import InfiniteScroll from '../../ui/InfiniteScroll';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import ModalLayout from '../ModalLayout';
import LikeList from './LikeList';

import { api } from '~/utils/api';

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
        <ModalLayout
            closeModal={props.closeModal}
            modalIsOpen={props.modalIsOpen}
            title="Tweet Like List"
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
        </ModalLayout>
    );
}

export default LikeListModal;
