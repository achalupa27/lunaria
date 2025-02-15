'use client';

import SignUp from '@/components/website/auth/sign-up';

const SignUpPage = () => {
    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <SignUp onLoginClick={() => {}} />
        </section>
    );
};

export default SignUpPage;
