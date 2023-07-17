import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { IconHoverEffect } from "../IconHoverEffect";
import Tooltip from "./Tooltip";
import { useState } from "react";
import LikeListModal from "../modals/likeList/LikeListModal";

type HeartButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likeCount: number;
  tweetId: string;
};

type LikeNumberProps = {
  openModal: () => void;
  likeCount: number;
};

function LikeNumber(props: LikeNumberProps) {
  return (
    <span onClick={props.openModal}>
      <Tooltip
        content="Likes"
        id="likes"
        place="top"
        classNames="cursor-pointer hover:text-red-500"
      >
        <span className="text-md cursor-pointer rounded-full px-1 hover:text-red-500">
          {props.likeCount}
        </span>
      </Tooltip>
    </span>
  );
}

function HeartButton({
  isLoading,
  onClick,
  likedByMe,
  likeCount,
  tweetId,
}: HeartButtonProps) {
  const session = useSession();
  const [likeListModalOpen, setLikeListModalOpen] = useState(false);

  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  const closeModal = () => {
    setLikeListModalOpen(false);
  };

  const openModal = () => {
    setLikeListModalOpen(true);
  };

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <LikeNumber likeCount={likeCount} openModal={openModal} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        disabled={isLoading}
        onClick={onClick}
        className={`group -ml-2 flex items-center self-start transition-colors duration-200 ${
          likedByMe
            ? "text-red-500"
            : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
        }`}
      >
        <Tooltip content="Like" id="like" place="top" delayShow={1000}>
          <IconHoverEffect red>
            <HeartIcon
              className={`transition-colors duration-200 ${
                likedByMe
                  ? "fill-red-500"
                  : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
              } ${isLoading ? "animate-ping" : ""}`}
            />
          </IconHoverEffect>
        </Tooltip>
      </button>
      <LikeNumber likeCount={likeCount} openModal={openModal} />
      <LikeListModal
        closeModal={closeModal}
        openModal={openModal}
        modalIsOpen={likeListModalOpen}
        tweetId={tweetId}
      />
    </div>
  );
}

export default HeartButton;
