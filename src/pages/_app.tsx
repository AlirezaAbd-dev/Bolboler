import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap/dist/gsap';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import Head from 'next/head';

import AppLayout from '~/components/AppLayout';
import { SideNav } from '~/components/SideNav';
import ChangeThemeButton from '~/components/ui/ChangeThemeButton';
import ThemeContextProvider from '~/context/ThemeContext';
import '~/styles/globals.css';
import { api } from '~/utils/api';

gsap.registerPlugin(ScrollTrigger);

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>Bolboler</title>
                <meta
                    name="description"
                    content="This is a twitter like app created by AlirezaAbd"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeContextProvider>
                <ChangeThemeButton />
                <AppLayout>
                    <SideNav />
                    <div className="min-h-screen flex-grow overflow-x-hidden border-x dark:border-gray-800">
                        <Component {...pageProps} />
                    </div>
                </AppLayout>
            </ThemeContextProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
