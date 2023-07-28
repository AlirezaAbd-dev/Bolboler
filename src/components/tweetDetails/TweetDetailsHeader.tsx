import Link from 'next/link';
import { VscArrowLeft } from 'react-icons/vsc';

import { IconHoverEffect } from '../ui/IconHoverEffect';

const TweetDetailsHeader = () => {
    return (
        <header className="sticky top-0 z-10 flex items-center border-b dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2">
            <Link href=".." className="mr-2">
                <IconHoverEffect>
                    <VscArrowLeft className="h-6 w-6 dark:fill-white" />
                </IconHoverEffect>
            </Link>
            <div className="ml-2 flex-grow">
                <h1 className="text-lg font-bold dark:text-white">
                    Tweet Details
                </h1>
            </div>
        </header>
    );
};

export default TweetDetailsHeader;
