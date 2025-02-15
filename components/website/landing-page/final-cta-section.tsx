'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const FinalCTASection = () => {
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
        <motion.section initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className='my-24 flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-bl from-[#f4e1b2]/80 via-[#f2ca73]/80 to-[#f9d97c]/80 px-16 py-16 sm:py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-4 text-4xl font-semibold text-black'>
                Take Control of Your Finances Today
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='mb-8 max-w-3xl text-lg text-zinc-800'>
                Join thousands of users who are already transforming their financial future with Lunaria.
            </motion.p>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
                {session ? (
                    <Button asChild size='lg' className='mt-4 rounded-full bg-zinc-50 text-zinc-950 hover:bg-zinc-100 px-8 py-3 font-medium dark:hover:bg-zinc-800 dark:bg-zinc-950 dark:text-zinc-50' role='button' aria-label='Go to Dashboard'>
                        <Link href='/dashboard'>Go to Dashboard</Link>
                    </Button>
                ) : (
                    <Button asChild size='lg' className='mt-4 rounded-full bg-zinc-50 text-zinc-950 hover:bg-zinc-100 px-8 py-3 font-medium dark:bg-white dark:text-zinc-950' role='button' aria-label='Get Started Now'>
                        <Link href='/pricing'>Get Started Now</Link>
                    </Button>
                )}
            </motion.div>
        </motion.section>
    );
};

export default FinalCTASection;
