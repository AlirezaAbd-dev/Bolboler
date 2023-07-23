import { LoadingSpinner } from '~/components/LoadingSpinner';
import { api } from '~/utils/api';

import FollowList from './FollowList';

type FollowersSectionProps = {
    userId: string;
};

const FollowersSection = (props: FollowersSectionProps) => {
    const followers = api.profile.getFollowersById.useQuery({
        userId: props.userId,
    });

    return (
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
    );
};

export default FollowersSection;
