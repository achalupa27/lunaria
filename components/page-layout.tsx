import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './website/layout/header/header';
import Footer from './website/layout/footer/footer';

function Layout({ children }: any) {
    const router = useRouter();
    if (router.pathname != '/dashboard') {
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
            </>
        );
}

export default Layout;
