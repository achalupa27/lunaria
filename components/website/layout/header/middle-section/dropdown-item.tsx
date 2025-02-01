'use client';

import Logo from '@/components/icons/Logo';
import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import { Layout } from 'lucide-react';

// import { getActivityIcon } from '@/utils/icons';

type Props = {
    label: string;
    summary: string;
};

const DropdownItem = ({ label, summary }: Props) => {
    return (
        <a href={`/${label.toLocaleLowerCase()}`} className='group/item flex h-full w-96 flex-col justify-between rounded-xl bg-zinc-50 px-3 py-2 transition duration-200 hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 xl:w-56 2xl:w-64'>
            <div>
                <div className='flex items-center space-x-2 pb-[1px]'>
                    {label === 'Dashboard' && <Logo filled={true} />}
                    {label === 'Income Tracker' && <MakeIcon filled={true} />}
                    {label === 'Savings Tracker' && <SaveIcon filled={true} />}
                    {label === 'Spending Tracker' && <SpendIcon filled={true} />}
                    {/* <i className={`pt-[1px] ${getActivityIcon(label)}`} /> */}
                    <span className='font-medium'>{label}</span>
                </div>
                <div className='mt-1 text-zinc-700 dark:text-zinc-400'>{summary}</div>
            </div>
            <div className='flex items-center space-x-2 pt-4 text-sm transition duration-200 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 xl:pt-0'>
                <div>Learn more</div>
                <i className='fi fi-tr-arrow-right' />
            </div>
        </a>
    );
};

export default DropdownItem;
