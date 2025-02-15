import { CheckCircle2 } from 'lucide-react';
import { FC } from 'react';

interface ConfirmEmailProps {
    email?: string;
    onBackToLogin: () => void;
}

const ConfirmEmail: FC<ConfirmEmailProps> = ({ email, onBackToLogin }) => {
    return (
        <div className='space-y-4 text-center'>
            <h3 className='text-2xl font-bold pb-8'>Verify Your Email</h3>
            <CheckCircle2 absoluteStrokeWidth strokeWidth={1} className='mx-auto h-12 w-12 text-green-600' />
            <p>We&apos;ve sent you a verification email.</p>
            <p className='text-sm text-zinc-700 dark:text-zinc-300 pb-8'>Please check your email and click the verification link to continue.</p>
            <button onClick={onBackToLogin} className='text-blue-600 dark:text-blue-400 hover:underline'>
                Back to Login
            </button>
        </div>
    );
};

export default ConfirmEmail;
