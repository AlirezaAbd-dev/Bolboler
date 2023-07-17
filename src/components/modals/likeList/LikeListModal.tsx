import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { api } from "~/utils/api";
import { ProfileImage } from "../../ProfileImage";
import Link from "next/link";
import { VscClose } from "react-icons/vsc";
import { IconHoverEffect } from "../../IconHoverEffect";
import { LoadingSpinner } from "../../LoadingSpinner";
import InfiniteScroll from "../../ui/InfiniteScroll";
import LikeList from "./LikeList";

type LikeListModalProps = {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  tweetId: string;
};

function LikeListModal(props: LikeListModalProps) {
  const likeList = api.tweet.likesList.useInfiniteQuery(
    { limit: 20, tweetId: props.tweetId },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <>
      <Transition appear show={props.modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            props.closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between text-lg font-medium leading-6 text-blue-500"
                  >
                    <p>Tweet Like List</p>
                    <span className="cursor-pointer hover:text-red-500">
                      <IconHoverEffect>
                        <VscClose
                          onClick={props.closeModal}
                          className="h-6 w-6"
                        />
                      </IconHoverEffect>
                    </span>
                  </Dialog.Title>

                  {/* Loading spinner */}
                  {likeList.isLoading && <LoadingSpinner />}

                  {likeList.data?.pages.flatMap((data) => data.likeList)
                    .length === 0 && (
                    <p className="my-5 text-center text-lg text-gray-400">
                      Nobody likes your tweet!
                    </p>
                  )}

                  {/* List goes here */}
                  {likeList.isSuccess && (
                    <ul className="container mt-4 flex max-h-[70vh] flex-col overflow-y-auto">
                      <InfiniteScroll
                        fetchNewTweets={likeList.fetchNextPage}
                        hasMore={likeList.hasNextPage}
                        loader={<LoadingSpinner />}
                        threshold={1}
                      >
                        {likeList.data?.pages
                          .flatMap((data) => data.likeList)
                          .map((like) => (
                            <LikeList
                              key={like.userId + like.tweetId}
                              userId={like.userId}
                              userImage={like.user.image}
                              userName={like.user.name}
                            />
                          ))}
                      </InfiniteScroll>
                    </ul>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default LikeListModal;
