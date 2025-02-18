import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('about', {
    title: 'About Us',
    description: "Learn about Lunaria's mission to help you take control of your financial future.",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
