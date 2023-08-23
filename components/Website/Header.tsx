import Link from 'next/link';
import DarkModeButtonIcon from '../DarkModeButtonIcon';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
    const { data: session } = useSession();
    const [headerMenu, setHeaderMenu] = useState(false);

    const handleSignIn = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        await signIn();
    };
    const handleSignOut = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        await signOut();
    };

    return (
        <header className='absolute top-0 left-0 z-20 flex w-full items-center bg-transparent p-4 px-6'>
            <div className='basis-1/3'>
                <Link href='/' className='flex items-center space-x-2'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-full border border-white/70 bg-white/30 text-xl transition duration-500 hover:bg-white hover:shadow-xl hover:shadow-white'></div>
                    <span className='text-3xl font-semibold'>lunaria</span>
                </Link>
            </div>
            <div className='hidden flex-1 items-center justify-center space-x-6 lg:flex'>
                <Link className='rounded-full px-6 py-2 transition duration-500 hover:bg-white/20' href='/features'>
                    Features
                </Link>
                <Link className='rounded-full px-6 py-2 transition duration-500 hover:bg-white/20' href='/pricing'>
                    Pricing
                </Link>
                <Link className='rounded-full px-6 py-2 transition duration-500 hover:bg-white/20' href='/basics'>
                    Basics
                </Link>
            </div>
            <div className='flex basis-1/3 lg:hidden'></div>
            <div className='flex basis-1/3 justify-end lg:hidden'>
                <button className='cursor-pointer' onClick={() => setHeaderMenu(true)}>
                    <i className='fi fi-rr-menu-burger'></i>
                </button>

                {headerMenu && <HeaderMenu />}
            </div>
            {headerMenu && <div className='absolute top-0 left-0 z-40 h-screen w-screen bg-transparent' onClick={() => setHeaderMenu(false)}></div>}
            <div className='hidden basis-1/3 items-center justify-end space-x-2 lg:flex'>
                <Link href={`${session ? '/dashboard' : '/dashboard'}`}>
                    <div className='button-secondary'>{session ? 'Dashboard' : 'Sign In'}</div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
