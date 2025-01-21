import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTab, setTab } from '@/redux/slices/tabSlice';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Sidebar = () => {
    const tab = useAppSelector(selectTab);
    const dispatch = useAppDispatch();
    const { theme } = useTheme();

    const getDashboardLogo = (): string => {
        if (tab === 'Dashboard' && theme === 'light') return '/logo-dark.svg';
        if (tab === 'Dashboard' && theme === 'dark') return '/logo.svg';
        if (tab !== 'Dashboard' && theme === 'light') return '/logo-empty-dark.svg';
        if (tab !== 'Dashboard' && theme === 'dark') return '/logo-empty.svg';
        return '';
    };

    const getMakeLogo = (): string => {
        if (tab === 'Make' && theme === 'light') return '/make-dark.svg';
        if (tab === 'Make' && theme === 'dark') return '/make.svg';
        if (tab !== 'Make' && theme === 'light') return '/make-empty-dark.svg';
        if (tab !== 'Make' && theme === 'dark') return '/make-empty.svg';
        return '';
    };

    const getSaveLogo = (): string => {
        if (tab === 'Save' && theme === 'light') return '/save-dark.svg';
        if (tab === 'Save' && theme === 'dark') return '/save.svg';
        if (tab !== 'Save' && theme === 'light') return '/save-empty-dark.svg';
        if (tab !== 'Save' && theme === 'dark') return '/save-empty.svg';
        return '';
    };

    const getSpendLogo = (): string => {
        if (tab === 'Spend' && theme === 'light') return '/spend-dark.svg';
        if (tab === 'Spend' && theme === 'dark') return '/spend.svg';
        if (tab !== 'Spend' && theme === 'light') return '/spend-empty-dark.svg';
        if (tab !== 'Spend' && theme === 'dark') return '/spend-empty.svg';
        return '';
    };

    return (
        <div className='flex h-screen w-14 flex-col items-center justify-center space-y-4 bg-white py-2 shadow-sm dark:bg-primary'>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Dashboard' ? 'bg-white/20' : null}`} onClick={() => dispatch(setTab('Dashboard'))}>
                    <Image src={getDashboardLogo()} alt='' height={48} width={48} />
                </button>
                <button className={`sidebar-button ${tab === 'Make' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Make'))}>
                    <Image src={getMakeLogo()} alt='' height={48} width={48} />
                </button>
                <button className={`sidebar-button ${tab === 'Save' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Save'))}>
                    <Image src={getSaveLogo()} alt='' height={48} width={48} />
                </button>
                <button className={`sidebar-button ${tab === 'Spend' && 'bg-white/20'}`} onClick={() => dispatch(setTab('Spend'))}>
                    <Image src={getSpendLogo()} alt='' height={48} width={48} />
                </button>
            </div>

            <div className='flex-col items-center space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Settings' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => dispatch(setTab('Settings'))}>
                    <Image src={theme === 'light' ? '/settings-dark.svg' : '/settings.svg'} alt='' height={48} width={48} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
