import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { ProfileImage } from "../ProfileImage";
import { dateTimeFormatter } from "../card/Content";
import { useSession } from "next-auth/react";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import HeartButton from "../ui/HeartButton";
import SubTweetCard from "../card/SubTweetCard";

type SubTweetsProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  subTweets: {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
    mainTweetId: string;
  }[];
};

const SubTweets = (props: SubTweetsProps) => {
    console.log(props.subTweets)
  if (props.subTweets.length === 0 || !props.subTweets) {
    return (
      <p className="mt-4 text-center text-xl text-gray-500">
        There is no subtweets for this tweet
      </p>
    );
  }

  return props.subTweets.map((subTweet) => (
    <SubTweetCard subTweet={subTweet} user={props.user} key={subTweet.id} />
  ));
};

export default SubTweets;
