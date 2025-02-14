import { Metadata } from 'next';
import { COMPANY_NAME } from '@/constants';

const siteConfig = {
    title: COMPANY_NAME,
    description: 'Take control of your financial future with Lunaria. Smart budgeting, investing, and money management tools all in one place.',
    siteUrl: 'https://lunaria.space',
    twitterHandle: '@lunaria_space',
    socialImage: '/path/to/social-image.jpg',
};

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/logo.svg',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.siteUrl,
        siteName: siteConfig.title,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.socialImage,
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        creator: siteConfig.twitterHandle,
        images: [siteConfig.socialImage],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};
