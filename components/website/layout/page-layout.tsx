'use client';

import Header from './header';
import Footer from './footer';
import { Toaster } from '../../ui/sonner';
import { usePathname } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

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
            <Toaster icons={{ success: <CheckCircle className='text-green-500 h-4 w-4' /> }} />
        </>
    );
}

export default PageLayout;
