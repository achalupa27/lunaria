'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const supabase = createClient();
    const router = useRouter();

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
        <section>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </section>
    );
};

export default ProfilePage;
