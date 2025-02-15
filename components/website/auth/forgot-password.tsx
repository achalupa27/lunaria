import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { CheckCircle2 } from 'lucide-react';
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
            redirectTo: `${window.location.origin}/reset-password`,
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
            <div className='flex w-full items-center justify-center'>
                <Logo filled={true} />
            </div>
            <h2 className='text-center text-2xl font-medium pb-8'>{submitted ? 'Email Sent' : 'Reset Password'}</h2>

            {submitted ? (
                <div className='space-y-4 text-center'>
                    <CheckCircle2 absoluteStrokeWidth strokeWidth={1} className='mx-auto h-12 w-12 text-green-600' />
                    <p className='pb-12'>Check your email for the password reset link.</p>
                    <button onClick={onBackToLogin} className='text-blue-600 hover:underline text-sm'>
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

                        <Button type='submit' disabled={loading} size='lg' className='w-full '>
                            {loading ? 'Loading...' : 'Send Reset Link'}
                        </Button>
                    </form>

                    <div className='text-center text-sm pt-8'>
                        <button onClick={onBackToLogin} className='text-blue-600 dark:text-blue-400 hover:underline'>
                            Back to Login
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
