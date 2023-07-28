import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import type { SubTweetType } from '../../tweetDetails/SubTweets';
import { ProfileImage } from '../../ui/ProfileImage';
import DeleteSubTweetButton from './DeleteSubTweetButton';
import EditSubTweetButton from './EditSubTweetButton';
import Header from './Header';

type SubTweetCardDetailsProps = {
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
    subTweet: SubTweetType;
    setSelectedSubTweetForDelete: (selectSubTweet: string) => void;
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    openModal: () => void;
};

const SubTweetCardDetails = (props: SubTweetCardDetailsProps) => {
    const session = useSession();

    const editAndDeleteButtons = (session.data?.user.role?.toString() ===
        'ADMIN' ||
        session.data?.user.id === props.user.id) && (
        <>
            <EditSubTweetButton
                editMode={props.editMode}
                setEditMode={props.setEditMode}
            />
            <DeleteSubTweetButton
                id={props.subTweet.id}
                openModal={props.openModal}
                setSelectedSubTweetForDelete={
                    props.setSelectedSubTweetForDelete
                }
            />
        </>
    );

    return (
        <>
            <Link href={`/profiles/${props.subTweet.id}`}>
                <ProfileImage src={props.subTweet.user.image} />
            </Link>
            <div className="flex flex-grow flex-col">
                <div className="flex gap-[2px] ">
                    <Header
                        createdAt={props.subTweet.createdAt}
                        user={props.user}
                    />
                    {editAndDeleteButtons}
                </div>
                <p className="whitespace-pre-wrap dark:text-white text-xs md:text-base">
                    {props.subTweet.content}
                </p>
            </div>
        </>
    );
};

export default SubTweetCardDetails;
