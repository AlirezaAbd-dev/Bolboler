import { useSession } from 'next-auth/react';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Header from './Header';
import InteractionButtons from './InteractionButtons';
import type { Tweet } from './TweetCard';

type ContentProps = {
    editMode: boolean;
    toggleEditMode: () => void;
    openModal: () => void;
    selectTweetForDelete: (tweetId: string) => void;
} & Tweet;

const Content = (props: ContentProps) => {
    const session = useSession();

    // 
    const editAndDeleteButton = (session.data?.user.id === props.user.id ||
        session.data?.user?.role?.toString() === 'ADMIN') && (
        <>
            <EditButton
                editMode={props.editMode}
                toggleEditMode={props.toggleEditMode}
            />
            <DeleteButton
                id={props.id}
                openModal={props.openModal}
                selectTweetForDelete={props.selectTweetForDelete}
            />
        </>
    );

    return (
        <>
            <div className="flex gap-1">
                <Header
                    id={props.id}
                    createdAt={props.createdAt}
                    user={props.user}
                />
                {editAndDeleteButton}
            </div>
            <p className="text-xs md:text-base font-normal whitespace-pre-wrap dark:text-white">
                {props.content}
            </p>
            <InteractionButtons
                id={props.id}
                user={props.user}
                likeCount={props.likeCount}
                likedByMe={props.likedByMe}
                subTweetCount={props.subTweetCount}
            />
        </>
    );
};

export default Content;
