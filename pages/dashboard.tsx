import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSession } from 'next-auth/react';
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
