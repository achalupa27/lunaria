import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <section className='flex flex-col items-center'>
            <div className='mb-12 mt-52 text-center text-lg font-semibold md:text-3xl xl:text-4xl'>Looking to Clean Up your Money?</div>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
                <h1 className='gradient-bg bg-black bg-clip-text text-4xl font-semibold tracking-tighter text-transparent dark:bg-gradient-to-r md:text-6xl xl:text-8xl'>Welcome to your </h1>
            </motion.div>
            <motion.div className='gradient-bg flex bg-black bg-clip-text text-4xl font-semibold tracking-tighter text-transparent dark:bg-gradient-to-r md:text-6xl xl:text-8xl'>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.75 }}>
                    Personal&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1 }} className='pb-3'>
                    Money&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.25 }}>
                    <div>Database.</div>
                    <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.5 }} className='-mt-2 w-fit pl-[2.5px] text-xs font-light tracking-normal text-zinc-950 dark:text-white sm:text-sm md:pl-1 xl:pl-[6px]'>
                        With Artificial Intelligence
                    </motion.div>
                </motion.div>
            </motion.div>
            <div className='stars-container absolute left-0 top-0 z-10'>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
            </div>
            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.75 }} className='mt-12 flex flex-col items-center'>
                <span className='text-zinc-700 dark:text-zinc-400 md:text-2xl'>Keep track of your finances.</span>
                <span className='text-zinc-700 dark:text-zinc-400 md:text-2xl'>Watch your wealth grow.</span>
            </motion.div>
            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 2 }} className='z-10 mb-24 mt-24 flex'>
                {session ? (
                    <Link href='/dashboard'>
                        <div className='flex items-center justify-center'>
                            <Button size='lg' className='rounded-full text-base'>
                                Dashboard
                            </Button>
                            <button className='btn2 hidden transition duration-200 dark:block'></button>
                        </div>
                    </Link>
                ) : (
                    <Link href='/pricing'>
                        <div className='group flex items-center justify-center'>
                            <button className='rounded-full bg-zinc-950 px-8 py-3 font-medium text-white dark:bg-white dark:text-zinc-950'>Get Started</button>
                            <button className='btn2 hidden transition duration-200 dark:block'></button>
                        </div>
                    </Link>
                )}
            </motion.div>
        </section>
    );
};

export default HeroSection;
