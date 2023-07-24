import ErrorPage from 'next/error';
import Head from 'next/head';

import TweetCard from '../card/TweetCard';
import SubTweetForm from './SubTweetForm';
import SubTweets from './SubTweets';

import TweetDetailsHeader from '~/components/tweetDetails/TweetDetailsHeader';
import { api } from '~/utils/api';

type TweetDetailsProps = {
    id: string;
};

const TweetDetailsMain = (props: TweetDetailsProps) => {
    const tweet = api.tweet.getTweetById.useQuery({ id: props.id });

    if (tweet.error) {
        return <ErrorPage statusCode={404} />;
    }

    if (tweet.isSuccess) {
        return (
            <>
                <Head>
                    <title>{`Bolboler - Tweet Details`}</title>
                </Head>
                <TweetDetailsHeader />
                <TweetCard
                    user={tweet.data.user}
                    content={tweet.data.content}
                    createdAt={tweet.data.createdAt}
                    id={tweet.data.id}
                    likeCount={tweet.data.likeCount}
                    likedByMe={tweet.data.likedByMe}
                    subTweetCount={tweet.data._count.subTweets}
                />

                <div className="border-b dark:border-gray-800 border-b-gray-200 py-4 text-center text-lg font-bold text-gray-600 dark:text-gray-400">
                    Sub Tweets
                    <p className="text-md text-gray-500">
                        Replies: {tweet.data._count.subTweets}
                    </p>
                </div>

                <SubTweetForm tweetId={tweet.data.id} />

                <SubTweets tweetId={tweet.data.id} />
            </>
        );
    }
};

export default TweetDetailsMain;
