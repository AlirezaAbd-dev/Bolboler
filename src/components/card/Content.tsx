import Link from "next/link";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import HeartButton from "../ui/HeartButton";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import type { Tweet } from "./TweetCard";

type ContentProps = {
  editMode: boolean;
  toggleEditMode: () => void;
  openModal: () => void;
  selectTweetForDelete: (tweetId: string) => void;
} & Tweet;

const Content = (props: ContentProps) => {
  const trpcUtils = api.useContext();
  const session = useSession();

  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.tweet.infiniteFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return;

        const countModifier = addedLike ? 1 : -1;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((tweet) => {
                if (tweet.id === props.id) {
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + countModifier,
                    likedByMe: addedLike,
                  };
                }

                return tweet;
              }),
            };
          }),
        };
      };

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
      trpcUtils.tweet.infiniteFeed.setInfiniteData(
        { onlyFollowing: true },
        updateData
      );
      trpcUtils.tweet.infiniteProfileFeed.setInfiniteData(
        { userId: props.user.id },
        updateData
      );
    },
  });

  function handleToggleLike() {
    toggleLike.mutate({ id: props.id });
  }

  return (
    <>
      <div className="flex gap-1">
        <Link
          href={`/profiles/${props.user.id}`}
          className="font-bold outline-none hover:underline focus-visible:underline"
        >
          {props.user.name}
        </Link>
        <span className="text-gray-500">-</span>
        <span className="text-gray-500">
          {dateTimeFormatter.format(props.createdAt)}
        </span>
        {session.data?.user.id === props.user.id && (
          <div>
            <span
              className="ml-6 cursor-pointer"
              onClick={() => props.toggleEditMode()}
            >
              <IconHoverEffect>
                {!props.editMode ? (
                  <VscEdit className="h-4 w-4 text-gray-500" />
                ) : (
                  <VscClose className="h-4 w-4 text-red-500" />
                )}
              </IconHoverEffect>
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                props.openModal();
                props.selectTweetForDelete(props.id);
              }}
            >
              <IconHoverEffect red>
                <RiDeleteBin2Line className="h-4 w-4 text-red-500" />
              </IconHoverEffect>
            </span>
          </div>
        )}
      </div>
      <p className="whitespace-pre-wrap">{props.content}</p>
      <HeartButton
        onClick={handleToggleLike}
        isLoading={toggleLike.isLoading}
        likedByMe={props.likedByMe}
        likeCount={props.likeCount}
      />
    </>
  );
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

export default Content;
