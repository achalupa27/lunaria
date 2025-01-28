import Home from '../../features/home';
import Make from '../../features/make';
import Save from '../../features/save';
import Spend from '../../features/spend';
import { useAppSelector } from '@/redux/hooks';
import { selectTab } from '@/redux/slices/tabSlice';
import Settings from './settings';

const Activity = () => {
    const tab = useAppSelector(selectTab);

    if (tab === 'Home') return <Home />;
    else if (tab === 'Make') return <Make />;
    else if (tab === 'Save') return <Save />;
    else if (tab === 'Spend') return <Spend />;
    else if (tab === 'Settings') return <Settings />;

    return <div>Error</div>;
};

export default Activity;
