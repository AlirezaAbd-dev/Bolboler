import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  children: React.ReactNode;
  threshold: number | number[] | undefined;
  hasMore?: boolean;
  loader: React.ReactNode;
  reverse?: boolean;
  delay?: number;
  fetchNewTweets: () => Promise<unknown>;
};

const InfiniteScroll = ({
  reverse = false,
  hasMore = false,
  ...props
}: InfiniteScrollProps) => {
  const [loadMore, setLoadMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: props.threshold,
    delay: props.delay,
  });

  useEffect(() => {
    async function fetchNewTweetsStart() {
      if (inView && !loadMore) {
        if (hasMore) {
          setLoadMore(true);
          await props.fetchNewTweets();
          setLoadMore(false);
        }
      }
    }

    void fetchNewTweetsStart();
  }, [inView, props, loadMore, hasMore]);

  return (
    <>
      {reverse && (
        <>
          {loadMore && props.loader}
          <div className="w-full" ref={ref}></div>
        </>
      )}
      {props.children}
      {!reverse && (
        <>
          <div className="w-full" ref={ref}></div>
          {loadMore && props.loader}
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
