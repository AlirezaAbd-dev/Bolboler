import { createContext, useState } from 'react';

export type ThemeType = 'dark' | 'light';
export type SetThemeType = (theme: ThemeType) => void;
export type ThemeContextType = { theme: ThemeType; setTheme: SetThemeType };

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    function changeTheme(theme: ThemeType) {
        setTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
            {props.children};
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
