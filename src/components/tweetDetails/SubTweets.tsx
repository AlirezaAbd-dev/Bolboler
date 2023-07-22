import { useState } from 'react';
import useTimeline from '~/hooks/useTimeline';
import { api } from '~/utils/api';

import { LoadingSpinner } from '../LoadingSpinner';
import SubTweetCard from '../card/SubTweetCard';

type SubTweetsProps = {
    tweetId: string;
};

export type SubTweetType = {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
    mainTweetId: string;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
};

const SubTweets = (props: SubTweetsProps) => {
    const [selectedSubTweetForDelete, setSelectedSubTweetForDelete] =
        useState('');

    const { tl } = useTimeline({
        defaults: {
            duration: 0.1,
        },
    });

    const handleSelectedSubTweet = (selectTweet: string) => {
        setSelectedSubTweetForDelete(selectTweet);
    };

    const { tweetId } = props;
    const subTweets = api.subTweet.getSubTweetsByTweetId.useQuery({ tweetId });

    if (
        !subTweets.isLoading &&
        (subTweets.data?.length === 0 || !subTweets.data)
    ) {
        return (
            <p className="mt-4 text-center text-xl text-gray-500">
                There is no subtweets for this tweet
            </p>
        );
    }

    if (subTweets.isLoading) {
        return <LoadingSpinner />;
    }

    if (subTweets.data) {
        return subTweets.data.map((subTweet: SubTweetType) => (
            <SubTweetCard
                timeline={tl}
                subTweet={subTweet}
                user={subTweet.user}
                selectedSubTweetForDelete={selectedSubTweetForDelete}
                setSelectedSubTweetForDelete={handleSelectedSubTweet}
                key={subTweet.id}
            />
        ));
    }
};

export default SubTweets;
