import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('help', {
    title: 'Help Center',
    description: "Find answers to common questions about using Lunaria's financial management tools.",
});

export default function HelpLayout({ children }: { children: React.ReactNode }) {
    return children;
}
