import Link from 'next/link';
import { useState } from 'react';
import { VscArrowLeft } from 'react-icons/vsc';

import { IconHoverEffect } from './IconHoverEffect';
import { ProfileImage } from './ProfileImage';
import FollowListModal from './modals/followList/FollowListModal';
import FollowButton from './ui/FollowButton';

import useToggleFollowMutation from '~/hooks/useToggleFollowMutation';
import { api } from '~/utils/api';
import getPlural from '~/utils/getPlural';

const ProfileHeader = ({ id }: { id: string }) => {
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

    const { data: profile } = api.profile.getById.useQuery({ id });

    const toggleFollow = useToggleFollowMutation({ id });

    function openFollowersModal() {
        setIsFollowersModalOpen(true);
    }

    function closeFollowersModal() {
        setIsFollowersModalOpen(false);
    }

    function openFollowingModal() {
        setIsFollowingModalOpen(true);
    }

    function closeFollowingModal() {
        setIsFollowingModalOpen(false);
    }

    if (profile == null || profile.name == null) {
        return null;
    }

    return (
        <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-2">
            <Link href=".." className="mr-2">
                <IconHoverEffect>
                    <VscArrowLeft className="h-4 w-4 md:h-6 md:w-6 dark:fill-white" />
                </IconHoverEffect>
            </Link>
            <ProfileImage src={profile.image} className="flex-shrink-0" />
            <div className="ml-2 flex-grow">
                <h1 className="text-base md:text-lg font-bold dark:text-white">
                    {profile.name}
                </h1>
                <div className="text-xs md:text-base text-gray-500 dark:text-gray-300">
                    {/* Tweets count */}
                    {profile.tweetsCount}{' '}
                    {getPlural(profile.tweetsCount, 'Tweet', 'Tweets')} -{' '}
                    <span
                        className="inline-block cursor-pointer"
                        onClick={openFollowersModal}
                    >
                        {/* Followers */}
                        {profile.followersCount}{' '}
                        {getPlural(
                            profile.followersCount,
                            'Follower',
                            'Followers',
                        )}{' '}
                    </span>
                    <span
                        className="inline-block cursor-pointer"
                        onClick={openFollowingModal}
                    >
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
            <FollowListModal
                mode="Followers"
                closeModal={closeFollowersModal}
                isModalOpen={isFollowersModalOpen}
                userId={id}
            />
            <FollowListModal
                mode="Following"
                closeModal={closeFollowingModal}
                isModalOpen={isFollowingModalOpen}
                userId={id}
            />
        </header>
    );
};

export default ProfileHeader;
