'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const DarkModeButton = () => {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return currentTheme === 'dark' ? (
        <button className='flex items-center justify-center space-x-2 rounded-lg border border-black p-2 transition duration-200 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black' onClick={() => setTheme('light')}>
            <i className='fi fi-rr-brightness' />
            <span>Light Mode</span>
        </button>
    ) : (
        <button className='flex items-center justify-center space-x-2 rounded-lg border border-black p-2 transition duration-200 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black' onClick={() => setTheme('dark')}>
            <i className='fi fi-rr-moon' />
            <span>Dark Mode</span>
        </button>
    );
};

export default DarkModeButton;
