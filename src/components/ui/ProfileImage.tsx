import Image from 'next/image';
import { VscAccount } from 'react-icons/vsc';

import useTheme from '~/hooks/theme/useTheme';

type ProfileImageProps = {
    src?: string | null;
    className?: string;
};

export function ProfileImage({ src, className = '' }: ProfileImageProps) {
    const { theme } = useTheme();

    return (
        <div
            className={`relative h-8 w-8 md:h-12 md:w-12 overflow-hidden rounded-full border-4 ${
                theme === 'light' ? 'border-gray-200' : 'border-gray-800'
            } ${className}`}
        >
            {src == null ? (
                <VscAccount className="h-full w-full" />
            ) : (
                <Image src={src} alt="Profile Image" quality={100} fill />
            )}
        </div>
    );
}
