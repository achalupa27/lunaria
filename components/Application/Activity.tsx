import Dashboard from '../../features/Home';
import Make from '../../features/Make';
import Save from '../../features/Save';
import Spend from '../../features/Spend';
import Settings from './Settings';
import { useAppSelector } from '@/redux/hooks';
import { selectTab } from '@/redux/slices/tabSlice';

const Activity = () => {
    const tab = useAppSelector(selectTab);

    if (tab === 'Dashboard') return <Dashboard />;
    else if (tab === 'Make') return <Make />;
    else if (tab === 'Save') return <Save />;
    else if (tab === 'Spend') return <Spend />;
    else if (tab === 'Settings') return <Settings />;

    return <div>Error</div>;
};

export default Activity;
