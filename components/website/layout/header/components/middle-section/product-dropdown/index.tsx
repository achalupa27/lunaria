'use client';

import DropdownItem from './dropdown-item';
import { products } from '../../../config';
import { Separator } from '@/components/ui/separator';
import { Fragment } from 'react';

type Props = {
    category: string;
};

const ProductDropdown = ({ category }: Props) => {
    const items = products[category];

    return (
        <>
            <div className='invisible absolute bottom-0 h-3 w-full translate-y-full group-hover:visible'></div>
            <div className='invisible fixed left-1/2 z-40 mt-2 w-max -translate-x-1/2 translate-y-[-10px] transform rounded-xl opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                <div className='z-50 flex h-fit flex-col items-center gap-3 rounded-xl border border-orange-100 bg-zinc-50 p-3 shadow-lg dark:border-zinc-700 dark:bg-zinc-950 xl:h-44 xl:flex-row'>
                    {items.map((item, index) => (
                        <Fragment key={index}>
                            <DropdownItem item={item} />
                            {index < items.length - 1 && (
                                <>
                                    <Separator className='hidden xl:block' orientation='vertical' />
                                    <Separator className='xl:hidden' orientation='horizontal' />
                                </>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductDropdown;
