'use client';

import ForgotPassword from '@/components/website/auth/forgot-password';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
    const router = useRouter();

    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <ForgotPassword onBackToLogin={() => router.push('/log-in')} />
        </section>
    );
};

export default ForgotPasswordPage;
