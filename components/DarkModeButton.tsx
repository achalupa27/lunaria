'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

function DarkModeButton({ icon }: { icon?: string }) {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div>
            {currentTheme === 'dark' ? (
                <div className='flex items-center space-x-2' onClick={() => setTheme('light')}>
                    {icon === 'bold' ? <i className='fi fi-rr-brightness'></i> : <i className='fi fi-tr-brightness'></i>}
                    <span>Light Mode</span>
                </div>
            ) : (
                <div className='flex items-center space-x-2' onClick={() => setTheme('dark')}>
                    {icon === 'bold' ? <i className='fi fi-rr-moon-stars'></i> : <i className='fi fi-tr-moon-stars'></i>}
                    <span>Dark Mode</span>
                </div>
            )}
        </div>
    );
}

export default DarkModeButton;
