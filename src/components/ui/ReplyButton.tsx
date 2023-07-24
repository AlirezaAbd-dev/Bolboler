import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscReply } from 'react-icons/vsc';

import { IconHoverEffect } from '../IconHoverEffect';
import Tooltip from './Tooltip';

type ReplyButtonProps = {
    id: string;
    subTweetCount: number;
};

const ReplyButton = (props: ReplyButtonProps) => {
    const router = useRouter();

    if (!router.pathname.includes('/tweet/')) {
        return (
            <div className="flex items-center">
                <Tooltip
                    content="Reply"
                    id="reply"
                    place="top"
                    delayShow={1000}
                >
                    <Link href={`/tweet/${props.id}`}>
                        <IconHoverEffect>
                            <VscReply className="fill-gray-500 dark:fill-gray-300" />
                        </IconHoverEffect>
                    </Link>
                </Tooltip>
                <span className="ml-1 text-gray-500 dark:text-gray-300">
                    {props.subTweetCount}
                </span>
            </div>
        );
    }
};

export default ReplyButton;
