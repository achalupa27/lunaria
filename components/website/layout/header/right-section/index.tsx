'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, User } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Auth from '@/components/website/auth';
import Login from '@/components/website/auth/log-in';
import SignUp from '@/components/website/auth/sign-up';
import ForgotPassword from '@/components/website/auth/forgot-password';
import Reset from '@/components/website/auth/reset-password';
import ConfirmEmail from '@/components/website/auth/confirm-email';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const RightSection = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot-password' | 'reset-password' | 'confirm-email'>('login');
    const [email, setEmail] = useState<string>('');

    const supabase = createClient();
    const router = useRouter();
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            setSession(data?.session?.user);
        };

        // Initial session check
        getSession();

        // Subscribe to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session?.user ?? null);
        });

        // Cleanup subscription
        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    const handleAuthSuccess = () => {
        setIsAuthOpen(false);
        router.refresh();
    };

    const handleLogin = () => {
        setAuthView('login');
        setIsAuthOpen(true);
    };

    const handleSignUp = () => {
        setAuthView('signup');
        setIsAuthOpen(true);
    };

    const handleSignUpSuccess = () => {
        setEmail(email);
        setAuthView('confirm-email');
    };

    const handleResetSuccess = () => {
        setAuthView('login');
        setIsAuthOpen(false);
    };

    return (
        <>
            <div className='flex flex-1 justify-end lg:space-x-2'>
                {currentTheme === 'dark' ? (
                    <Button size='icon' variant='ghost' className='flex cursor-pointer items-center' onClick={() => setTheme('light')}>
                        <Sun />
                    </Button>
                ) : (
                    <Button size='icon' variant='ghost' className='flex cursor-pointer items-center' onClick={() => setTheme('dark')}>
                        <Moon />
                    </Button>
                )}

                {session ? (
                    <>
                        <Button asChild variant='secondary' size='icon' className='hidden lg:flex'>
                            <Link href='/profile'>
                                <User />
                            </Link>
                        </Button>
                        <Button asChild className='hidden lg:flex'>
                            <Link href='/dashboard'>Dashboard</Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant='secondary' onClick={handleLogin} className='hidden lg:flex'>
                            Log in
                        </Button>

                        <Button className='hidden lg:flex' onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </>
                )}

                <MobileMenu />
            </div>

            <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
                {authView === 'login' && <Login onSuccess={handleAuthSuccess} onSignUpClick={() => setAuthView('signup')} onForgotPasswordClick={() => setAuthView('forgot-password')} />}
                {authView === 'signup' && <SignUp onSuccess={handleSignUpSuccess} onLoginClick={() => setAuthView('login')} />}
                {authView === 'forgot-password' && <ForgotPassword onBackToLogin={() => setAuthView('login')} />}
                {authView === 'reset-password' && <Reset onSuccess={handleResetSuccess} />}
                {authView === 'confirm-email' && <ConfirmEmail email={email} onBackToLogin={() => setAuthView('login')} />}
            </Auth>
        </>
    );
};

export default RightSection;
