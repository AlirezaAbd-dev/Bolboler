import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PacmanLoader } from "react-spinners";
import { api } from "~/utils/api";

type DeleteModalProps = {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  selectedTweet: string;
};

function DeleteModal(props: DeleteModalProps) {
  const trpcUtils = api.useContext();
  const deleteTweetMutation = api.tweet.delete.useMutation({
    onSuccess: async () => {
      await trpcUtils.tweet.invalidate();
      props.closeModal();
    },
    trpc: {
      abortOnUnmount: true,
    },
  });

  return (
    <>
      <Transition appear show={props.modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            if (deleteTweetMutation.isLoading) return;
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
                    className="text-lg font-medium leading-6 text-red-500"
                  >
                    Delete Tweet
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure that you want to delete this tweet?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={deleteTweetMutation.isLoading}
                      className={`${
                        deleteTweetMutation.isLoading
                          ? "cursor-not-allowed"
                          : ""
                      } h-25 mr-2 inline-flex w-40 justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() => {
                        if (deleteTweetMutation.isLoading) return;
                        deleteTweetMutation.mutate({
                          tweetId: props.selectedTweet,
                        });
                      }}
                    >
                      {deleteTweetMutation.isLoading ? (
                        <PacmanLoader size={9} color="#fff" />
                      ) : (
                        "Yeah, i'm sure"
                      )}
                    </button>
                    <button
                      type="button"
                      className="h-25 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        props.closeModal();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteModal;
