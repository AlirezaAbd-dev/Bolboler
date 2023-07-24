import { useContext } from 'react';
import { BiSolidSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';

import { ThemeContext, type ThemeContextType } from '~/context/ThemeContext';

const ChangeThemeButton = () => {
    const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;

    return (
        <span
            onClick={() => {
                if (theme === 'dark') setTheme('light');
                else setTheme('dark');
            }}
            className="fixed cursor-pointer bottom-4 left-4 p-3 rounded-full bg-blue-500"
        >
            {theme === 'dark' ? (
                <BsFillMoonStarsFill className="w-6 h-6" />
            ) : (
                <BiSolidSun className="w-6 h-6" />
            )}
        </span>
    );
};

export default ChangeThemeButton;
