import Link from 'next/link';

import Tooltip from '~/components/ui/Tooltip';
import dateTimeFormatter from '~/utils/dateTimeFormatter';

type HeaderProps = {
    createdAt: Date;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
};

const Header = (props: HeaderProps) => {
    return (
        <>
            <Tooltip
                content="View Profile"
                place="bottom"
                id="view tweet"
                delayShow={1000}
            >
                <Link
                    href={`/profiles/${props.user.id}`}
                    className="text-sm md:text-base font-bold outline-none hover:underline focus-visible:underline dark:text-white"
                >
                    {props.user.name}
                </Link>
            </Tooltip>
            <span className="text-gray-500 dark:text-gray-300">-</span>
            <span className="text-gray-500 dark:text-gray-300 text-xs md:text-base">
                {dateTimeFormatter.format(props.createdAt)}
            </span>
        </>
    );
};

export default Header;
