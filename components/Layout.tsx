import Footer from './Footer';
import Header from './Header';
import { useRouter } from 'next/router';

function Layout({ children }: any) {
    const router = useRouter();
    if (router.pathname != '/dashboard') {
        return (
            <div className='bg-secondary text-primary dark:bg-secondary-dark dark:text-primary-dark'>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        );
    } else
        return (
            <>
                <main>{children}</main>
            </>
        );
}

export default Layout;
