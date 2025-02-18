'use client';

import SignUp from '@/components/website/auth/sign-up';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const router = useRouter();

    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <SignUp onLoginClick={() => router.push('/log-in')} />
        </section>
    );
};

export default SignUpPage;
