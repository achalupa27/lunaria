import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const DarkModeButtonIcon = () => {
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
                <div className='flex h-10 w-10 cursor-pointer items-center justify-center' onClick={() => setTheme('light')}>
                    <i className='fi fi-rr-brightness text-lg leading-none'></i>
                </div>
            ) : (
                <div className='flex h-10 w-10 cursor-pointer items-center justify-center' onClick={() => setTheme('dark')}>
                    <i className='fi fi-rr-moon text-lg leading-none'></i>
                </div>
            )}
        </div>
    );
};

export default DarkModeButtonIcon;
