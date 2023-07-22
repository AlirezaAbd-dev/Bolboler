import { Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useLayoutEffect, useState } from 'react';

import DeleteSubTweetModal from '../modals/DeleteSubTweetModal';
import EditSubTweetForm from '../tweetDetails/EditSubTweetForm';
import SubTweetCardDetails from '../tweetDetails/SubTweetCardDetails';
import type { SubTweetType } from '../tweetDetails/SubTweets';

type SubTweetCardProps = {
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
    timeline?: gsap.core.Timeline;
    subTweet: SubTweetType;
    selectedSubTweetForDelete: string;
    setSelectedSubTweetForDelete: (selectSubTweet: string) => void;
};

const SubTweetCard = (props: SubTweetCardProps) => {
    const session = useSession();
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useLayoutEffect(() => {
        props.timeline?.fromTo('.sub-tweet', { x: '100%' }, { x: 0 });
    }, [props.timeline]);

    const closeEditMode = () => {
        setEditMode(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Content of sub data will go here for showing */}
            <li className="sub-tweet mx-10 flex gap-4 border-b px-4 py-4">
                <SubTweetCardDetails
                    setEditMode={setEditMode}
                    user={props.user}
                    subTweet={props.subTweet}
                    setSelectedSubTweetForDelete={
                        props.setSelectedSubTweetForDelete
                    }
                    openModal={openModal}
                    editMode={editMode}
                />
            </li>

            {/* From for editing sub tweet */}
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
                    <EditSubTweetForm
                        onClose={closeEditMode}
                        subTweetId={props.subTweet.id}
                        subTweetContent={props.subTweet.content}
                        tweetId={props.subTweet.mainTweetId}
                    />
                </Transition>
            )}

            {/* Modal for confirming sub tweet delet process */}
            <DeleteSubTweetModal
                selectedTweet={props.selectedSubTweetForDelete}
                closeModal={closeModal}
                openModal={openModal}
                modalIsOpen={isModalOpen}
                tweetId={props.subTweet.mainTweetId}
            />
        </>
    );
};

export default SubTweetCard;
