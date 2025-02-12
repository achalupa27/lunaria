'use client';

import Link from 'next/link';
import { COMPANY_NAME } from '@/constants';
import Logo from '../icons/logo';

type CompanyLogoProps = {
    showName?: boolean;
    textColor?: string;
};

const CompanyLogo = ({ showName = true, textColor }: CompanyLogoProps) => {
    return (
        <Link href='/' className='flex w-fit items-center space-x-2 hover:cursor-pointer'>
            <Logo filled={true} height={40} width={40} />
            {showName && <span className={`text-3xl font-normal hidden sm:block ${textColor || 'text-zinc-950 dark:text-zinc-50'}`}>{COMPANY_NAME}</span>}
        </Link>
    );
};

export default CompanyLogo;
