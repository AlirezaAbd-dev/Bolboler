import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
  children: React.ReactNode;
  threshold: number | number[] | undefined;
  hasMore: boolean;
  loader: React.ReactNode;
  reverse?: boolean;
  fetchNewTweets: () => Promise<unknown>;
};

const InfiniteScroll = ({ reverse = false, ...props }: InfiniteScrollProps) => {
  const [loadMore, setLoadMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: props.threshold,
    delay: 1000,
  });

  useEffect(() => {
    async function fetchNewTweetsStart() {
      if (inView && !loadMore) {
        if (props.hasMore) {
          setLoadMore(true);
          await props.fetchNewTweets();
          setTimeout(() => {
            setLoadMore(false);
          }, 2000);
        }
      }
    }

    void fetchNewTweetsStart();
  }, [inView, props, loadMore]);

  return (
    <>
      {reverse && (
        <>
          {loadMore && props.loader}
          <div className="w-full py-2" ref={ref}></div>
        </>
      )}
      {props.children}
      {!reverse && (
        <>
          <div className="w-full pt-1" ref={ref}></div>
          {loadMore && props.loader}
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
