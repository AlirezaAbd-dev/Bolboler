import { useContext } from "react";
import TweetCard from "../card/TweetCard";
import { tweetDetailsContext } from "~/context/tweetDetailsContext";

const TweetDetailsMain = () => {
  const tweetDetails = useContext(tweetDetailsContext);

  if (tweetDetails) {
    return (
      <TweetCard
        content={tweetDetails.content}
        createdAt={tweetDetails.createdAt}
        id={tweetDetails.id}
        likeCount={tweetDetails.likeCount}
        likedByMe={tweetDetails.likedByMe}
        user={tweetDetails.user}
      />
    );
  }
};

export default TweetDetailsMain;
