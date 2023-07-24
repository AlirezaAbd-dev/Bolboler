import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { VscClose, VscEdit } from 'react-icons/vsc';

import { IconHoverEffect } from '../IconHoverEffect';
import HeartButton from '../ui/HeartButton';
import ReplyButton from '../ui/ReplyButton';
import Tooltip from '../ui/Tooltip';
import type { Tweet } from './TweetCard';

import useToggleLikeMutation from '~/hooks/useToggleLikeMutation';
import dateTimeFormatter from '~/utils/dateTimeFormatter';

type ContentProps = {
    editMode: boolean;
    toggleEditMode: () => void;
    openModal: () => void;
    selectTweetForDelete: (tweetId: string) => void;
} & Tweet;

const Content = (props: ContentProps) => {
    const session = useSession();
    const router = useRouter();

    const toggleLike = useToggleLikeMutation({
        id: props.id,
        user: { id: props.user.id },
    });

    function handleToggleLike() {
        toggleLike.mutate({ id: props.id });
    }

    return (
        <>
            <div className="flex gap-1">
                {router.pathname.includes('/tweet/') ? (
                    <p className="text-sm md:text-base font-bold dark:text-white outline-none hover:underline focus-visible:underline">
                        {props.user.name}
                    </p>
                ) : (
                    <Tooltip
                        content="View Tweet"
                        place="bottom"
                        id="view tweet"
                        delayShow={1000}
                    >
                        <Link
                            href={`/tweet/${props.id}`}
                            className="text-sm md:text-base font-bold dark:text-white outline-none hover:underline focus-visible:underline"
                        >
                            {props.user.name}
                        </Link>
                    </Tooltip>
                )}
                <span className="text-gray-500 dark:text-gray-300">-</span>
                <span className="text-gray-500 dark:text-gray-300 text-xs md:text-base">
                    {dateTimeFormatter.format(props.createdAt)}
                </span>
                {session.data?.user.id === props.user.id && (
                    <>
                        <span
                            className="ml-3 md:ml-6 cursor-pointer"
                            onClick={() => props.toggleEditMode()}
                        >
                            <Tooltip content="Edit" place="bottom" id="edit">
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
                                props.selectTweetForDelete(props.id);
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
            <p className="text-xs md:text-base font-normal whitespace-pre-wrap dark:text-white">
                {props.content}
            </p>
            <div className="flex items-center gap-3">
                <HeartButton
                    onClick={handleToggleLike}
                    isLoading={toggleLike.isLoading}
                    likedByMe={props.likedByMe}
                    likeCount={props.likeCount}
                    tweetId={props.id}
                />
                <ReplyButton
                    subTweetCount={props.subTweetCount}
                    id={props.id}
                />
            </div>
        </>
    );
};

export default Content;
