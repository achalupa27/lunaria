import { FC } from 'react';

interface ConfirmEmailProps {
    email?: string;
    onBackToLogin: () => void;
}

const ConfirmEmail: FC<ConfirmEmailProps> = ({ email, onBackToLogin }) => {
    return (
        <div className='space-y-4 text-center'>
            <h2 className='text-2xl font-bold'>Verify Your Email</h2>
            <p>
                We&spos;ve sent a verification email to <span className='font-medium'>{email}</span>
            </p>
            <p className='text-sm text-gray-600'>Please check your email and click the verification link to continue.</p>
            <button onClick={onBackToLogin} className='text-blue-600 hover:underline'>
                Back to Login
            </button>
        </div>
    );
};

export default ConfirmEmail;
