import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSession } from 'next-auth/react';
import { setMaking } from '@/redux/slices/makeSlice';

const useReadMaking = () => {
    const supabaseClient = useSupabaseClient();
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const email = session?.user?.email;

    useEffect(() => {
        if (email && supabaseClient) {
            readMaking();
        }
    }, []);

    const readMaking = async () => {
        if (!email) return;

        try {
            const { data: making, error } = await supabaseClient.from('making').select('*').eq('user_email', email);
            if (error) {
                console.error('Error in readMaking: ', error);
            } else {
                dispatch(setMaking(making as Make[]));
            }
        } catch (error) {
            console.error('Error in readMaking: ', error);
        }
    };

    return {
        /* any values you want to expose */
    };
};

export default useReadMaking;
