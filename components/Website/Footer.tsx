import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { bodyActivities, lifeActivities, mindActivities } from '@/constants';
import Image from 'next/image';

const Footer = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <footer className='mx-auto grid w-[95%]  border-t border-blue-900/20 bg-[#060012] py-16 xl:grid-cols-7'>
            <div className='relative col-span-2 pl-8 pb-12'>
                <div className='flex'>
                    <Image src='/logo.png' alt='logo' className='h-12 w-12' width={48} height={48} />
                    <div className='pt-1 pl-2'>
                        <div className='text-3xl font-medium leading-none tracking-wide'>lunaria</div>
                        <div className='text-xs'>Your personal money database.</div>
                    </div>
                </div>
                <div className='absolute bottom-0 pl-2 text-sm'>© 2023 lunaria</div>
            </div>
            {/* <div className='[&>a]:footer-link flex flex-col space-y-1 text-sm'>
                <Link href='/journal' className='mb-1 px-2 text-base font-medium'>
                    Life
                </Link>
                {lifeActivities.map((activity) => (
                    <Link href={`/${activity.toLowerCase()}`}>{activity}</Link>
                ))}
            </div>
            <div className='[&>a]:footer-link flex flex-col space-y-1 text-sm'>
                <Link href='/research' className='mb-1 px-2 text-base font-medium'>
                    Body
                </Link>
                {bodyActivities.map((activity) => (
                    <Link href={`/${activity.toLowerCase()}`}>{activity}</Link>
                ))}
            </div>
            <div className='[&>a]:footer-link flex flex-col space-y-1 text-sm'>
                <Link href='/connect' className='mb-1 px-2 text-base font-medium'>
                    Mind
                </Link>
                {mindActivities.map((activity) => (
                    <Link href={`/${activity.toLowerCase()}`}>{activity}</Link>
                ))}
            </div> */}
            <div className='[&>a]:footer-link flex flex-col space-y-1 text-sm'>
                <h4 className='mb-2 px-2 text-base font-medium'>Company</h4>
                <Link href='/about'>About</Link>
                <Link href='/features'>Features</Link>
                <Link href='/pricing'>Pricing</Link>
                <Link href='/contact'>Contact</Link>
                <Link href='/help'>Help Center</Link>
            </div>
            <div className='[&>a]:footer-link flex flex-1 flex-col space-y-1 text-sm'>
                <h4 className='mb-2 px-2 text-base font-medium'>Legal</h4>
                <Link href='/terms'>Terms of use</Link>
                <Link href='/privacy'>Privacy policy</Link>
                <Link href='/cookies'>Cookies policy</Link>
                <Link href='/disclaimer'>Disclaimer</Link>
            </div>
        </footer>
    );
};

export default Footer;
