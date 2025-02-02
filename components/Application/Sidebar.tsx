import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTab, setTab } from '@/redux/slices/tabSlice';
import MakeIcon from '../icons/make-icon';
import SaveIcon from '../icons/save-icon';
import SpendIcon from '../icons/spend-icon';
import Logo from '../icons/Logo';
import SettingsIcon from '../icons/settings-icon';
import { Sun, Moon, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

const Sidebar = () => {
    const tab = useAppSelector(selectTab);
    const dispatch = useAppDispatch();

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <div className='flex h-screen flex-col items-center justify-center space-y-4 bg-zinc-100 px-2 py-3'>
            <div className='border-b pb-2'>
                <div className='h-8 w-8 rounded-full bg-blue-300'></div>
            </div>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Home' ? 'bg-white/20' : null}`} onClick={() => dispatch(setTab('Home'))}>
                    <Logo filled={tab === 'Home'} />
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
                {currentTheme === 'dark' ? (
                    <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => setTheme('light')}>
                        <Sun />
                    </Button>
                ) : (
                    <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => setTheme('dark')}>
                        <Moon />
                    </Button>
                )}
                <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => dispatch(setTab('Settings'))}>
                    <Settings />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
