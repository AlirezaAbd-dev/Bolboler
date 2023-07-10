import { api } from "~/utils/api";
import SubTweetCard from "../card/SubTweetCard";

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
};

const SubTweets = (props: SubTweetsProps) => {
  const { tweetId } = props;
  const subTweets = api.subTweet.getSubTweetsByTweetId.useQuery({ tweetId });
  if (subTweets.data?.length === 0 || !subTweets.data) {
    return (
      <p className="mt-4 text-center text-xl text-gray-500">
        There is no subtweets for this tweet
      </p>
    );
  }

  return subTweets.data.map((subTweet: SubTweetType) => (
    <SubTweetCard subTweet={subTweet} user={props.user} key={subTweet.id} />
  ));
};

export default SubTweets;
