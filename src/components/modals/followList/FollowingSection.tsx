import { LoadingSpinner } from '~/components/LoadingSpinner';
import { api } from '~/utils/api';

import FollowList from './FollowList';

type FollowersSectionProps = {
    userId: string;
};

const FollowersSection = (props: FollowersSectionProps) => {
    const following = api.profile.getFollowingById.useQuery({
        userId: props.userId,
    });

    return (
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
    );
};

export default FollowersSection;
