'use client';

import Header from './header';
import Footer from './footer';
import { Toaster } from '../../ui/toaster';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { COMPANY_NAME } from '@/constants';

// Define metadata types and configuration inline
type MetadataType = {
    title: string;
    description: string;
    image?: string;
    keywords?: string[];
    type?: string;
};

const siteMetadata = {
    title: COMPANY_NAME,
    description: 'Your comprehensive site description here - make it compelling and keyword-rich (150-160 characters ideal)',
    siteUrl: 'https://lunaria.space',
    siteName: COMPANY_NAME,
    twitterHandle: '@lunaria_space',
    socialImage: '/path/to/social-image.jpg',
    locale: 'en_US',
    type: 'website',
    keywords: ['Lunaria', 'Finance', 'Money', 'Budget', 'Invest', 'Save', 'Make', 'Dashboard'],
    authors: [
        {
            name: 'Lunaria Space',
            url: 'https://lunaria.space',
        },
    ],
};

const pageMetadata: Record<string, MetadataType> = {
    home: {
        title: `${siteMetadata.title} - Home`,
        description: 'Take control of your financial future with Lunaria. Smart budgeting, investing, and money management tools all in one place.',
        keywords: [...siteMetadata.keywords, 'Personal Finance', 'Financial Planning'],
        type: 'website',
    },
    pricing: {
        title: `${siteMetadata.title} - Pricing`,
        description: 'Flexible pricing plans for every financial journey. Choose the perfect plan to achieve your money goals.',
        keywords: [...siteMetadata.keywords, 'Pricing', 'Subscription', 'Plans'],
        type: 'product',
    },
    dashboard: {
        title: `${siteMetadata.title} - Dashboard`,
        description: 'Manage your finances with our comprehensive dashboard.',
    },
};

function Layout({ children }: any) {
    const pathname = usePathname();
    const getMetadataKey = (path: string) => {
        const cleanPath = path.slice(1);
        return cleanPath === '' ? 'home' : cleanPath.toLowerCase();
    };

    const currentPage = getMetadataKey(pathname);
    const isDashboard = pathname === '/dashboard';
    const metadata = pageMetadata[currentPage] || pageMetadata.home;

    const MetadataHead = () => (
        <Head>
            {/* Primary Meta Tags */}
            <title>{metadata.title}</title>
            <meta name='title' content={metadata.title} />
            <meta name='description' content={metadata.description} />
            <meta name='keywords' content={metadata.keywords?.join(', ') || siteMetadata.keywords.join(', ')} />

            {/* Open Graph / Facebook */}
            <meta property='og:type' content={metadata.type || siteMetadata.type} />
            <meta property='og:url' content={siteMetadata.siteUrl} />
            <meta property='og:title' content={metadata.title} />
            <meta property='og:description' content={metadata.description} />
            <meta property='og:image' content={metadata.image || siteMetadata.socialImage} />
            <meta property='og:locale' content={siteMetadata.locale} />
            <meta property='og:site_name' content={siteMetadata.siteName} />

            {/* Twitter */}
            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content={siteMetadata.siteUrl} />
            <meta property='twitter:title' content={metadata.title} />
            <meta property='twitter:description' content={metadata.description} />
            <meta property='twitter:image' content={metadata.image || siteMetadata.socialImage} />
            <meta name='twitter:creator' content={siteMetadata.twitterHandle} />

            {/* Additional Meta Tags */}
            <meta name='robots' content='index, follow' />
            <meta name='author' content={siteMetadata.authors[0].name} />
            <link rel='canonical' href={siteMetadata.siteUrl} />
        </Head>
    );

    if (!isDashboard) {
        return (
            <div>
                <MetadataHead />
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        );
    } else {
        return (
            <>
                <MetadataHead />
                <main>{children}</main>
                <Toaster />
            </>
        );
    }
}

export default Layout;
