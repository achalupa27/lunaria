import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('cookies', {
    title: 'Cookie Policy',
    description: 'Learn about how Lunaria uses cookies and similar technologies.',
});

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
