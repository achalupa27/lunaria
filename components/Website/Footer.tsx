import { COMPANY_NAME } from '../../constants';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='grid w-full grid-cols-2 items-center gap-y-2 border-t border-gray-800 bg-[#000127] py-2 text-sm md:grid-cols-4 lg:grid-cols-8'>
            <div className='flex justify-center'>
                <div className='flex w-fit items-center justify-center rounded bg-white px-2 font-medium text-secondary-dark'>
                    <i className='fi fi-rr-copyright mr-2' /> 2023 {COMPANY_NAME}
                </div>
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
};

export default Footer;
