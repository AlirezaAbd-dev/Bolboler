import React from "react";
import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { ProfileImage } from "../ProfileImage";
import { dateTimeFormatter } from "../card/Content";
import { useSession } from "next-auth/react";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import HeartButton from "../ui/HeartButton";

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
  const session = useSession();

  if (props.subTweets.length === 0 || !props.subTweets) {
    return (
      <p className="mt-4 text-center text-xl text-gray-500">
        There is no subtweets for this tweet
      </p>
    );
  }

  return (
    <li className="mx-10 flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${props.user.id}`}>
        <ProfileImage src={props.user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Tooltip
            content="View Tweet"
            place="bottom"
            id="view tweet"
            delayShow={1000}
          >
            <Link
              //   href={`/tweet/${props.id}`}
              href={`/tweet/`}
              className="font-bold outline-none hover:underline focus-visible:underline"
            >
              {props.user.name}
            </Link>
          </Tooltip>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {/* {dateTimeFormatter.format(props.createdAt)} */}
          </span>
          {session.data?.user.id === props.user.id && (
            <div>
              <span
                className="ml-6 cursor-pointer"
                // onClick={() => props.toggleEditMode()}
              >
                <Tooltip content="Edit" place="bottom" id="edit">
                  <IconHoverEffect>
                    {/* {!props.editMode ? (
                      <VscEdit className="h-4 w-4 text-gray-500" />
                    ) : (
                      <VscClose className="h-4 w-4 text-red-500" />
                    )} */}
                  </IconHoverEffect>
                </Tooltip>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  //   props.openModal();
                  //   props.selectTweetForDelete(props.id);
                }}
              >
                <Tooltip content="Delete" place="bottom" id="delete">
                  <IconHoverEffect red>
                    <RiDeleteBin2Line className="h-4 w-4 text-red-500" />
                  </IconHoverEffect>
                </Tooltip>
              </span>
            </div>
          )}
        </div>
        {/* <p className="whitespace-pre-wrap">{props.content}</p> */}
        <p className="whitespace-pre-wrap">yoyo</p>
        {/* <HeartButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={props.likedByMe}
          likeCount={props.likeCount}
        /> */}
      </div>
    </li>
  );
};

export default SubTweets;
