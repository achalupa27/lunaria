import Footer from './Website/Footer';
import Header from './Website/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Layout({ children }: any) {
    const router = useRouter();
    if (router.pathname != '/dashboard') {
        return (
            <div className='bg-secondary text-primary dark:bg-secondary-dark dark:text-primary-dark'>
                <Head>
                    <title>Moneyshield - Make. Save. Spend.</title>
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
                    <title>Moneyshield - Make. Save. Spend.</title>
                </Head>
                <main>{children}</main>
            </>
        );
}

export default Layout;
