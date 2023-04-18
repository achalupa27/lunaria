import React from 'react';
import Image from 'next/image';
import DarkModeButtonIcon from '@/components/DarkModeButtonIcon';

const Sidebar = ({ setScreen }: any) => {
    return (
        <div className='absolute left-0 top-0 flex h-screen w-14 flex-col items-center justify-center space-y-4 border-r py-2 dark:border-secondary-dark'>
            <Image src='/logo.png' alt='shield logo' width={36} height={36} />
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <nav className='sidebar-button' onClick={() => setScreen('Dashboard')}>
                    <i className='fi fi-rr-layout-fluid'></i>
                </nav>
                <div className='sidebar-button' onClick={() => setScreen('Make')}>
                    <i className='fi fi-rr-coins'></i>
                </div>
                <div className='sidebar-button' onClick={() => setScreen('Save')}>
                    <i className='fi fi-rr-piggy-bank'></i>
                </div>
                <div className='sidebar-button' onClick={() => setScreen('Spend')}>
                    <i className='fi fi-rr-money-bill-wave'></i>
                </div>
            </div>
            <div className='flex-col items-center space-y-3'>
                <div className='pl-2'>
                    <DarkModeButtonIcon />
                </div>
                <div className='sidebar-button' onClick={() => setScreen('Settings')}>
                    <i className='fi fi-rr-settings'></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
