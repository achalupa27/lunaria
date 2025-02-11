'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, User } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import Auth from '@/components/website/auth';
import Login from '@/components/website/auth/log-in';
import SignUp from '@/components/website/auth/sign-up';
import ForgotPassword from '@/components/website/auth/forgot-password';
import Reset from '@/components/website/auth/reset';
import ConfirmEmail from '@/components/website/auth/confirm-email';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const RightSection = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot-password' | 'reset' | 'confirm-email'>('login');
    const [email, setEmail] = useState<string>('');

    const supabase = createClient();
    const router = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const handleAuthSuccess = () => {
        setIsAuthOpen(false);
        router.refresh();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            <div className='mr-4 flex flex-1 justify-end lg:space-x-2'>
                {currentTheme === 'dark' ? (
                    <Button size='icon' variant='ghost' className='flex cursor-pointer items-center' onClick={() => setTheme('light')}>
                        <Sun />
                    </Button>
                ) : (
                    <Button size='icon' variant='ghost' className='flex cursor-pointer items-center' onClick={() => setTheme('dark')}>
                        <Moon />
                    </Button>
                )}

                <Button
                    variant='secondary'
                    onClick={() => {
                        setAuthView('login');
                        setIsAuthOpen(true);
                    }}
                    className='hidden lg:flex'>
                    Log in
                </Button>

                <Button
                    className='hidden lg:flex'
                    onClick={() => {
                        setAuthView('signup');
                        setIsAuthOpen(true);
                    }}>
                    Sign Up
                </Button>

                <MobileMenu />
            </div>

            <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
                {authView === 'login' && <Login onSuccess={handleAuthSuccess} onSignUpClick={() => setAuthView('signup')} onForgotPasswordClick={() => setAuthView('forgot-password')} />}
                {authView === 'signup' && (
                    <SignUp
                        onSuccess={() => {
                            setEmail(email);
                            setAuthView('confirm-email');
                        }}
                        onLoginClick={() => setAuthView('login')}
                    />
                )}
                {authView === 'forgot-password' && <ForgotPassword onSuccess={() => setAuthView('login')} onBackToLogin={() => setAuthView('login')} />}
                {authView === 'reset' && (
                    <Reset
                        onSuccess={() => {
                            setAuthView('login');
                            setIsAuthOpen(false);
                        }}
                    />
                )}
                {authView === 'confirm-email' && <ConfirmEmail email={email} onBackToLogin={() => setAuthView('login')} />}
            </Auth>
        </>
    );
};

export default RightSection;
