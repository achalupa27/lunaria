'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

const Settings = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            {/* <Button onClick={() => signOut()}>Sign out</Button> */}

            {currentTheme === 'dark' ? (
                <Button size='icon-lg' className='flex cursor-pointer items-center' onClick={() => setTheme('light')}>
                    <Sun />
                </Button>
            ) : (
                <Button size='icon-lg' className='flex cursor-pointer items-center' onClick={() => setTheme('dark')}>
                    <Moon />
                </Button>
            )}
        </div>
    );
};

export default Settings;
