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

    const user = true;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='lg:hidden' onClick={() => setIsOpen(true)}>
                    <MenuIcon />
                    <span className='sr-only'>Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side='right' className='flex flex-col  p-0'>
                {/* Sticky Header */}
                <div className='sticky top-0 h-24 border-b px-8 py-6'>
                    <SheetTitle>
                        <CompanyLogo />
                    </SheetTitle>
                </div>

                {/* Scrollable Content */}
                <div className='flex-1 space-y-1 overflow-y-auto p-3'>
                    {Object.entries(products).map(([category, items]) => (
                        <Collapsible key={category}>
                            <CollapsibleTrigger className='flex w-full items-center justify-between space-x-1.5 rounded px-3 py-2 transition duration-200 hover:bg-zinc-200'>
                                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {items.map((product) => (
                                    <MobileDropdownItem key={product.label} label={product.label} link={product.pageLink} summary={product.summary} />
                                ))}
                                <Separator className='mt-1 bg-zinc-300' orientation='horizontal' />
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                    <Link href='/pricing'>
                        <div className='flex w-full items-start rounded px-3 py-2 transition duration-200 hover:bg-zinc-200'>
                            <h4>Pricing</h4>
                        </div>
                    </Link>
                </div>

                {/* Sticky Footer */}
                <div className='sticky bottom-0 border-t p-6 space-y-1'>
                    <Button size='lg' variant='secondary' className='w-full justify-start'>
                        Log in
                    </Button>
                    <Button size='lg' className='w-full justify-start'>
                        Sign Up
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
