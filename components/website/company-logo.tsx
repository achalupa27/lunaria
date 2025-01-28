'use client';

import Link from 'next/link';
import { COMPANY_NAME } from '@/constants';
import Logo from '../icons/Logo';

type CompanyLogoProps = {
    showName?: boolean;
    textColor?: string;
};

const CompanyLogo = ({ showName = true, textColor }: CompanyLogoProps) => {
    return (
        <Link href='/' className='flex w-fit items-center space-x-2 hover:cursor-pointer'>
            <Logo />
            {showName && <span className={`text-3xl font-normal ${textColor || 'text-stone-950 dark:text-stone-50'}`}>{COMPANY_NAME}</span>}
        </Link>
    );
};

export default CompanyLogo;
