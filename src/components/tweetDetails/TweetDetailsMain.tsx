import ErrorPage from "next/error";

import { api } from "~/utils/api";
import Head from "next/head";
import TweetDetailsHeader from "~/components/tweetDetails/TweetDetailsHeader";
import TweetCard from "../card/TweetCard";
import SubTweets from "./SubTweets";

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
        />

        <div className="border-b border-b-gray-200 py-4 text-center text-lg font-bold text-gray-600">
          Sub Tweets
        </div>
      
        <SubTweets user={tweet.data.user} subTweets={tweet.data.subTweets} />
      </>
    );
  }
};

export default TweetDetailsMain;
