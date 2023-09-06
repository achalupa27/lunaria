import React from 'react';
import DarkModeButtonIcon from '../DarkModeButtonIcon';

const Settings = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center pl-14'>
            <span className='text-red-600'>
                <span className='basic-button text-base'>Sign out</span>
                <div className='main-hover rounded-md transition duration-200'>
                    <DarkModeButtonIcon />
                </div>
            </span>
        </div>
    );
};

export default Settings;
