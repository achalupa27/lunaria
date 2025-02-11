'use client';

import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import { Toaster } from '../../ui/toaster';
import { usePathname } from 'next/navigation';

function Layout({ children }: any) {
    const pathname = usePathname();
    if (pathname != '/dashboard') {
        return (
            <div>
                <Head>
                    <title>lunaria - Personal Finance</title>
                </Head>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        );
    } else
        return (
            <>
                <Head>
                    <title>lunaria - Personal Finance</title>
                </Head>
                <main>{children}</main>
                <Toaster />
            </>
        );
}

export default Layout;
