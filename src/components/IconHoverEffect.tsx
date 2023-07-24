import type { ReactNode } from 'react';

type IconHoverEffectProps = {
    children: ReactNode;
};

export function IconHoverEffect({ children }: IconHoverEffectProps) {
    const colorClasses = `outline-gray-400 hover:bg-gray-200 group-hover-bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200
        dark:outline-gray-800 dark:hover:bg-gray-800 dark:group-hover-bg-gray-800 dark:group-focus-visible:bg-gray-800 dark:focus-visible:bg-gray-800
        `;

    return (
        <div
            className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}
        >
            {children}
        </div>
    );
}
