'use client';

import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ProfileImage } from '../ProfileImage';
import DeleteModal from '../modals/DeleteModal';
import Content from './Content';
import EditTweetForm from './EditTweetForm';

export type Tweet = {
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: { id: string; image: string | null; name: string | null };
    subTweetCount: number;
};

type TweetCardProps = Tweet & {
    timeline?: gsap.core.Timeline;
};

const TweetCard = ({
    id,
    user,
    content,
    createdAt,
    likeCount,
    subTweetCount,
    likedByMe,
    timeline,
}: TweetCardProps) => {
    const session = useSession();

    const [editMode, setEditMode] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTweetForDelete, setSelectedTweetForDelete] = useState('');
    const [animatedOnce, setAnimatedOnce] = useState(false);

    const liRef = useRef(null);

    useEffect(() => {
        if (timeline && !animatedOnce) {
            timeline.fromTo(
                liRef.current,
                {
                    x: '100%',
                },
                {
                    x: 0,
                },
            );
            setAnimatedOnce(true);
        }
    }, [animatedOnce, timeline]);

    function selectTweetForDelete(tweetId: string) {
        setSelectedTweetForDelete(tweetId);
    }

    function toggleEditMode() {
        setEditMode((prev) => !prev);
    }

    function closeEditMode() {
        setEditMode(false);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function openModal() {
        setModalIsOpen(true);
    }

    return (
        <li
            ref={liRef}
            className="tweet flex gap-4 border-b dark:border-gray-800 px-4 py-4"
        >
            <Link href={`/profiles/${user.id}`}>
                <ProfileImage src={user.image} />
            </Link>
            <div className="flex flex-grow flex-col">
                {/* //! Delete Modal */}
                {session.data?.user.id === user.id && (
                    <DeleteModal
                        openModal={openModal}
                        closeModal={closeModal}
                        modalIsOpen={modalIsOpen}
                        selectedTweet={selectedTweetForDelete}
                    />
                )}
                {/* //! End of delete modal */}

                {/* Card content */}
                <Content
                    content={content}
                    createdAt={createdAt}
                    editMode={editMode}
                    id={id}
                    likeCount={likeCount}
                    likedByMe={likedByMe}
                    openModal={openModal}
                    selectTweetForDelete={selectTweetForDelete}
                    toggleEditMode={toggleEditMode}
                    user={user}
                    subTweetCount={subTweetCount}
                />

                {/* //* Form for editing tweet */}
                {session.status === 'authenticated' && (
                    <Transition
                        show={editMode}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full opacity-0"
                        enterTo="translate-x-0 opacity-1"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0 opacity-1"
                        leaveTo="-translate-x-full opacity-0"
                    >
                        <EditTweetForm
                            tweetId={id}
                            tweetContent={content}
                            onClose={closeEditMode}
                        />
                    </Transition>
                )}
            </div>
        </li>
    );
};

export default TweetCard;
