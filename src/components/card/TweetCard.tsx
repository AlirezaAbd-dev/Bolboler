import Link from "next/link";
import { ProfileImage } from "../ProfileImage";
import { useSession } from "next-auth/react";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";
import EditTweetForm from "./EditTweetForm";
import { Transition } from "@headlessui/react";
import Content from "./Content";

export type Tweet = {
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

  function selectTweetForDelete(tweetId: string) {
    setSelectedTweetForDelete(tweetId);
  }

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }

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

        {/* Card content */}
        <Content
          content={content}
          createdAt={createdAt}
          editMode={editMode}
          id={id}
          likeCount={likeCount}
          likedByMe={likedByMe}
          openModal={openModal}
          selectTweetForDelete={selectTweetForDelete}
          toggleEditMode={toggleEditMode}
          user={user}
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

export default TweetCard;