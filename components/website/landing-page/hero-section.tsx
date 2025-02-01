import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

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
        <div>
            <div className='bg-zing-50 flex min-h-screen flex-col items-center border-t border-t-blue-900/10 dark:bg-gradient-to-b dark:from-[#0a0817] dark:to-[#060012]'>
                <div className='mb-12 mt-52 font-semibold md:text-2xl xl:text-4xl'>Looking to Clean Up your Money?</div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
                    <span className='bg-black from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent dark:bg-gradient-to-r md:text-6xl xl:text-8xl'>Welcome to your </span>
                </motion.div>
                <motion.div className='flex bg-black from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent dark:bg-gradient-to-r md:text-6xl xl:text-8xl'>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.75 }}>
                        Personal&nbsp;
                    </motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1 }} className='pb-3'>
                        Money&nbsp;
                    </motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.25 }}>
                        <div>Database.</div>
                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.5 }} className='text:zinc-950 -mt-2 w-fit pl-[2px] text-sm font-light tracking-normal dark:text-white md:pl-1 xl:pl-[6px]'>
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
                    <span className='text-2xl text-gray-700 dark:text-gray-400'>Keep track of your finances.</span>
                    <span className='text-2xl text-gray-700 dark:text-gray-400'>Watch your money grow.</span>
                </motion.div>
                <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 2 }} className='z-10 mb-24 mt-24 flex'>
                    {session ? (
                        <Link href='/dashboard'>
                            <div className='flex items-center justify-center'>
                                <button className='rounded-full bg-white px-8 py-3 font-medium text-zinc-900'>Dashboard</button>
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
            </div>
        </div>
    );
};

export default HeroSection;
