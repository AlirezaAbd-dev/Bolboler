import { useState } from 'react';

import SubTweetCard from '../card/subTweet/SubTweetCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

import useTimeline from '~/hooks/animations/useTimeline';
import { api } from '~/utils/api';

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
    const { tweetId } = props;

    const [selectedSubTweetForDelete, setSelectedSubTweetForDelete] =
        useState('');

    const { tl } = useTimeline({
        defaults: {
            duration: 0.1,
        },
    });

    const subTweets = api.subTweet.getSubTweetsByTweetId.useQuery({ tweetId });

    const handleSelectedSubTweet = (selectTweet: string) => {
        setSelectedSubTweetForDelete(selectTweet);
    };

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
