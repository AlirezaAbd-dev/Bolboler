import { createContext } from "react";
import ErrorPage from "next/error";

import { api } from "~/utils/api";
import Head from "next/head";
import TweetDetailsHeader from "~/components/tweetDetails/TweetDetailsHeader";
import TweetDetailsMain from "~/components/tweetDetails/TweetDetailsMain";

type TweetDetailsContextProps = {
  likeCount: number;
  likedByMe: boolean;
  id: string;
  content: string;
  createdAt: Date;
  _count: {
    likes: number;
  };
  likes:
    | {
        userId: string;
        tweetId: string;
      }
    | (unknown & object[]);
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  subTweets: {
    content: string;
    id: string;
    createdAt: Date;
    mainTweetId: string;
    userId: string;
  }[];
} | null;

type TweetDetailsProps = {
  id: string;
};

export const tweetDetailsContext =
  createContext<TweetDetailsContextProps>(null);

export default function TweetDetails(props: TweetDetailsProps) {
  const tweet = api.tweet.getTweetById.useQuery({ id: props.id });
  console.log(tweet.data);

  if (tweet.error) {
    return <ErrorPage statusCode={404} />;
  }

  if (tweet.isSuccess) {
    return (
      <tweetDetailsContext.Provider
        value={{
          user: tweet.data.user,
          _count: tweet.data._count,
          content: tweet.data.content,
          createdAt: tweet.data.createdAt,
          id: tweet.data.id,
          likeCount: tweet.data.likeCount,
          likedByMe: tweet.data.likedByMe,
          likes: tweet.data.likes,
          subTweets: tweet.data.subTweets,
        }}
      >
        <Head>
          <title>{`Bolboler - Tweet Details`}</title>
        </Head>
        <TweetDetailsHeader />
        <TweetDetailsMain />
      </tweetDetailsContext.Provider>
    );
  }
  return <></>;
}
