'use client';

import Logo from '@/components/icons/logo';
import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTab, setTab } from '@/redux/slices/tab-slice';
import { Sun, Moon, Settings, Receipt } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const Sidebar = () => {
    const tab = useAppSelector(selectTab);
    const dispatch = useAppDispatch();

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        if (tab !== 'Transactions' && window.location.search) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, [tab]);

    const handleTabChange = (newTab: string) => {
        dispatch(setTab(newTab));
        if (window.location.search) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center space-y-4 bg-zinc-100 dark:bg-black dark:border-r-orange-100 border-r px-2 py-3'>
            <div className='border-b pb-2'>
                <div className='h-8 w-8 rounded-full bg-blue-300'></div>
            </div>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <button className={`sidebar-button p-2 ${tab === 'Home' ? 'bg-white/20' : null}`} onClick={() => handleTabChange('Home')}>
                    <Logo filled={tab === 'Home'} />
                </button>
                <button className={`sidebar-button ${tab === 'Make' && 'bg-white/20'}`} onClick={() => handleTabChange('Make')}>
                    <MakeIcon filled={tab === 'Make'} />
                </button>
                <button className={`sidebar-button ${tab === 'Save' && 'bg-white/20'}`} onClick={() => handleTabChange('Save')}>
                    <SaveIcon filled={tab === 'Save'} />
                </button>
                <button className={`sidebar-button ${tab === 'Spend' && 'bg-white/20'}`} onClick={() => handleTabChange('Spend')}>
                    <SpendIcon filled={tab === 'Spend'} />
                </button>
            </div>

            <div className='flex-col flex items-center space-y-3'>
                <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => handleTabChange('Transactions')}>
                    <Receipt />
                </Button>
                {currentTheme === 'dark' ? (
                    <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => setTheme('light')}>
                        <Sun />
                    </Button>
                ) : (
                    <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => setTheme('dark')}>
                        <Moon />
                    </Button>
                )}
                <Button variant='ghost' size='icon' className='hover:bg-zinc-300' onClick={() => handleTabChange('Settings')}>
                    <Settings />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
