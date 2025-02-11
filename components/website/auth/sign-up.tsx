import Logo from '@/components/icons/logo';
import Google from '@/components/icons/socials/google';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { FC, useState } from 'react';

interface SignUpProps {
    onSuccess?: () => void;
    onLoginClick: () => void;
}

const SignUp: FC<SignUpProps> = ({ onSuccess, onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/pricing`,
            },
        });

        if (error) {
            setError(error.message);
        } else if (onSuccess) {
            onSuccess();
        }

        setLoading(false);
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
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
            <h2 className='pb-8 text-center text-2xl font-medium'>Sign Up</h2>
            {error && <div className='rounded bg-red-100 p-3 text-sm text-red-500'>{error}</div>}

            <Button onClick={handleGoogleSignUp} disabled={loading} variant='secondary' size='lg' className='w-full'>
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
                    <label className='block text-sm font-medium'>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <div>
                    <label className='block text-sm font-medium'>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <Button type='submit' size='lg' disabled={loading} className='w-full'>
                    {loading ? 'Loading...' : 'Sign Up'}
                </Button>
            </form>

            <div className='pt-8 text-center text-sm'>
                Already have an account?{' '}
                <button onClick={onLoginClick} className='text-blue-600 hover:underline'>
                    Log In
                </button>
            </div>
        </div>
    );
};

export default SignUp;
