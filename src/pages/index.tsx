import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { NewTweetForm } from "~/components/NewTweetForm";
import Tab from "~/components/Tab";
import FollowingTweets from "~/components/tabPages/FollowingTweets";
import RecentTweets from "~/components/tabPages/RecentTweets";

const TABS = ["Recent", "Following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const session = useSession();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
        {session.status === "authenticated" && (
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
      {selectedTab === "Recent" ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
};

export default Home;
