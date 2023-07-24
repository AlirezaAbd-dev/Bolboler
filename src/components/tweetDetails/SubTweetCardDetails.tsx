import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { VscClose, VscEdit } from 'react-icons/vsc';

import { IconHoverEffect } from '../IconHoverEffect';
import { ProfileImage } from '../ProfileImage';
import Tooltip from '../ui/Tooltip';
import type { SubTweetType } from './SubTweets';

import dateTimeFormatter from '~/utils/dateTimeFormatter';

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
                <div className="flex gap-1">
                    <Tooltip
                        content="View Profile"
                        place="bottom"
                        id="view tweet"
                        delayShow={1000}
                    >
                        <Link
                            href={`/profiles/${props.user.id}`}
                            className="font-bold outline-none hover:underline focus-visible:underline dark:text-white"
                        >
                            {props.user.name}
                        </Link>
                    </Tooltip>
                    <span className="text-gray-500 dark:text-gray-300">-</span>
                    <span className="text-gray-500 dark:text-gray-300">
                        {dateTimeFormatter.format(props.subTweet.createdAt)}
                    </span>
                    {session.data?.user.id === props.user.id && (
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
                                            <VscEdit className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                                        ) : (
                                            <VscClose className="h-4 w-4 text-red-500" />
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
                                        <RiDeleteBin2Line className="h-4 w-4 text-red-500" />
                                    </IconHoverEffect>
                                </Tooltip>
                            </span>
                        </>
                    )}
                </div>
                <p className="whitespace-pre-wrap dark:text-white">
                    {props.subTweet.content}
                </p>
            </div>
        </>
    );
};

export default SubTweetCardDetails;
