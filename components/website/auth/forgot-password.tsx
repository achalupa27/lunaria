import { createClient } from '@/utils/supabase/client';
import { FC, useState } from 'react';

interface ForgotPasswordProps {
    onSuccess?: () => void;
    onBackToLogin: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ onSuccess, onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setSubmitted(true);
            if (onSuccess) onSuccess();
        }

        setLoading(false);
    };

    return (
        <div className='space-y-4'>
            <h2 className='text-center text-2xl font-bold'>Reset Password</h2>

            {submitted ? (
                <div className='space-y-4 text-center'>
                    <p className='text-green-600'>Check your email for the password reset link.</p>
                    <button onClick={onBackToLogin} className='text-blue-600 hover:underline'>
                        Back to Login
                    </button>
                </div>
            ) : (
                <>
                    {error && <div className='rounded bg-red-100 p-3 text-sm text-red-500'>{error}</div>}

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium'>Email</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full rounded border px-3 py-2' required />
                        </div>

                        <button type='submit' disabled={loading} className='w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50'>
                            {loading ? 'Loading...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className='text-center'>
                        <button onClick={onBackToLogin} className='text-blue-600 hover:underline'>
                            Back to Login
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
