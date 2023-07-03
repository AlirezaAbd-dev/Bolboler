import Link from "next/link";
import { api } from "~/utils/api";
import { ProfileImage } from "../ProfileImage";
import HeartButton from "../ui/HeartButton";
import { useSession } from "next-auth/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscClose, VscEdit } from "react-icons/vsc";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";
import EditTweetForm from "./EditTweetForm";
import { Transition } from "@headlessui/react";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

function TweetCard({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) {
  const [editMode, setEditMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTweetForDelete, setSelectedTweetForDelete] = useState("");

  function closeEditMode() {
    setEditMode(false);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }
  const session = useSession();
  const trpcUtils = api.useContext();
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
                if (tweet.id === id) {
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
        { userId: user.id },
        updateData
      );
    },
  });

  function handleToggleLike() {
    toggleLike.mutate({ id });
  }

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        {/* //! Delete Modal */}
        {session.data?.user.id === user.id && (
          <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
            selectedTweet={selectedTweetForDelete}
          />
        )}
        {/* //! End of delete modal */}

        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
          {session.data?.user.id === user.id && (
            <>
              <span
                className="ml-6 cursor-pointer"
                onClick={() => setEditMode((prev) => !prev)}
              >
                <IconHoverEffect>
                  {!editMode ? (
                    <VscEdit className="h-4 w-4 text-gray-500" />
                  ) : (
                    <VscClose className="h-4 w-4 text-red-500" />
                  )}
                </IconHoverEffect>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  openModal();
                  setSelectedTweetForDelete(id);
                }}
              >
                <IconHoverEffect red>
                  <RiDeleteBin2Line className="h-4 w-4 text-red-500" />
                </IconHoverEffect>
              </span>
            </>
          )}
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={likedByMe}
          likeCount={likeCount}
        />
        {/* //* Form for editing tweet */}
        <Transition
          show={editMode}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-1"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0 opacity-1"
          leaveTo="-translate-x-full opacity-0"
        >
          <EditTweetForm
            tweetId={id}
            tweetContent={content}
            onClose={closeEditMode}
          />
        </Transition>
      </div>
    </li>
  );
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

export default TweetCard;
