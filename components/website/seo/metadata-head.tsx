import Head from 'next/head';
import { siteMetadata, pageMetadata } from '@/components/website/seo/metadata';

type MetadataProps = {
    page: keyof typeof pageMetadata;
};

export default function MetadataHead({ page }: MetadataProps) {
    const metadata = pageMetadata[page];
    const fullTitle = metadata.title;
    const fullDescription = metadata.description;
    const imageUrl = metadata.image || siteMetadata.socialImage;
    const type = metadata.type || siteMetadata.type;
    const keywords = metadata.keywords || siteMetadata.keywords;

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name='title' content={fullTitle} />
            <meta name='description' content={fullDescription} />
            <meta name='keywords' content={keywords.join(', ')} />

            {/* Open Graph / Facebook */}
            <meta property='og:type' content={type} />
            <meta property='og:url' content={siteMetadata.siteUrl} />
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={fullDescription} />
            <meta property='og:image' content={imageUrl} />
            <meta property='og:locale' content={siteMetadata.locale} />
            <meta property='og:site_name' content={siteMetadata.siteName} />

            {/* Twitter */}
            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content={siteMetadata.siteUrl} />
            <meta property='twitter:title' content={fullTitle} />
            <meta property='twitter:description' content={fullDescription} />
            <meta property='twitter:image' content={imageUrl} />
            <meta name='twitter:creator' content={siteMetadata.twitterHandle} />
        </Head>
    );
}
