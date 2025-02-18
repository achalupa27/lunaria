import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('sign-up', {
    title: 'Sign Up',
    description: 'Create your Lunaria account and start managing your finances smarter.',
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
    return children;
}
