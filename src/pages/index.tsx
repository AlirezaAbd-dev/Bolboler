import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NewTweetForm } from "~/components/NewTweetForm";
import Tab from "~/components/Tab";
import FollowingTweets from "~/components/tabPages/FollowingTweets";
import RecentTweets from "~/components/tabPages/RecentTweets";

const TABS = ["Recent", "Following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const session = useSession();

  const headerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.fromTo(
        ".logo",
        { y: "-100", opacity: 0 },
        {
          duration: 1.5,
          stagger: 0.5,
          y: 0,
          opacity: 1,
          ease: "back",
        }
      );
    }, headerRef);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-10 border-b bg-white pt-2 text-center"
        ref={headerRef}
      >
        <h1 className="mb-2 px-4 text-lg font-bold">
          <p className="logo inline-block">B</p>
          <p className="logo inline-block">O</p>
          <p className="logo inline-block">L</p>
          <p className="logo inline-block">B</p>
          <p className="logo inline-block">O</p>
          <p className="logo inline-block">L</p>
          <p className="logo inline-block">E</p>
          <p className="logo inline-block">R</p>
        </h1>
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
