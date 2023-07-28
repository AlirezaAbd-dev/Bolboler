import Link from 'next/link';
import { useRouter } from 'next/router';

import Tooltip from '~/components/ui/Tooltip';
import dateTimeFormatter from '~/utils/dateTimeFormatter';

type HeaderProps = {
    id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
};

const Header = (props: HeaderProps) => {
    const router = useRouter();

    const tweetDate = (
        <>
            <span className="text-gray-500 dark:text-gray-300">-</span>
            <span className="text-gray-500 dark:text-gray-300 text-xs md:text-base">
                {dateTimeFormatter.format(props.createdAt)}
            </span>
        </>
    );

    if (router.pathname.includes('/tweet/')) {
        return (
            <>
                <p className="text-sm md:text-base font-bold dark:text-white outline-none hover:underline focus-visible:underline">
                    {props.user.name}
                </p>
                {tweetDate}
            </>
        );
    } else {
        return (
            <>
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
                {tweetDate}
            </>
        );
    }
};

export default Header;
