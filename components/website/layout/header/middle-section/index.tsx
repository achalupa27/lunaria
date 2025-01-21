import Link from 'next/link';
import Products from './products';

const MiddleSection = () => {
    return (
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-x-4'>
            <Products />
            <Link href='/pricing' className='translate flex h-8 items-center rounded px-3 duration-200 hover:bg-stone-300 hover:dark:bg-stone-700'>
                Pricing
            </Link>
        </div>
    );
};

export default MiddleSection;
