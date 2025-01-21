import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
            <div className='flex min-h-screen flex-col items-center border-t border-t-blue-900/10 bg-gradient-to-b from-[#0a0817] to-[#060012]'>
                <div className='mb-12 mt-52 font-semibold md:text-2xl xl:text-4xl'>Looking to Organize your Money?</div>
                <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.25 }}>
                    <span className='bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent md:text-6xl xl:text-8xl'>Welcome to your </span>
                </motion.div>
                <motion.div className='flex bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-3xl font-semibold tracking-tighter text-transparent md:text-6xl xl:text-8xl'>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.75 }}>
                        Personal&nbsp;
                    </motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1 }} className='pb-3'>
                        Money&nbsp;
                    </motion.div>
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.25 }}>
                        <div>Database.</div>
                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1.5 }} className='-mt-2 w-fit pl-[2px] text-sm font-light tracking-normal text-white md:pl-1 xl:pl-[6px]'>
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
                    <span className='text-2xl text-gray-400'>Keep track of your finances.</span>
                    <span className='text-2xl text-gray-400'>Watch your money grow.</span>
                </motion.div>
                <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 2 }} className='z-10 mb-24 mt-24 flex'>
                    {session ? (
                        <Link href='/dashboard'>
                            <div className='flex items-center justify-center'>
                                <button className='button-primary-alt px-8 py-3 font-medium text-zinc-900 hover:border'>
                                    Dashboard
                                    <i className='fi fi-bs-angle-right pl-2 text-base text-zinc-700' />
                                </button>
                                <button className='btn2 transition duration-200 group-hover:visible'></button>
                            </div>
                        </Link>
                    ) : (
                        <Link href='/pricing'>
                            <div className='group flex items-center justify-center'>
                                <button className='button-primary-alt px-8 py-3 font-medium text-zinc-900 hover:border'>
                                    Get Started
                                    <i className='fi fi-bs-angle-right pl-2 text-zinc-700' />
                                </button>
                                <button className='btn2 transition duration-200 group-hover:visible'></button>
                            </div>
                        </Link>
                    )}
                </motion.div>
            </div>
            <div className='flex w-full flex-col items-center'>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='text-3xl font-medium'>
                    People who use lunaria...
                </motion.div>
                <div className='mb-36 mt-12 flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                        <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                        <div className='text-6xl font-semibold text-[#99f5d1]'>73%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span>add another</span>
                            <span className='font-semibold text-[#99f5d1]'>income source</span>
                        </div>
                    </motion.div>
                    <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                        <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                        <div className='text-6xl font-semibold text-[#93c5fd]'>91%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span>see their</span>
                            <span className='font-semibold text-[#93c5fd]'>savings grow</span>
                        </div>
                    </motion.div>
                    <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                        <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                        <div className='text-6xl font-semibold text-[#f7ebc0]'>58%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span>improve their</span>
                            <span className='font-semibold text-[#f7ebc0]'>spending habits</span>
                        </div>
                    </motion.div>
                </div>
                <div className='pb-20 text-3xl'>&quot;Whats gets measured gets improved.&quot;</div>
                <div className='-mt-16 text-gray-600'>- Unknown</div>
                <div className='mt-16 flex w-[60%] items-center justify-start'>
                    <div>
                        <Image src='/make.svg' alt='make arrow' width={140} height={140} />
                    </div>
                    <div className='flex-1'>
                        <div className='text-2xl'>Income</div>
                        <div className='-mt-[2px] text-gray-400'>&quot;Upwards and Forwards.&quot;</div>
                        <div className='pt-1'>While most traditional personal finance apps focus on tracking your spending, we prioritize tracking income.</div>
                    </div>
                </div>
                <div className='flex w-[60%] items-center justify-start'>
                    <div>
                        <Image src='/save.svg' alt='save arrow' width={140} height={140} />
                    </div>
                    <div className='flex-1'>
                        <div className='text-2xl'>Saving</div>
                        <div className='-mt-[2px] text-gray-400'>&quot;Grounding.&quot;</div>
                        <div className='pt-1'>Your savings are your financial base.</div>
                    </div>
                </div>
                <div className='flex w-[60%] items-center justify-start'>
                    <div>
                        <Image src='/spend.svg' alt='spend arrow' width={140} height={140} />
                    </div>
                    <div className='flex-1'>
                        <div className='text-2xl'>Spending</div>
                        <div className='-mt-[2px] text-gray-400'>&quot;Upwards but Backwards&quot;</div>
                        <div className='pt-1'>A necessary part of personal finance, spending will take your finances backwards, but your life forwards. The key is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                    </div>
                </div>
                <div className='my-36 flex rounded-xl border border-blue-900/20 text-gray-600'>
                    <Image src='/lunaria-plant.png' alt='lunaria plant' width={200} height={200} className='rounded-xl' />
                    <div className='flex flex-col px-8 py-4'>
                        <span className='text-4xl font-semibold italic'>Lunaria annua</span>
                        <span className='-mt-2'>• the money plant</span>
                        <span className='pt-14'>
                            Lunaria annua, often referred to as honesty, <br />
                            symbolizes that financial integrity brings real wealth.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
