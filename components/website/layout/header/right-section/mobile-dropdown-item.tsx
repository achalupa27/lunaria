'use client';

import Logo from '@/components/icons/logo';
import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';

type Props = {
    label: string;
    summary: string;
    link: string;
};

const MobileDropdownItem = ({ label, summary, link }: Props) => {
    return (
        <a href={link} className='group/item flex h-full w-full flex-col justify-between rounded px-3 py-2 transition duration-200 hover:cursor-pointer hover:bg-zinc-300'>
            <div>
                <div className='flex items-center space-x-2 pb-[1px]'>
                    {label === 'Dashboard' && <Logo size={32} filled={true} />}
                    {label === 'Income Tracker' && <MakeIcon width={32} height={32} filled={true} />}
                    {label === 'Savings Tracker' && <SaveIcon width={32} height={32} filled={true} />}
                    {label === 'Spending Tracker' && <SpendIcon width={32} height={32} filled={true} />}
                    <span className='font-medium'>{label}</span>
                </div>
                <div className='mt-1 text-zinc-700'>{summary}</div>
            </div>
        </a>
    );
};

export default MobileDropdownItem;
