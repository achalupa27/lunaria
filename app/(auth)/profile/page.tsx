'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

const ProfilePage = () => {
    const supabase = createClient();
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
        };
        getSession();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
            return;
        }
        router.refresh();
        router.push('/'); // Redirect to home page after sign out
    };
    return (
        <section className='p-4'>
            <pre className='mb-4 p-4 bg-gray-100 rounded overflow-auto'>{JSON.stringify(session, null, 2)}</pre>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </section>
    );
};

export default ProfilePage;
