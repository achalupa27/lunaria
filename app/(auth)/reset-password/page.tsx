'use client';

import { getPageMetadata } from '@/app/metadata.config';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export const metadata = getPageMetadata('reset-password', {
    title: 'Reset Password',
    description: 'Reset your Lunaria account password.',
});

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) setError(error.message);
        else {
            // handle success
        }
        setLoading(false);
    };

    return (
        <section className='space-y-4 max-w-sm mx-auto flex flex-col justify-center h-screen -my-24'>
            <div className='flex w-full items-center justify-center'>
                <Logo filled={true} />
            </div>
            <h2 className='text-center pb-8 text-2xl font-medium'>Set New Password</h2>
            {error && <div className='rounded-xl bg-red-100 p-3 text-sm text-red-500'>{error}</div>}

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <Label>New Password</Label>

                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <Button type='submit' disabled={loading} className='w-full'>
                    {loading ? 'Loading...' : 'Update Password'}
                </Button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
