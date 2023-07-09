import Link from "next/link";
import { IconHoverEffect } from "../IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";

const TweetDetailsHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
      <Link href=".." className="mr-2">
        <IconHoverEffect>
          <VscArrowLeft className="h-6 w-6" />
        </IconHoverEffect>
      </Link>
      <div className="ml-2 flex-grow">
        <h1 className="text-lg font-bold">Tweet Details</h1>
      </div>
    </header>
  );
};

export default TweetDetailsHeader;
