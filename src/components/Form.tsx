import { useSession } from 'next-auth/react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { PacmanLoader } from 'react-spinners';

import { Button } from './Button';
import { ProfileImage } from './ProfileImage';

import useCreateTweetMutation from '~/hooks/useCreateTweetMutation';

export function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if (textArea == null) return;
    textArea.style.height = '0';
    textArea.style.height = `${textArea.scrollHeight}px`;
}

function Form() {
    const session = useSession();
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, []);

    useLayoutEffect(() => {
        updateTextAreaSize(textAreaRef.current);
    }, [inputValue]);

    function inputValueHandler(value: string) {
        setInputValue(value);
    }

    const createTweet = useCreateTweetMutation({
        setInputValue: inputValueHandler,
    });

    if (session.status !== 'authenticated') return null;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (inputValue.trim().length < 3) {
            setIsInputEmpty(true);
        } else {
            setIsInputEmpty(false);
            createTweet.mutate({ content: inputValue });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 border-b dark:border-gray-800 px-4 py-2"
        >
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none dark:bg-gray-900 dark:text-white"
                    placeholder="What's happening?"
                />
            </div>
            {isInputEmpty && (
                <p className="self-end text-red-500">
                    You have to enter at least 3 characters in your tweet!
                </p>
            )}
            {createTweet.isLoading ? (
                <PacmanLoader
                    size={13}
                    color="rgb(59 130 246)"
                    className="self-end"
                    cssOverride={{ marginRight: '40px' }}
                />
            ) : (
                <Button className="items-center self-end">Tweet</Button>
            )}
        </form>
    );
}

export default Form;
