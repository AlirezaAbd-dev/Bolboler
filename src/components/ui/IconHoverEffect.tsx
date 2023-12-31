import { type ReactNode } from 'react';

import useTheme from '~/hooks/theme/useTheme';

type IconHoverEffectProps = {
    children: ReactNode;
};

export function IconHoverEffect({ children }: IconHoverEffectProps) {
    const { theme } = useTheme();
    const colorClasses =
        theme === 'light'
            ? 'outline-gray-400 hover:bg-gray-200 group-hover-bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200'
            : 'outline-gray-800 hover:bg-gray-800 group-hover-bg-gray-800 group-focus-visible:bg-gray-800 focus-visible:bg-gray-800';

    return (
        <div
            className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}
        >
            {children}
        </div>
    );
}
