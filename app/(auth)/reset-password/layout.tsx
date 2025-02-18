import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('reset-password', {
    title: 'Reset Password',
    description: 'Reset your Lunaria account password.',
});

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
