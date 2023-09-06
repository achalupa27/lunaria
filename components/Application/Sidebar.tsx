import React, { useState } from 'react';
import Image from 'next/image';
import DarkModeButtonIcon from '@/components/DarkModeButtonIcon';

const Sidebar = ({ screen, setScreen }: any) => {
    const [menu, setMenu] = useState(false);

    return (
        <div className='flex h-screen w-14 flex-col items-center justify-center space-y-4 bg-gray-100 py-2 dark:border-secondary/20 dark:bg-black'>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <nav className={`sidebar-button ${screen === 'Dashboard' ? 'bg-white/20' : null}`} onClick={() => setScreen('Dashboard')}>
                    <i className='fi fi-rr-home'></i>
                </nav>
                <div className={`sidebar-button text-green-300 ${screen === 'Make' ? 'bg-white/20' : null}`} onClick={() => setScreen('Make')}>
                    <i className='fi fi-rr-coins'></i>
                </div>
                <div className={`sidebar-button text-blue-300 ${screen === 'Save' ? 'bg-white/20' : null}`} onClick={() => setScreen('Save')}>
                    <i className='fi fi-rr-piggy-bank'></i>
                </div>
                <div className={`sidebar-button text-yellow-200 ${screen === 'Spend' ? 'bg-white/20' : null}`} onClick={() => setScreen('Spend')}>
                    <i className='fi fi-rr-money-bill-wave'></i>
                </div>
            </div>
            <div className='flex-col items-center space-y-3'>
                <div className={`sidebar-button ${screen === 'Settings' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Settings')}>
                    <i className='fi fi-rr-settings'></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
