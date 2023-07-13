import { api } from "~/utils/api";
import SubTweetCard from "../card/SubTweetCard";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

type SubTweetsProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
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
    useState("");

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
