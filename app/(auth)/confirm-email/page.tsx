'use client';

import ConfirmEmail from '@/components/website/auth/confirm-email';
import { useRouter } from 'next/navigation';

const ConfirmEmailPage = () => {
    const router = useRouter();

    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <ConfirmEmail onBackToLogin={() => router.push('/log-in')} />
        </section>
    );
};

export default ConfirmEmailPage;
