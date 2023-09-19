import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

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
            <div className='mt-52 mb-12 font-semibold xl:text-4xl'>Looking to organize your money?</div>
            <div className=''>
                <span className='bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl lg:text-8xl'>Welcome to your </span>
            </div>
            <div className=''>
                <span className='bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl lg:text-8xl'>Personal Money Database. </span>
            </div>
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
                            <button className='button-primary-alt text-zinc-900 hover:border'>
                                Get Started
                                <i className='fi fi-bs-angle-right pl-2 text-zinc-700' />
                            </button>
                            <button className='btn2 transition duration-200 group-hover:visible'></button>
                        </div>
                    </Link>
                )}
            </div>
            <div className='text-3xl font-medium'>People who use lunaria...</div>
            <div className='mb-36 mt-12 flex space-x-24'>
                <div className='flex h-52 w-72 flex-col items-center justify-center rounded-xl border-4 border-[#99f5d1] bg-[#99f5d1]/5'>
                    <div className='text-6xl font-semibold text-[#99f5d1]'>73%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>add another</span>
                        <span className='font-semibold text-[#99f5d1]'>income source</span>
                    </div>
                </div>
                <div className='flex h-52 w-72 flex-col items-center justify-center rounded-xl border-4 border-[#93c5fd] bg-[#93c5fd]/5'>
                    <div className='text-6xl font-semibold text-[#93c5fd]'>91%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>see their</span>
                        <span className='font-semibold text-[#93c5fd]'>savings grow</span>
                    </div>
                </div>
                <div className='flex h-52 w-72 flex-col items-center justify-center rounded-xl border-4 border-[#f7ebc0] bg-[#f7ebc0]/5'>
                    <div className='text-6xl font-semibold text-[#f7ebc0]'>58%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>improve their</span>
                        <span className='font-semibold text-[#f7ebc0]'>spending habits</span>
                    </div>
                </div>
            </div>
            <div className='mb-8 flex flex-col text-gray-600'>
                <span className='text-xl font-semibold italic'>lunaria annua</span>
                <span className='-mt-2'>the silver dollar plant</span>
            </div>
        </div>
    );
}

export default Banner;
