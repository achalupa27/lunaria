'use client';

import LogIn from '@/components/website/auth/log-in';
import { useRouter } from 'next/navigation';

const LogInPage = () => {
    const router = useRouter();

    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <LogIn onSignUpClick={() => router.push('/sign-up')} onForgotPasswordClick={() => router.push('/reset-password')} />
        </section>
    );
};

export default LogInPage;
