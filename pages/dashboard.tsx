import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMaking } from '@/redux/slices/makeSlice';
import { setSaving } from '@/redux/slices/saveSlice';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSession } from 'next-auth/react';
import { readSpendsService } from '@/features/spend/services/read-spends-service';
import { readSavesService } from '@/features/save/services/read-saves-service';
import { readMakesService } from '@/features/make/services/read-makes-service';
import Loader from '@/components/ui/loader';
import { selectUser, setUser } from '@/redux/slices/userSlice';
import Sidebar from '@/components/application/sidebar';
import Activity from '@/components/application/activity';

const App = () => {
    const supabaseClient = useSupabaseClient();
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        const email = session?.user?.email;

        if (email) {
            readSpendsService(email, supabaseClient);
            readSavesService(email, supabaseClient);
            readMakesService(email, supabaseClient);
        }

        if (session) {
            const sessionUser = {
                email: session!.user!.email,
            };
            dispatch(setUser(sessionUser));
        }
    }, [session, dispatch, supabaseClient]);

    if (!session || !user) return <Loader />;

    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
