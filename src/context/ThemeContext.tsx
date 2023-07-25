import { createContext, useEffect, useState } from 'react';

export type ThemeType = 'dark' | 'light';
export type SetThemeType = (theme: ThemeType) => void;
export type ThemeContextType = { theme: ThemeType; setTheme: SetThemeType };

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('dark');
    const [isWindow, setIsWindow] = useState(false);

    useEffect(() => {
        setTheme(
            window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light',
        );
        setIsWindow(true);
    }, []);

    function changeTheme(theme: ThemeType) {
        setTheme(theme);
    }

    if (isWindow) {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', function () {
                this.matches ? setTheme('dark') : setTheme('light');
            });
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
