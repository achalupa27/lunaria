import Sidebar from '../components/application/Sidebar';
import Activity from '../components/application/Activity';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMaking } from '@/redux/slices/makeSlice';
import { setSaving } from '@/redux/slices/saveSlice';
import { setSpending } from '@/redux/slices/spendSlice';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSession } from 'next-auth/react';
import { readSpending } from '@/features/Spend/services/readSpends';
import { readSaving } from '@/features/Save/services/readSaves';
import { readMaking } from '@/features/Make/services/readMakes';
import Loader from '@/components/ui/Loader';
import { selectUser, setUser } from '@/redux/slices/userSlice';

const App = () => {
    const supabaseClient = useSupabaseClient();
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        const email = session?.user?.email;

        if (email) {
            readSpending(email, supabaseClient, dispatch, setSpending);
            readSaving(email, supabaseClient, dispatch, setSaving);
            readMaking(email, supabaseClient, dispatch, setMaking);
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
        <div className='flex h-screen w-screen dark:bg-primary-dark'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
