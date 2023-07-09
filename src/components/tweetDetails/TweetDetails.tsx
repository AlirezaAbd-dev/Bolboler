import TweetCard from "../card/TweetCard";
import type { Tweet } from "../card/TweetCard";

const TweetDetails = (props: Tweet) => {
  return (
    <TweetCard
      content={props.content}
      createdAt={props.createdAt}
      id={props.id}
      likeCount={props.likeCount}
      likedByMe={props.likedByMe}
      user={props.user}
    />
  );
};

export default TweetDetails;
