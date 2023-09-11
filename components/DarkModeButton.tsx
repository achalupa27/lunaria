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
        <button className='button-secondary' onClick={() => setTheme('light')}>
            <i className='fi fi-rr-brightness' />
            <span>Light Mode</span>
        </button>
    ) : (
        <button className='button-secondary' onClick={() => setTheme('dark')}>
            <i className='fi fi-rr-moon' />
            <span>Dark Mode</span>
        </button>
    );
};

export default DarkModeButton;
