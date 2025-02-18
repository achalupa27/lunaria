'use client';

import LogIn from '@/components/website/auth/log-in';
import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('login', {
    title: 'Log In',
    description: 'Log in to your Lunaria account to manage your finances.',
});

const LogInPage = () => {
    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <LogIn onSignUpClick={() => {}} onForgotPasswordClick={() => {}} />
        </section>
    );
};

export default LogInPage;
