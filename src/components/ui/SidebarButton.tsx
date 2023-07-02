import Link from "next/link";
import { IconHoverEffect } from "../IconHoverEffect";
import type { IconType } from "react-icons/lib";
import { signIn, signOut } from "next-auth/react";

type SidebarButtonProps = {
  children: React.ReactNode;
  Icon: IconType;
  href?: string;
  mode?: "login" | "logout";
};

const SidebarButton = (props: SidebarButtonProps) => {
  return (
    <li>
      {props.href && !props.mode && (
        <Link href={props.href}>
          <IconHoverEffect>
            <span className="flex items-center gap-4">
              <props.Icon className="h-8 w-8" />
              <span className="hidden text-lg md:inline">{props.children}</span>
            </span>
          </IconHoverEffect>
        </Link>
      )}
      {props.mode && !props.href && (
        <button
          onClick={() => {
            if (props.mode === "login") void signIn("discord");
            if (props.mode === "logout") void signOut();
          }}
        >
          <IconHoverEffect>
            <span className="flex items-center gap-4">
              <props.Icon className="h-8 w-8 fill-green-700" />
              <span className="hidden text-lg text-green-700 md:inline">
                {props.children}
              </span>
            </span>
          </IconHoverEffect>
        </button>
      )}
    </li>
  );
};

export default SidebarButton;
