import { useSession } from 'next-auth/react';
import type { FormEvent } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import useCreateSubTweetMutation from '~/hooks/useCreateSubTweetMutation';

import { Button } from '../Button';
import { updateTextAreaSize } from '../Form';
import { ProfileImage } from '../ProfileImage';

type SubTweetFormProps = {
    tweetId: string;
};

function SubTweetForm(props: SubTweetFormProps) {
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

    const createSubTweet = useCreateSubTweetMutation({
        tweetId: props.tweetId,
        setInputValue: inputValueHandler,
    });

    if (session.status !== 'authenticated') return null;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (inputValue.trim().length < 3) {
            setIsInputEmpty(true);
        } else {
            setIsInputEmpty(false);
            createSubTweet.mutate({
                mainTweetId: props.tweetId,
                content: inputValue,
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 border-b px-4 py-2"
        >
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
                    placeholder="Wanna say something?"
                />
            </div>
            {isInputEmpty && (
                <p className="self-end text-red-500">
                    You have to enter at least 3 characters in your tweet!
                </p>
            )}
            {createSubTweet.isLoading ? (
                <PacmanLoader
                    size={13}
                    color="rgb(59 130 246)"
                    className="self-end"
                    cssOverride={{ marginRight: '40px' }}
                />
            ) : (
                <Button className="items-center self-end">Sub Tweet</Button>
            )}
        </form>
    );
}

export default SubTweetForm;
