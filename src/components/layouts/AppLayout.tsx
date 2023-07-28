import useTheme from '~/hooks/theme/useTheme';

const AppLayout = (props: { children: React.ReactNode }) => {
    const { theme } = useTheme();

    return (
        <main className={`${theme} w-full h-full`}>
            <div className="bg-white dark:bg-gray-900  w-full h-full">
                <div className="container mx-auto flex items-start sm:pr-4">
                    {props.children}
                </div>
            </div>
        </main>
    );
};

export default AppLayout;
