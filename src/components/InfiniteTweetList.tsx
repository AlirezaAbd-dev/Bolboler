import { LoadingSpinner } from "./LoadingSpinner";
import TweetCard from "./card/TweetCard";
import useInfiniteScroll from "~/hooks/useInfiniteScroll";

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
  const { loadMore, ref, inView } = useInfiniteScroll({
    fetchNewTweets,
    hasMore,
    threshold: 1,
  });

  console.log(inView);

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
          <>
            <TweetCard key={tweet.id} {...tweet} />
            {index === tweets.length - 1 ? (
              <div className="w-full py-5" ref={ref}></div>
            ) : null}
          </>
        );
      })}
      {loadMore && <LoadingSpinner />}
    </ul>
  );
}
