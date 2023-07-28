import { InfiniteTweetList } from '../../layouts/InfiniteTweetList';

import { api } from '~/utils/api';

function FollowingTweets() {
    const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
        { onlyFollowing: true },
        { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

    return (
        <InfiniteTweetList
            tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
            isError={tweets.isError}
            isLoading={tweets.isLoading}
            hasMore={tweets.hasNextPage}
            fetchNewTweets={tweets.fetchNextPage}
        />
    );
}

export default FollowingTweets;
