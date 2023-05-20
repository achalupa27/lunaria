import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function Banner() {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const user = true;
    return (
        <div className='flex min-h-screen flex-col-reverse items-center justify-around px-12 pb-36 lg:flex-row lg:pb-12 2xl:px-0'>
            <div className='flex h-1/2 flex-col items-center md:ml-16 md:mt-16 md:h-auto'>
                <div className='text-4xl font-semibold'>
                    <span className=''>Make. </span>
                    <span className=''>Save. </span>
                    <span className=''>Spend.</span>
                </div>
                <div className='text-2xl'>A simple approach to guarding your money.</div>

                <div className='flex basis-1/2 items-center justify-center p-16'>
                    <div className='relative h-[24rem] w-[24rem]'>{<Image fill alt='banner' object-fit='contain' src={theme === 'light' ? '/banner.png' : '/banner.png'} />}</div>
                </div>
                <div className='mt-8 flex w-[420px] flex-col space-y-2 lg:flex-row lg:space-x-3 lg:space-y-0'>
                    {user ? (
                        <Link href='/dashboard' className='button-primary hover:scale-105 active:scale-90 lg:w-1/2'>
                            <i className='fi fi-rr-arrow-up-right -ml-[3px] mt-[2px] pr-2'></i>
                            <span>Open Dashboard</span>
                        </Link>
                    ) : (
                        <Link href='/register' className='button-primary space-x-2 font-semibold lg:w-1/2'>
                            <span>Get Started</span>
                            <i className='fi fi-rr-arrow-right'></i>
                        </Link>
                    )}
                    <Link href='/how-it-works' className='button-secondary active:scale-90 lg:w-1/2'>
                        How it works
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
