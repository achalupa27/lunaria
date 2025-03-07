'use client';

import Home from '../../features/home';
import Make from '../../features/core/make';
import Save from '../../features/core/save';
import Spend from '../../features/core/spend';
import { useAppSelector } from '@/store/hooks';
import { selectTab } from '@/store/slices/tab-slice';
import Settings from './settings';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../ui/loader';
import { ErrorBoundary } from 'react-error-boundary';
import Transactions from '../../features/tools/transactions';
import Reports from '@/features/tools/reports';
import { createClient } from '@/utils/supabase/client';

const Activity = () => {
    const tab = useAppSelector(selectTab);
    const supabase = createClient();
    const [user, setUser] = useState<any | null>(null);

    const checkUser = async () => {
        const { data: user } = await supabase.auth.getUser();
        setUser(user);
    };

    useEffect(() => {
        checkUser();
    }, []);

    const ActivityComponent = () => {
        if (tab === 'Home') return <Home />;
        else if (tab === 'Make') return <Make />;
        else if (tab === 'Save') return <Save />;
        else if (tab === 'Spend') return <Spend />;
        else if (tab === 'Reports') return <Reports />;
        else if (tab === 'Transactions') return <Transactions />;
        else if (tab === 'Settings') return <Settings />;
    };

    if (!user) return <Loader />;

    return (
        <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
            <Suspense fallback={<Loader />}>
                <ActivityComponent />
            </Suspense>
        </ErrorBoundary>
    );
};

export default Activity;
