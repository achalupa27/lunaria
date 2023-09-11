import React from 'react';
import DarkModeButton from '../DarkModeButton';

const Settings = () => {
    return (
        <div className='flex h-screen w-screen items-center justify-center pl-14'>
            <span className='text-red-600'>
                <button className='button-secondary'>
                    <span>Sign out</span>
                </button>
                <DarkModeButton />
            </span>
        </div>
    );
};

export default Settings;
