import Home from '../../features/home';
import Make from '../../features/make';
import Save from '../../features/save';
import Spend from '../../features/spend';
import { useAppSelector } from '@/redux/hooks';
import { selectTab } from '@/redux/slices/tab-slice';
import Settings from './settings';
import { Suspense } from 'react';
import Loader from '../ui/loader';

const Activity = () => {
    const tab = useAppSelector(selectTab);

    if (tab === 'Home')
        return (
            <Suspense fallback={<Loader />}>
                <Home />
            </Suspense>
        );
    else if (tab === 'Make')
        return (
            <Suspense fallback={<Loader />}>
                <Make />
            </Suspense>
        );
    else if (tab === 'Save')
        return (
            <Suspense fallback={<Loader />}>
                <Save />
            </Suspense>
        );
    else if (tab === 'Spend')
        return (
            <Suspense fallback={<Loader />}>
                <Spend />
            </Suspense>
        );
    else if (tab === 'Settings')
        return (
            <Suspense fallback={<Loader />}>
                <Settings />
            </Suspense>
        );

    return <div>Error</div>;
};

export default Activity;
