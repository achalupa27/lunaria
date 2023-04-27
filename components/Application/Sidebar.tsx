import React, { useState } from 'react';
import Image from 'next/image';
import DarkModeButtonIcon from '@/components/DarkModeButtonIcon';

const Sidebar = ({ screen, setScreen }: any) => {
    const [menu, setMenu] = useState(false);

    return (
        <div className='absolute left-0 top-0 flex h-screen w-14 flex-col items-center justify-center space-y-4 border-r bg-gray-50 py-2 dark:border-secondary/20 dark:bg-secondary-dark'>
            <Image src='/logo.png' alt='shield logo' width={36} height={36} className='relative cursor-pointer' onClick={() => setMenu(!menu)} />
            {menu && (
                <div className='absolute -top-3 left-12 z-40 w-48 rounded-xl border bg-secondary p-2 shadow dark:bg-secondary-dark' onClick={() => setMenu(false)}>
                    <span className='basic-button text-base'>Sign out</span>
                </div>
            )}
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <nav className={`sidebar-button ${screen === 'Dashboard' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Dashboard')}>
                    <i className='fi fi-rr-home'></i>
                </nav>
                <div className={`sidebar-button ${screen === 'Make' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Make')}>
                    <i className='fi fi-rr-coins'></i>
                </div>
                <div className={`sidebar-button ${screen === 'Save' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Save')}>
                    <i className='fi fi-rr-piggy-bank'></i>
                </div>
                <div className={`sidebar-button ${screen === 'Spend' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Spend')}>
                    <i className='fi fi-rr-money-bill-wave'></i>
                </div>
            </div>
            <div className='flex-col items-center space-y-3'>
                <div className='main-hover rounded-full transition duration-200'>
                    <DarkModeButtonIcon />
                </div>
                {/* <div className={`sidebar-button ${screen === 'Settings' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Settings')}>
                    <i className='fi fi-rr-settings'></i>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
