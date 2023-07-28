import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { VscClose, VscEdit } from 'react-icons/vsc';

import type { SubTweetType } from '../../tweetDetails/SubTweets';
import { IconHoverEffect } from '../../ui/IconHoverEffect';
import { ProfileImage } from '../../ui/ProfileImage';
import Tooltip from '../../ui/Tooltip';
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
                    {(session.data?.user.role?.toString() === 'ADMIN' ||
                        session.data?.user.id === props.user.id) && (
                        <>
                            <span
                                className="ml-6 cursor-pointer"
                                onClick={() =>
                                    props.setEditMode((prevState) => !prevState)
                                }
                            >
                                <Tooltip
                                    content="Edit"
                                    place="bottom"
                                    id="edit"
                                >
                                    <IconHoverEffect>
                                        {!props.editMode ? (
                                            <VscEdit className="h-3 w-3 md:h-4 md:w-4 text-gray-500 dark:text-gray-300" />
                                        ) : (
                                            <VscClose className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                                        )}
                                    </IconHoverEffect>
                                </Tooltip>
                            </span>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    props.openModal();
                                    props.setSelectedSubTweetForDelete(
                                        props.subTweet.id,
                                    );
                                }}
                            >
                                <Tooltip
                                    content="Delete"
                                    place="bottom"
                                    id="delete"
                                >
                                    <IconHoverEffect>
                                        <RiDeleteBin2Line className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                                    </IconHoverEffect>
                                </Tooltip>
                            </span>
                        </>
                    )}
                </div>
                <p className="whitespace-pre-wrap dark:text-white text-xs md:text-base">
                    {props.subTweet.content}
                </p>
            </div>
        </>
    );
};

export default SubTweetCardDetails;
