/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import InfiniteScroll from "react-infinite-scroll-component";
import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "./LoadingSpinner";
import TweetCard from "./card/TweetCard";
import { useEffect, useState } from "react";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  subTweetCount: number;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore = false,
}: InfiniteTweetListProps) {
  const [loadMore, setLoadMore] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function fetchNewTweetsStart() {
      if (entry && !loadMore) {
        if (hasMore) {
          setLoadMore(true);
          await fetchNewTweets();
          setLoadMore(false);
        }
      }
    }

    void fetchNewTweetsStart();
  });

  if (inView) {
    console.log("in view");
    console.log(entry);
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      {tweets.map((tweet, index) => {
        return (
          <TweetCard
            key={tweet.id}
            {...tweet}
            ref={index === tweets.length - 1 ? ref : null}
          />
        );
      })}
      {loadMore && <LoadingSpinner />}
    </ul>
  );
}
