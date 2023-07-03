import React, { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../Button";
import { updateTextAreaSize } from "../Form";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { PacmanLoader } from "react-spinners";

type EditTweetFormProps = {
  tweetId: string;
  tweetContent: string;
  onClose: () => void;
};

const EditTweetForm = (props: EditTweetFormProps) => {
  const session = useSession();
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [inputValue, setInputValue] = useState(props.tweetContent);
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const trpcUtils = api.useContext();
  const editTweetMutation = api.tweet.edit.useMutation({
    async onSuccess() {
      await trpcUtils.tweet.invalidate();
      props.onClose();
    },
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
      if (session.status === "authenticated") {
        editTweetMutation.mutate({
          tweetId: props.tweetId,
          content: inputValue,
        });
      }
    }
  }

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.autofocus = true;
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="Like to Edit Tweet?"
        />
      </div>
      {isInputEmpty && (
        <p className="self-end text-red-500">
          You have to enter at least 3 characters in your tweet!
        </p>
      )}
      {editTweetMutation.isLoading ? (
        <PacmanLoader
          size={13}
          color="rgb(59 130 246)"
          className="self-end"
          cssOverride={{ marginRight: "40px" }}
        />
      ) : (
        <Button className="items-center self-end">Edit</Button>
      )}
    </form>
  );
};

export default EditTweetForm;
