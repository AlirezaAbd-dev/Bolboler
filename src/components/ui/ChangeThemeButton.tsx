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
            className={`fixed cursor-pointer bottom-4 left-4 p-3 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
        >
            {theme === 'dark' ? (
                <BsFillMoonStarsFill className="w-6 h-6 fill-white" />
            ) : (
                <BiSolidSun className="w-6 h-6 fill-gray-90" />
            )}
        </span>
    );
};

export default ChangeThemeButton;
