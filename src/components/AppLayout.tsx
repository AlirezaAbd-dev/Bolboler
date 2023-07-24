import { useContext } from 'react';
import { ThemeContext } from '~/context/ThemeContext';
import type { ThemeContextType } from '~/context/ThemeContext';

const AppLayout = (props: { children: React.ReactNode }) => {
    const { theme } = useContext(ThemeContext) as ThemeContextType;

    return (
        <main className={`${theme} w-full h-full`}>
            <div className="container mx-auto flex items-start sm:pr-4">
                {props.children}
            </div>
        </main>
    );
};

export default AppLayout;
