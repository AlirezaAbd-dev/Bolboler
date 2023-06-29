import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

const NewTweetForm = () => {
  const session = useSession();

  if (session.status !== "authenticated") return;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        ></textarea>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
};

export default NewTweetForm;
