'use client';

import { useRef } from 'react';

import TweetCard from '../card/tweet/TweetCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

import InfiniteScroll from '~/components/ui/InfiniteScroll';
import useTimeline from '~/hooks/animations/useTimeline';

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
    hasMore = false,
    ...props
}: InfiniteTweetListProps) {
    const tweetsRef = useRef(null);

    const { tl } = useTimeline({
        defaults: {
            duration: 0.1,
        },
    });

    if (props.isLoading) return <LoadingSpinner />;
    if (props.isError) return <h1>Error...</h1>;

    if (props.tweets == null || props.tweets.length === 0) {
        return (
            <h2 className="my-4 text-center text-2xl text-gray-500 dark:text-gray-300">
                No Tweets
            </h2>
        );
    }

    return (
        <ul ref={tweetsRef}>
            <InfiniteScroll
                fetchNewTweets={props.fetchNewTweets}
                hasMore={hasMore}
                loader={<LoadingSpinner />}
                threshold={1}
            >
                {props.tweets.map((tweet) => {
                    return (
                        <TweetCard key={tweet.id} timeline={tl} {...tweet} />
                    );
                })}
            </InfiniteScroll>
        </ul>
    );
}
