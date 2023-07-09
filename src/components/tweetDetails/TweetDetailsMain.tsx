import ErrorPage from "next/error";

import { api } from "~/utils/api";
import Head from "next/head";
import TweetDetailsHeader from "~/components/tweetDetails/TweetDetailsHeader";
import TweetCard from "../card/TweetCard";

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
      </>
    );
  }
};

export default TweetDetailsMain;