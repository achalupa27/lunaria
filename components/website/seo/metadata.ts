import { COMPANY_NAME } from '@/constants';

type MetadataType = {
    title: string;
    description: string;
    image?: string;
    keywords?: string[];
    type?: string;
};

export const siteMetadata = {
    title: COMPANY_NAME,
    description: 'Your comprehensive site description here - make it compelling and keyword-rich (150-160 characters ideal)',
    siteUrl: 'https://lunaria.space',
    siteName: COMPANY_NAME,
    twitterHandle: '@lunaria_space',
    socialImage: '/path/to/social-image.jpg', // 1200x630px recommended
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

export const pageMetadata: Record<string, MetadataType> = {
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
        description: '...',
    },
    // Add more pages as needed
};
