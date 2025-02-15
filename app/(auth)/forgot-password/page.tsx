'use client';

import ForgotPassword from '@/components/website/auth/forgot-password';

const ForgotPasswordPage = () => {
    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <ForgotPassword onBackToLogin={() => {}} />
        </section>
    );
};

export default ForgotPasswordPage;
