import React from 'react';
import DarkModeButton from '../DarkModeButton';
import { signOut } from 'next-auth/react';

const Settings = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <DarkModeButton />
            <button
                className='flex items-center justify-center space-x-2 rounded-lg border border-black p-2 transition duration-200 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
                onClick={() => {
                    signOut();
                }}
            >
                <span>Sign out</span>
            </button>
        </div>
    );
};

export default Settings;
