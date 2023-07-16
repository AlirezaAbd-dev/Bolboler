import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type UseInfiniteScrollProps = {
  threshold: number | number[] | undefined;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
};

const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
  const [loadMore, setLoadMore] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: props.threshold,
    delay: 1000,
  });

  useEffect(() => {
    if (ref.length === 1) {
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
    }
  }, [inView, props, loadMore, ref.length]);

  return { loadMore, ref, inView, entry };
};

export default useInfiniteScroll;
