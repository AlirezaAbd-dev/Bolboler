import Link from "next/link";
import Tooltip from "./Tooltip";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscReply } from "react-icons/vsc";
import { useRouter } from "next/router";

type ReplyButtonProps = {
  id: string;
  subTweetCount: number;
};

const ReplyButton = (props: ReplyButtonProps) => {
  const router = useRouter();

  if (!router.pathname.includes("/tweet/")) {
    return (
      <div className="flex items-center">
        <Tooltip content="Reply" id="reply" place="top" delayShow={1000}>
          <Link href={`/tweet/${props.id}`}>
            <IconHoverEffect>
              <VscReply className="fill-gray-500" />
            </IconHoverEffect>
          </Link>
        </Tooltip>
        <span className="ml-1 text-gray-500">{props.subTweetCount}</span>
      </div>
    );
  }
};

export default ReplyButton;
