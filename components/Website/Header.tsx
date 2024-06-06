import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

function Header() {
    const { data: session } = useSession();
    const [headerMenu, setHeaderMenu] = useState(false);

    return (
        <header className='absolute left-0 top-0 z-20 flex w-full items-center border-b border-blue-900/20 bg-[#060012] p-4 px-6'>
            <div className='basis-1/3'>
                <Link href='/' className='flex w-fit items-center space-x-2'>
                    <Image className='h-8 w-8' src='/logo.svg' alt='logo' width={32} height={32} />
                    <span className='text-3xl font-semibold'>lunaria</span>
                </Link>
            </div>
            <div className='hidden flex-1 items-center justify-center space-x-6 lg:flex'>
                <Link className='rounded-xl px-6 py-2 transition duration-500 hover:bg-white/20' href='/features'>
                    Features
                </Link>
                <Link className='rounded-xl px-6 py-2 transition duration-500 hover:bg-white/20' href='/pricing'>
                    Pricing
                </Link>
                {/* <Link className='rounded-xl px-6 py-2 transition duration-500 hover:bg-white/20' href='/basics'>
                    Basics
                </Link> */}
            </div>
            <div className='flex basis-1/3 lg:hidden'></div>
            <div className='flex basis-1/3 justify-end lg:hidden'>
                <button className='cursor-pointer' onClick={() => setHeaderMenu(true)}>
                    <i className='fi fi-rr-menu-burger'></i>
                </button>

                {headerMenu && <HeaderMenu />}
            </div>
            {headerMenu && <div className='absolute left-0 top-0 z-40 h-screen w-screen bg-transparent' onClick={() => setHeaderMenu(false)}></div>}
            <div className='hidden basis-1/3 items-center justify-end space-x-2 lg:flex'>
                {session ? (
                    <Link href='/dashboard'>
                        <div className='button-secondary'>Dashboard</div>
                    </Link>
                ) : (
                    <button className='button-secondary' onClick={() => signIn()}>
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
