import Footer from './Website/Footer';
import Header from './Website/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Layout({ children }: any) {
    const router = useRouter();
    if (router.pathname != '/dashboard') {
        return (
            <div className='bg text-primary-dark '>
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
