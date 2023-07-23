import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { VscClose } from 'react-icons/vsc';
import { IconHoverEffect } from '~/components/IconHoverEffect';

type ModalLayoutProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
};

const ModalLayout = (props: ModalLayoutProps) => {
    return (
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
                                    <p>{props.title}</p>
                                    <span className="cursor-pointer hover:text-red-500">
                                        <IconHoverEffect>
                                            <VscClose
                                                onClick={props.closeModal}
                                                className="h-6 w-6"
                                            />
                                        </IconHoverEffect>
                                    </span>
                                </Dialog.Title>
                                {props.children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalLayout;
