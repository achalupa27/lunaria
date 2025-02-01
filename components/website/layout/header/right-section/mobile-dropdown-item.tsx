'use client';

import { Button } from '@/components/ui/button';
// import { getActivityIcon } from '@/utils/icons';

type Props = {
    label: string;
    summary: string;
};

const MobileDropdownItem = ({ label, summary }: Props) => {
    return (
        <a href={`/${label.toLocaleLowerCase()}`} className='group/item flex h-full w-full flex-col justify-between rounded bg-zinc-200 px-3 py-2 transition duration-200 hover:cursor-pointer hover:bg-zinc-300'>
            <div>
                <div className='flex items-center space-x-2 pb-[1px]'>
                    {/* <i className={`pt-[1px] ${getActivityIcon(label)}`} /> */}
                    <span className='font-medium'>{label}</span>
                </div>
                <div className='mt-1 text-zinc-700'>{summary}</div>
            </div>
        </a>
    );
};

export default MobileDropdownItem;
