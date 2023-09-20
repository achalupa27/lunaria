import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function Banner() {
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0a0817] to-[#060012]'>
            <div className='mt-52 mb-12 font-semibold md:text-2xl xl:text-4xl'>Looking to Organize your Money?</div>
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
                <span className='bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent md:text-6xl xl:text-8xl'>Welcome to your </span>
            </motion.div>
            <motion.div className='flex justify-center bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent md:text-6xl xl:text-8xl'>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.75 }}>
                    Personal&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1 }}>
                    Money&nbsp;
                </motion.div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.25 }}>
                    Database.
                </motion.div>
            </motion.div>
            <div className='stars-container absolute top-0 left-0 z-10'>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
            </div>
            <div className='mt-12 flex flex-col items-center'>
                <span className='text-2xl text-gray-400'>Keep track of your finances.</span>
                <span className='text-2xl text-gray-400'>Watch your money grow.</span>
            </div>
            <div className='z-10 mb-24 mt-24 flex'>
                {session ? (
                    <Link href='/dashboard'>
                        <div className='flex items-center justify-center'>
                            <button className='btn font-regular text-zinc-900 hover:border'>
                                Open Dashboard
                                <i className='fi fi-bs-angle-right pl-2 text-base text-zinc-700' />
                            </button>
                            <button className='btn2 transition duration-200 group-hover:visible'></button>
                        </div>
                    </Link>
                ) : (
                    <Link href='/register'>
                        <div className='group flex items-center justify-center'>
                            <button className='button-primary-alt px-8 py-3 font-medium text-zinc-900 hover:border'>
                                Get Started
                                <i className='fi fi-bs-angle-right pl-2 text-zinc-700' />
                            </button>
                            <button className='btn2 transition duration-200 group-hover:visible'></button>
                        </div>
                    </Link>
                )}
            </div>
            <div className='text-3xl font-medium'>People who use lunaria...</div>
            <div className='mb-36 mt-12 flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <motion.div initial={{ opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#99f5d1]'>73%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>add another</span>
                        <span className='font-semibold text-[#99f5d1]'>income source</span>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} whileInView={{ opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#93c5fd]'>91%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>see their</span>
                        <span className='font-semibold text-[#93c5fd]'>savings grow</span>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} whileInView={{ opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#f7ebc0]'>58%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>improve their</span>
                        <span className='font-semibold text-[#f7ebc0]'>spending habits</span>
                    </div>
                </motion.div>
            </div>
            <div className='mb-8 flex rounded-xl border border-blue-900/20 text-gray-600'>
                <Image src='/lunaria-plant.png' alt='' width={200} height={200} className='rounded-xl' />
                <div className='flex flex-col px-8 py-4'>
                    <span className='text-4xl font-semibold italic'>Lunaria annua</span>
                    <span className='-mt-2'>the money plant</span>
                    <span className='pt-14'>
                        Lunaria annua is commonly called honesty. <br /> A needed trait for you to develop with your money.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Banner;
