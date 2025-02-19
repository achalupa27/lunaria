'use client';

import Logo from '@/components/icons/logo';
import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';

type Props = {
    item: any;
};

const DropdownItem = ({ item }: Props) => {
    return (
        <a href={`${item.pageLink}`} className='group/item flex h-full w-96 flex-col justify-between rounded-xl bg-zinc-50 px-3 py-2 transition duration-200 hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 xl:w-56 2xl:w-64'>
            <div>
                <div className='flex items-center space-x-2 pb-[1px]'>
                    {item.label === 'Dashboard' && <Logo filled={true} />}
                    {item.label === 'Income Tracker' && <MakeIcon filled={true} />}
                    {item.label === 'Savings Tracker' && <SaveIcon filled={true} />}
                    {item.label === 'Spending Tracker' && <SpendIcon filled={true} />}
                    <span className='font-medium'>{item.label}</span>
                </div>
                <div className='mt-1 text-zinc-700 dark:text-zinc-400'>{item.summary}</div>
            </div>
            <div className='flex items-center space-x-2 pt-4 text-sm transition duration-200 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 xl:pt-0'>
                <div>Learn more</div>
            </div>
        </a>
    );
};

export default DropdownItem;
