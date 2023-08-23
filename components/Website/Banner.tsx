import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import PostBanner1 from './PostBanner1';
import PostBanner2 from './PostBanner2';
import PostBanner3 from './PostBanner3';

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
        <div className='banner flex min-h-screen flex-col items-center'>
            <div className='mt-32 flex flex-col items-center space-y-3 text-4xl font-extrabold md:text-6xl'>
                <span className=''>Blossoming Finances. </span>
            </div>
            <div className='stars-container absolute top-0 left-0 z-10'>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
                <div className='stars'></div>
            </div>
            <ul className='circles [&li>]rounded-full [&>li>]border z-0'>
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
            <div className='relative pt-12'>
                <div className='flower-gradient absolute  animate-pulse' />
                <Image className='relative' src='/blooming-flower.png' alt='' width={500} height={500} />
            </div>
            <div className='mt-12 flex flex-col items-center space-y-3 text-4xl font-extrabold md:text-6xl'>
                <span className=''>Blooming Dreams. </span>
            </div>
            <Image className='absolute left-[8%] bottom-[20%] opacity-75 blur-[2px]' src='/blooming-flower-2.png' alt='' width={120} height={120} />
            <Image className='absolute right-[10%] top-[35%] opacity-75 blur-[1px]' src='/blooming-flower-3.png' alt='' width={120} height={120} />
            <PostBanner1 />
            <PostBanner2 />
            <PostBanner3 />
            <div className='z-10 mb-24 mt-12 flex'>
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
    );
}

export default Banner;
