import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
        <div className='banner flex min-h-screen flex-col-reverse items-center justify-around px-12 pb-36 lg:flex-row lg:pb-12 2xl:px-0'>
            <div className='flex h-1/2 flex-col items-center md:ml-16 md:mt-16 md:h-auto'>
                <div className='flex flex-col items-center space-y-3 text-4xl font-extrabold md:text-6xl'>
                    <span className=''>Blossoming Finances, </span>
                    <span className=''>Blooming Dreams. </span>
                </div>
                <div className='stars-container absolute top-0 left-0 z-10'>
                    <div className='stars'></div>
                    <div className='stars'></div>
                    <div className='stars'></div>
                    <div className='stars'></div>
                </div>
                <ul className='circles [&li>]rounded-full z-0'>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className='z-10 flex basis-1/2 items-center justify-center p-16'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/20 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white' />
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/20 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white' />
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/20 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white' />
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/20 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white' />
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/20 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white' />
                </div>
                <div className='z-10 mt-8 flex'>
                    {session ? (
                        <Link href='/dashboard'>
                            <div className='flex items-center justify-center'>
                                <button className='btn transition duration-200 hover:scale-105'>Open Dashboard</button>
                                <button className='btn2'></button>
                            </div>
                        </Link>
                    ) : (
                        <Link href='/register'>
                            <div className='flex items-center justify-center'>
                                <button className='btn transition duration-200 hover:scale-105'>Start Your Journey</button>
                                <button className='btn2'></button>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Banner;
