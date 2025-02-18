import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('profile', {
    title: 'Profile',
    description: 'Manage your Lunaria account settings and preferences.',
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return children;
}
