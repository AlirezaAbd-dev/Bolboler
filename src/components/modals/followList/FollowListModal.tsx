import { LoadingSpinner } from '~/components/LoadingSpinner';
import { api } from '~/utils/api';

import ModalLayout from '../ModalLayout';
import FollowList from './FollowList';

type FollowerListModalProps = {
    mode: 'Followers' | 'Following';
    userId: string;
    isModalOpen: boolean;
    closeModal: () => void;
};

const FollowerListModal = (props: FollowerListModalProps) => {
    const followers =
        props.mode === 'Followers'
            ? api.profile.getFollowersById.useQuery({
                  userId: props.userId,
              })
            : null;

    const following =
        props.mode === 'Following' &&
        api.profile.getFollowingById.useQuery({ userId: props.userId });

    return (
        <ModalLayout
            closeModal={props.closeModal}
            modalIsOpen={props.isModalOpen}
            title={props.mode}
        >
            {followers && (
                <>
                    {followers.isLoading && <LoadingSpinner />}

                    {followers.isError && (
                        <p className="text-center text-lg text-red-500 py-2">
                            {followers.error.shape?.message}
                        </p>
                    )}

                    {/* If there is no follower */}
                    {followers.data?.followers.length === 0 && (
                        <p className="text-center text-lg text-gray-500 py-2">
                            There is no follower for this user
                        </p>
                    )}

                    {/* Show followers list */}
                    {followers.data?.followers.map((f) => (
                        <FollowList
                            key={f.id}
                            userId={f.id}
                            userImage={f.image}
                            userName={f.name}
                        />
                    ))}
                </>
            )}

            {following && (
                <>
                    {following.isLoading && <LoadingSpinner />}

                    {following.isError && (
                        <p className="text-center text-lg text-red-500 py-2">
                            {following.error.shape?.message}
                        </p>
                    )}

                    {/* If there is no follower */}
                    {following.data?.follows.length === 0 && (
                        <p className="text-center text-lg text-gray-500 py-2">
                            There is no following for this user
                        </p>
                    )}

                    {/* Show following list */}
                    {following.data?.follows.map((f) => (
                        <FollowList
                            key={f.id}
                            userId={f.id}
                            userImage={f.image}
                            userName={f.name}
                        />
                    ))}
                </>
            )}
        </ModalLayout>
    );
};

export default FollowerListModal;
