import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = {
    small?: boolean;
    gray?: boolean;
    className?: string;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export function Button({
    small = false,
    gray = false,
    className = '',
    ...props
}: ButtonProps) {
    const sizeClasses = small
        ? 'px-2 py-1'
        : 'px-2 py-1 md:px-4 md:py-2 font-bold';
    const colorClasses = gray
        ? 'bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300'
        : 'bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400';

    return (
        <button
            className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-xs md:text-base ${sizeClasses} ${colorClasses} ${className}`}
            {...props}
        >
            {props.children}
        </button>
    );
}
