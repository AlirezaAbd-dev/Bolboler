import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { ProfileImage } from "../ProfileImage";
import { dateTimeFormatter } from "../card/Content";
import { useSession } from "next-auth/react";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import type { SubTweetType } from "../tweetDetails/SubTweets";

type SubTweetCardProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  subTweet: SubTweetType;
};

const SubTweetCard = (props: SubTweetCardProps) => {
  const session = useSession();
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
              href={`/profile/${props.user.id}`}
              className="font-bold outline-none hover:underline focus-visible:underline"
            >
              {props.user.name}
            </Link>
          </Tooltip>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(props.subTweet.createdAt)}
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
        <p className="whitespace-pre-wrap">{props.subTweet.content}</p>
      </div>
    </li>
  );
};

export default SubTweetCard;
