import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { ProfileImage } from "../ProfileImage";
import { dateTimeFormatter } from "../card/Content";
import { useSession } from "next-auth/react";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import type { SubTweetType } from "../tweetDetails/SubTweets";
import { useState } from "react";
import DeleteSubTweetModal from "../modals/DeleteSubTweetModal";
import { Transition } from "@headlessui/react";
import EditSubTweetForm from "../tweetDetails/EditSubTweetForm";

type SubTweetCardProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  subTweet: SubTweetType;
  selectedSubTweetForDelete: string;
  setSelectedSubTweetForDelete: (selectSubTweet: string) => void;
};

const SubTweetCard = (props: SubTweetCardProps) => {
  const session = useSession();
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeEditMode = () => {
    setEditMode(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className="mx-10 flex gap-4 border-b px-4 py-4">
        <Link href={`/profiles/${props.subTweet.id}`}>
          <ProfileImage src={props.subTweet.user.image} />
        </Link>
        <div className="flex flex-grow flex-col">
          <div className="flex gap-1">
            <Tooltip
              content="View Profile"
              place="bottom"
              id="view tweet"
              delayShow={1000}
            >
              <Link
                href={`/profiles/${props.user.id}`}
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
              <>
                <span
                  className="ml-6 cursor-pointer"
                  onClick={() => setEditMode((prevState) => !prevState)}
                >
                  <Tooltip content="Edit" place="bottom" id="edit">
                    <IconHoverEffect>
                      {!editMode ? (
                        <VscEdit className="h-4 w-4 text-gray-500" />
                      ) : (
                        <VscClose className="h-4 w-4 text-red-500" />
                      )}
                    </IconHoverEffect>
                  </Tooltip>
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    openModal();
                    props.setSelectedSubTweetForDelete(props.subTweet.id);
                  }}
                >
                  <Tooltip content="Delete" place="bottom" id="delete">
                    <IconHoverEffect red>
                      <RiDeleteBin2Line className="h-4 w-4 text-red-500" />
                    </IconHoverEffect>
                  </Tooltip>
                </span>
              </>
            )}
          </div>
          <p className="whitespace-pre-wrap">{props.subTweet.content}</p>
        </div>
      </li>

      {session.status === "authenticated" && (
        <Transition
          show={editMode}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-1"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0 opacity-1"
          leaveTo="-translate-x-full opacity-0"
        >
          <EditSubTweetForm
            onClose={closeEditMode}
            subTweetId={props.subTweet.id}
            subTweetContent={props.subTweet.content}
            tweetId={props.subTweet.mainTweetId}
          />
        </Transition>
      )}

      <DeleteSubTweetModal
        selectedTweet={props.selectedSubTweetForDelete}
        closeModal={closeModal}
        openModal={openModal}
        modalIsOpen={isModalOpen}
        tweetId={props.subTweet.mainTweetId}
      />
    </>
  );
};

export default SubTweetCard;
