import { createClient } from '@/utils/supabase/client';
import { FC, useState } from 'react';

interface ResetProps {
    onSuccess?: () => void;
}

const Reset: FC<ResetProps> = ({ onSuccess }) => {
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

        if (error) {
            setError(error.message);
        } else if (onSuccess) {
            onSuccess();
        }

        setLoading(false);
    };

    return (
        <div className='space-y-4'>
            <h2 className='text-center text-2xl font-bold'>Set New Password</h2>
            {error && <div className='rounded bg-red-100 p-3 text-sm text-red-500'>{error}</div>}

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium'>New Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full rounded border px-3 py-2' required />
                </div>

                <button type='submit' disabled={loading} className='w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50'>
                    {loading ? 'Loading...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default Reset;
