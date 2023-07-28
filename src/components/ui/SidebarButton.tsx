import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

import { IconHoverEffect } from './IconHoverEffect';

type SidebarButtonProps = {
    children: React.ReactNode;
    Icon: IconType;
} & (
    | { role: 'link'; href: string }
    | { role: 'registery'; mode: 'login' | 'logout' }
);

const SidebarButton = (props: SidebarButtonProps) => {
    return (
        <li className="nav-button">
            {props.role === 'link' && (
                <Link href={props.href}>
                    <IconHoverEffect>
                        <span className="flex items-center gap-4">
                            <props.Icon className="w-4 h-4  md:h-8 md:w-8 dark:text-white" />
                            <span className="hidden text-lg dark:text-white md:inline">
                                {props.children}
                            </span>
                        </span>
                    </IconHoverEffect>
                </Link>
            )}
            {props.role === 'registery' && (
                <button
                    onClick={() => {
                        if (props.mode === 'login') void signIn('discord');
                        if (props.mode === 'logout') void signOut();
                    }}
                >
                    <IconHoverEffect>
                        <span
                            className={`flex items-center gap-4 ${
                                props.mode === 'logout'
                                    ? 'text-red-700 dark:text-red-500'
                                    : 'text-green-700 dark:text-green-500'
                            }`}
                        >
                            <props.Icon className={`w-4 h-4  md:h-8 md:w-8`} />
                            <span className="hidden text-lg  md:inline">
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
