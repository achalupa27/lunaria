import { createClient } from '@/utils/supabase/client';
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import Google from '@/components/icons/socials/google';
import Logo from '@/components/icons/logo';

interface LoginProps {
    onSuccess?: () => void;
    onSignUpClick: () => void;
    onForgotPasswordClick: () => void;
}

const Login: FC<LoginProps> = ({ onSuccess, onSignUpClick, onForgotPasswordClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else if (onSuccess) {
            onSuccess();
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });

        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className='space-y-4'>
            <div className='flex w-full items-center justify-center'>
                <Logo filled={true} />
            </div>
            <h2 className='pb-8 text-center text-2xl font-medium'>Log In</h2>
            {error && <div className='rounded bg-red-100 p-3 text-sm text-red-500'>{error}</div>}

            <Button variant='secondary' size='lg' onClick={handleGoogleLogin} disabled={loading} className='w-full'>
                <Google />
                Continue with Google
            </Button>

            <div className='relative py-4'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className='bg-white px-4 text-gray-500 dark:bg-gray-900'>or</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <div className='flex justify-between'>
                        <label className='block text-sm font-medium'>Email</label>
                        <button onClick={onForgotPasswordClick} className='text-sm text-blue-600 hover:underline'>
                            Forgot Password?
                        </button>
                    </div>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <div>
                    <label className='block text-sm font-medium'>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <Button type='submit' size='lg' disabled={loading} className='w-full'>
                    {loading ? 'Loading...' : 'Log In'}
                </Button>
            </form>

            <div className='space-y-2 text-center pt-8'>
                <div className='text-sm'>
                    Don&apos;t have an account?{' '}
                    <button onClick={onSignUpClick} className='text-blue-600 hover:underline'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
