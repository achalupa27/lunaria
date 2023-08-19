import { COMPANY_NAME } from '../../constants';
import Link from 'next/link';

function Footer() {
    return (
        <footer className='grid grid-cols-2 items-center justify-center gap-y-2 bg-transparent py-2 text-sm md:grid-cols-4 lg:grid-cols-8'>
            <div className='flex items-center justify-center'>
                <i className='fi fi-rr-copyright mr-2 pt-[3px]' /> 2023 {COMPANY_NAME}
            </div>
            <Link className='flex justify-center' href='/about'>
                <span>About</span>
            </Link>
            <Link className='flex justify-center' href='/help'>
                <span>Help Center</span>
            </Link>
            <Link className='flex justify-center' href='/contact'>
                <span>Contact</span>
            </Link>
            <Link className='flex justify-center' href='/terms'>
                Terms of Use
            </Link>
            <Link className='flex justify-center' href='/privacy'>
                Privacy Policy
            </Link>
            <Link className='flex justify-center' href='/cookies'>
                Cookies Policy
            </Link>
            <Link className='flex justify-center' href='/disclaimer'>
                Disclaimer
            </Link>
        </footer>
    );
}

export default Footer;
