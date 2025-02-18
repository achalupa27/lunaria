import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('forgot-password', {
    title: 'Forgot Password',
    description: 'Reset your password to regain access to your account.',
});

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
