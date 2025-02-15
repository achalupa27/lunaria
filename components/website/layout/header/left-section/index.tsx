'use client';

import Logo from '@/components/icons/logo';
import { COMPANY_NAME } from '@/constants';
import Link from 'next/link';

const LeftSection = () => {
    return (
        <div className='flex flex-1'>
            <Link href='/' className='flex w-fit items-center space-x-2 hover:cursor-pointer'>
                <Logo filled={true} size={40} />
                <span className={`text-3xl font-normal hidden sm:block`}>{COMPANY_NAME}</span>
            </Link>
        </div>
    );
};

export default LeftSection;
