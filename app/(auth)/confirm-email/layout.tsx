import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('confirm-email', {
    title: 'Confirm Email',
    description: 'Confirm your email address to complete your registration.',
});

export default function ConfirmEmailLayout({ children }: { children: React.ReactNode }) {
    return children;
}
