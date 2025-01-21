'use client';

// import { getActivityIcon } from '@/utils/icons';

type Props = {
    label: string;
    summary: string;
};

const DropdownItem = ({ label, summary }: Props) => {
    return (
        <a href={`/${label.toLocaleLowerCase()}`} className='group/item flex h-full w-96 flex-col justify-between rounded bg-stone-50 px-3 py-2 transition duration-200 hover:cursor-pointer hover:bg-stone-200 dark:bg-stone-950 dark:hover:bg-stone-700 xl:w-56 2xl:w-64'>
            <div>
                <div className='flex items-center space-x-2 pb-[1px]'>
                    {/* <i className={`pt-[1px] ${getActivityIcon(label)}`} /> */}
                    <span className='font-medium'>{label}</span>
                </div>
                <div className='mt-1 text-stone-700 dark:text-stone-400'>{summary}</div>
            </div>
            <div className='flex items-center space-x-2 pt-4 text-sm transition duration-200 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 xl:pt-0'>
                <div>Learn more</div>
                <i className='fi fi-tr-arrow-right' />
            </div>
        </a>
    );
};

export default DropdownItem;
