import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('privacy', {
    title: 'Privacy Policy',
    description: 'Learn how Lunaria protects and handles your personal information.',
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
