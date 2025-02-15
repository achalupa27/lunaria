'use client';

import LogIn from '@/components/website/auth/log-in';

const LogInPage = () => {
    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <LogIn onSignUpClick={() => {}} onForgotPasswordClick={() => {}} />
        </section>
    );
};

export default LogInPage;
