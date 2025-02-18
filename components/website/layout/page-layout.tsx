'use client';

import Header from './header';
import Footer from './footer';
import { Toaster } from '../../ui/toaster';
import { usePathname } from 'next/navigation';

function PageLayout({ children }: any) {
    const pathname = usePathname();
    const getMetadataKey = (path: string) => {
        const cleanPath = path.slice(1);
        return cleanPath === '' ? 'home' : cleanPath.toLowerCase();
    };

    const currentPage = getMetadataKey(pathname);
    const isDashboard = currentPage === 'dashboard';

    return (
        <>
            {!isDashboard && <Header />}
            <main>{children}</main>
            {!isDashboard && <Footer />}
            <Toaster />
        </>
    );
}

export default PageLayout;
