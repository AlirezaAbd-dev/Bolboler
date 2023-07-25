import { useContext } from 'react';

import { ThemeContext, type ThemeContextType } from '~/context/ThemeContext';

const useTheme = () => {
    const theme = useContext(ThemeContext) as ThemeContextType;

    return theme;
};

export default useTheme;
