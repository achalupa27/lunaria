'use client';

import { ChevronDown, MenuIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MobileDropdownItem from './mobile-dropdown-item';
import { products } from '../data';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import CompanyLogo from '@/components/website/company-logo';
import { createClient } from '@/utils/supabase/client';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Update `isMobile` based on window size
    useEffect(() => {
        const updateIsMobile = () => {
            const isSmallScreen = window.innerWidth < 1024; // lg breakpoint

            // Close the sheet if the screen becomes large
            if (!isSmallScreen) {
                setIsOpen(false);
            }
        };

        updateIsMobile(); // Initial check
        window.addEventListener('resize', updateIsMobile);
        return () => {
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);

    const [session, setSession] = useState<any | null>(null);
    const supabase = createClient();

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

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='lg:hidden' onClick={() => setIsOpen(true)}>
                    <MenuIcon />
                    <span className='sr-only'>Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side='right' className='flex flex-col p-0 border border-orange-100'>
                {/* Sticky Header */}
                <div className='sticky top-0 border-b px-8 py-7'>
                    <SheetTitle>
                        <CompanyLogo />
                    </SheetTitle>
                </div>

                {/* Scrollable Content */}
                <div className='flex-1 space-y-1 overflow-y-auto px-3 py-3'>
                    {Object.entries(products).map(([category, items]) => (
                        <Collapsible key={category}>
                            <CollapsibleTrigger className='flex w-full items-center justify-between space-x-1.5 rounded px-3 py-2 transition duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {items.map((product) => (
                                    <MobileDropdownItem key={product.label} label={product.label} link={product.pageLink} summary={product.summary} />
                                ))}
                                <Separator className='my-3 bg-zinc-300 dark:bg-zinc-700' orientation='horizontal' />
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                    <Link href='/pricing'>
                        <div className='flex w-full items-start rounded px-3 py-2 transition duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                            <h4>Pricing</h4>
                        </div>
                    </Link>
                </div>

                {/* Sticky Footer */}
                <div className='sticky bottom-0 border-t p-6 space-y-1'>
                    {session ? (
                        <>
                            <Button asChild size='lg' variant='secondary' className='w-full justify-start px-4'>
                                <Link href='/profile'>Profile</Link>
                            </Button>
                            <Button asChild size='lg' className='w-full justify-start px-4'>
                                <Link href='/dashboard'>Dashboard</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild size='lg' variant='secondary' className='w-full justify-start px-4'>
                                <Link href='/log-in'>Log in</Link>
                            </Button>
                            <Button asChild size='lg' className='w-full justify-start px-4'>
                                <Link href='/sign-up'>Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
