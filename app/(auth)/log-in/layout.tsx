import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('login', {
    title: 'Log In',
    description: 'Log in to your Lunaria account to manage your finances.',
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
