import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTab, setTab } from '@/redux/slices/tabSlice';
import MakeIcon from '../icons/make-icon';
import SaveIcon from '../icons/save-icon';
import SpendIcon from '../icons/spend-icon';
import Logo from '../icons/Logo';
import SettingsIcon from '../icons/settings-icon';

const Sidebar = () => {
    const tab = useAppSelector(selectTab);
    const dispatch = useAppDispatch();

    return (
        <div className='flex h-screen w-14 flex-col items-center justify-center space-y-4 bg-white py-2 shadow-sm dark:bg-primary'>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Dashboard' ? 'bg-white/20' : null}`} onClick={() => dispatch(setTab('Dashboard'))}>
                    <Logo filled={tab === 'Dashboard'} />
                </button>
                <button className={`sidebar-button ${tab === 'Make' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Make'))}>
                    <MakeIcon filled={tab === 'Make'} />
                </button>
                <button className={`sidebar-button ${tab === 'Save' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Save'))}>
                    <SaveIcon filled={tab === 'Save'} />
                </button>
                <button className={`sidebar-button ${tab === 'Spend' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Spend'))}>
                    <SpendIcon filled={tab === 'Spend'} />
                </button>
            </div>

            <div className='flex-col items-center space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Settings' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => dispatch(setTab('Settings'))}>
                    <SettingsIcon />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
