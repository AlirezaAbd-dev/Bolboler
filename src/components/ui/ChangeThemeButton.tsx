import { BiSolidSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';

import useTheme from '~/hooks/theme/useTheme';

const ChangeThemeButton = () => {
    const { theme, setTheme } = useTheme();

    return (
        <span
            onClick={() => {
                if (theme === 'dark') setTheme('light');
                else setTheme('dark');
            }}
            className={`fixed cursor-pointer bottom-2 left-2 md:bottom-4 md:left-4 p-2 md:p-3 rounded-full ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
        >
            {theme === 'dark' ? (
                <BsFillMoonStarsFill className="w-3 h-3 md:w-6 md:h-6 fill-white" />
            ) : (
                <BiSolidSun className="w-3 h-3 md:w-6 md:h-6 fill-blue-800" />
            )}
        </span>
    );
};

export default ChangeThemeButton;
