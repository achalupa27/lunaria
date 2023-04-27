import Link from 'next/link';
import DarkModeButton from '../DarkModeButton';

const HeaderMenu = () => {
    const user = true;

    return (
        <div className='dark:border-ct-yellow dark:bg-ct-bg-dark dark:text-ct-yellow absolute top-16 z-50 w-48 rounded-2xl border bg-white p-1 text-black shadow-sm'>
            <div className='basic-button'>
                <DarkModeButton icon='bold' />
            </div>
            <Link href='/features' className='basic-button'>
                <span>Features</span>
            </Link>
            <Link href='/pricing' className='basic-button'>
                <span>Pricing</span>
            </Link>
            <Link href='/tips'>
                <div className='basic-button'>
                    <i className='fi fi-rr-money-bill-wave'></i>
                    <span>Money Tips</span>
                </div>
            </Link>
            <Link href={`${user ? '/dashboard' : '/login'}`}>
                <div className='button-secondary mt-1 py-1'>
                    {user ? <i className='fi fi-rr-arrow-up-right -ml-[2px] mt-[2px] pr-1 text-xs'></i> : null}
                    {user ? 'Dashboard' : 'Sign In'}
                </div>
            </Link>
        </div>
    );
};

export default HeaderMenu;
