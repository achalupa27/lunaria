'use client';

import SignUp from '@/components/website/auth/sign-up';
import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('sign-up', {
    title: 'Sign Up',
    description: 'Create your Lunaria account and start managing your finances smarter.',
});

const SignUpPage = () => {
    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <SignUp onLoginClick={() => {}} />
        </section>
    );
};

export default SignUpPage;
