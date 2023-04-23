import Link from 'next/link';
import DarkModeButtonIcon from '../DarkModeButtonIcon';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';
import Image from 'next/image';

function Header() {
    const user = true;
    const [headerMenu, setHeaderMenu] = useState(false);

    return (
        <header className='flex w-full items-center p-4 px-6'>
            <div className='basis-1/3'>
                <Link href='/'>
                    <Image src='/logo.png' alt='shield logo' width={48} height={48} />
                </Link>
            </div>
            <div className='hidden flex-1 items-center justify-center space-x-6 lg:flex'>
                <Link href='/features'>Features</Link>
                <Link href='/pricing'>Pricing</Link>
                <Link href='/tips' className='button-secondary ml-4 py-1'>
                    <i className='fi fi-rr-money-bill-wave -ml-[2px] pt-[2px] pr-2'></i>
                    <span>Money Tips</span>
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
                <div className='mr-2 pt-1'>
                    <DarkModeButtonIcon />
                </div>
                <Link href={`${user ? '/dashboard' : '/login'}`}>
                    <div className='button-secondary py-1'>{user ? 'Dashboard' : 'Sign In'}</div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
