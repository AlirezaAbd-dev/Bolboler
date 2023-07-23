import Link from 'next/link';
import { useState } from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import { api } from '~/utils/api';
import getPlural from '~/utils/getPlural';

import { IconHoverEffect } from './IconHoverEffect';
import { ProfileImage } from './ProfileImage';
import FollowerListModal from './modals/followerList/FollowerListModal';
import FollowButton from './ui/FollowButton';

const ProfileHeader = ({ id }: { id: string }) => {
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

    const { data: profile } = api.profile.getById.useQuery({ id });
    const trpcUtils = api.useContext();
    const toggleFollow = api.profile.toggleFollow.useMutation({
        onSuccess: ({ addedFollow }) => {
            trpcUtils.profile.getById.setData({ id }, (oldData) => {
                if (oldData == null) return;

                const countModifier = addedFollow ? 1 : -1;
                return {
                    ...oldData,
                    isFollowing: addedFollow,
                    followersCount: oldData.followersCount + countModifier,
                };
            });
        },
    });

    api.profile.getFollowersById.useQuery({ userId: id });

    function openModal() {
        setIsFollowersModalOpen(true);
    }

    function closeModal() {
        setIsFollowersModalOpen(false);
    }

    if (profile == null || profile.name == null) {
        return null;
    }

    return (
        <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
            <Link href=".." className="mr-2">
                <IconHoverEffect>
                    <VscArrowLeft className="h-6 w-6" />
                </IconHoverEffect>
            </Link>
            <ProfileImage src={profile.image} className="flex-shrink-0" />
            <div className="ml-2 flex-grow">
                <h1 className="text-lg font-bold">{profile.name}</h1>
                <div className="text-gray-500">
                    {/* Tweets count */}
                    {profile.tweetsCount}{' '}
                    {getPlural(profile.tweetsCount, 'Tweet', 'Tweets')} -{' '}
                    <span
                        className="inline-block cursor-pointer"
                        onClick={openModal}
                    >
                        {/* Followers */}
                        {profile.followersCount}{' '}
                        {getPlural(
                            profile.followersCount,
                            'Follower',
                            'Followers',
                        )}{' '}
                    </span>
                    <span>
                        {/* Followings */}- {profile.followsCount} Following
                    </span>
                </div>
            </div>
            <FollowButton
                isFollowing={profile.isFollowing}
                isLoading={toggleFollow.isLoading}
                userId={id}
                onClick={() => toggleFollow.mutate({ userId: id })}
            />
            {/* <FollowerListModal
                closeModal={closeModal}
                isModalOpen={isFollowersModalOpen}
            /> */}
        </header>
    );
};

export default ProfileHeader;
