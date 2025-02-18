import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('terms', {
    title: 'Terms of Service',
    description: "Read the terms and conditions for using Lunaria's financial management platform.",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
