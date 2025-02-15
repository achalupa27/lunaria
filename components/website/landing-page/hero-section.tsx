'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';

const HeroSection = () => {
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
        <section className='flex min-h-screen flex-col items-center justify-center'>
            <div className='mb-12 text-center text-lg font-semibold md:text-3xl xl:text-4xl'>Looking to Clean Up your Money?</div>
            <motion.h1 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25 }} className='text-3xl font-semibold tracking-tighter md:text-6xl xl:text-8xl text-center'>
                Welcome to your
            </motion.h1>
            <div className='flex flex-col sm:flex-row text-center sm:text-start'>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.75 }} className='text-3xl font-semibold tracking-tighter md:text-6xl xl:text-8xl'>
                    Personal&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1 }} className='text-3xl font-semibold tracking-tighter md:text-6xl xl:text-8xl'>
                    Money&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.25 }} className='text-3xl font-semibold tracking-tighter md:text-6xl xl:text-8xl'>
                    <div>Database.</div>
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.5 }} className='-mt-1 w-fit pl-[2.5px] text-xs font-light whitespace-nowrap tracking-normal text-zinc-950 dark:text-white sm:text-sm md:pl-1 xl:pl-[6px]'>
                        With Artificial Intelligence
                    </motion.div>
                </motion.div>
            </div>

            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 2 }} className='mt-12 flex flex-col items-center'>
                <span className='text-zinc-600 dark:text-zinc-400 md:text-2xl text-center'>Keep track of your finances.</span>
                <span className='text-zinc-600 dark:text-zinc-400 md:text-2xl text-center'>Watch your wealth grow.</span>
            </motion.div>
            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 2.25 }} className='z-10 mb-24 mt-24 flex'>
                {session ? (
                    <Link href='/dashboard'>
                        <div className='flex items-center justify-center'>
                            <Button id='dashboard-button' size='lg' className='rounded-full text-base'>
                                Dashboard
                            </Button>
                            <button className='btn2 hidden transition duration-200 dark:block'></button>
                        </div>
                    </Link>
                ) : (
                    <Link href='/pricing'>
                        <div className='group flex items-center justify-center'>
                            <button id='get-started-button' className='rounded-full bg-zinc-950 px-8 py-3 font-medium text-white dark:bg-white dark:text-zinc-950'>
                                Get Started
                            </button>
                            <button className='btn2 hidden transition duration-200 dark:block'></button>
                        </div>
                    </Link>
                )}
            </motion.div>
        </section>
    );
};

export default HeroSection;
