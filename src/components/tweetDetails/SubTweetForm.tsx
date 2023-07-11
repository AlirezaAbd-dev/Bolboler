import type { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../Button";
import { ProfileImage } from "../ProfileImage";
import { PacmanLoader } from "react-spinners";
import { updateTextAreaSize } from "../Form";

type SubTweetFormProps = {
  tweetId: string;
};

function SubTweetForm(props: SubTweetFormProps) {
  const session = useSession();
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  const trpcUtils = api.useContext();

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createSubTweet = api.subTweet.create.useMutation({
    onSuccess: (newSubTweet) => {
      setInputValue("");
      trpcUtils.subTweet.getSubTweetsByTweetId.setData(
        { tweetId: props.tweetId },
        (oldData) => {
          if (oldData && oldData.length > 0) {
            const newData = [...oldData];
            newData.push(newSubTweet);

            return newData;
          } else {
            const dataArray = [];

            dataArray.push(newSubTweet);
            return dataArray;
          }
        }
      );
    },
  });

  if (session.status !== "authenticated") return null;

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
          cssOverride={{ marginRight: "40px" }}
        />
      ) : (
        <Button className="items-center self-end">Sub Tweet</Button>
      )}
    </form>
  );
}

export default SubTweetForm;
