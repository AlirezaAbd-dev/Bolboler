import { useSession } from 'next-auth/react';
import React, { useCallback, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { PacmanLoader } from 'react-spinners';

import { updateTextAreaSize } from '../mainPage/mainPageForm/Form';
import { Button } from '../ui/Button';

import useEditSubTweetMutation from '~/hooks/useEditSubTweetMutation';

type EditSubTweetFormProps = {
    subTweetId: string;
    subTweetContent: string;
    tweetId: string;
    onClose: () => void;
};

const EditSubTweetForm = (props: EditSubTweetFormProps) => {
    const session = useSession();
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [inputValue, setInputValue] = useState(props.subTweetContent);
    const textAreaRef = useRef<HTMLTextAreaElement>();

    const editSubTweetMutation = useEditSubTweetMutation({
        onClose: props.onClose,
        tweetId: props.tweetId,
    });

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (inputValue.length < 3) {
            setIsInputEmpty(true);
        } else {
            if (session.status === 'authenticated') {
                editSubTweetMutation.mutate({
                    subTweetId: props.subTweetId,
                    content: inputValue,
                });
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-5 md:mx-10 flex flex-col gap-2 border-b dark:border-gray-800 p-2 md:px-4 md:py-2"
        >
            <div className="flex gap-2 md:gap-4">
                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow resize-none overflow-hidden p-2 md:p-4 text-xs md:text-lg outline-none dark:bg-gray-900 dark:text-white"
                    placeholder="Like to Edit Tweet?"
                    autoFocus
                />
            </div>
            {isInputEmpty && (
                <p className="self-end text-red-500 text-xs md:text-base">
                    You have to enter at least 3 characters in your tweet!
                </p>
            )}
            {editSubTweetMutation.isLoading ? (
                <PacmanLoader
                    size={13}
                    color="rgb(59 130 246)"
                    className="self-end"
                    cssOverride={{ marginRight: '40px' }}
                />
            ) : (
                <Button className="items-center self-end">Edit</Button>
            )}
        </form>
    );
};

export default EditSubTweetForm;
