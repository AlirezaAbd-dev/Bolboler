import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Logo from '~/components/mainPage/Logo';
import Tab from '~/components/mainPage/Tab';
import { NewTweetForm } from '~/components/mainPage/mainPageForm/NewTweetForm';
import FollowingTweets from '~/components/mainPage/tabPages/FollowingTweets';
import RecentTweets from '~/components/mainPage/tabPages/RecentTweets';
import useLogoAnimation from '~/hooks/useLogoAnimation';

const TABS = ['Recent', 'Following'] as const;

const Home: NextPage = () => {
    const [selectedTab, setSelectedTab] =
        useState<(typeof TABS)[number]>('Recent');
    const session = useSession();

    const headerRef = useLogoAnimation();

    return (
        <>
            <header
                className="header sticky top-0 z-10 border-b dark:border-gray-800 bg-white dark:bg-gray-900 pt-2 text-center"
                ref={headerRef}
            >
                {/* BOLBOLER logo */}
                <Logo />

                {/* Tabs */}
                {session.status === 'authenticated' && (
                    <div className="flex">
                        {TABS.map((tab) => (
                            <Tab
                                key={tab}
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                tab={tab}
                            />
                        ))}
                    </div>
                )}
            </header>
            <NewTweetForm />
            {selectedTab === 'Recent' ? <RecentTweets /> : <FollowingTweets />}
        </>
    );
};

export default Home;
