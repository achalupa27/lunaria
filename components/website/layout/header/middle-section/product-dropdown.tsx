'use client';

import DropdownItem from './dropdown-item';
import { products } from '../data';
import { Separator } from '@/components/ui/separator';
import { Fragment } from 'react';

type Props = {
    category: string;
};

const ProductDropdown = ({ category }: Props) => {
    const items = products[category];

    if (!items) return null;

    return (
        <div className='z-50 flex h-fit flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow dark:border-zinc-700 dark:bg-zinc-950 xl:h-44 xl:flex-row'>
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
    );
};

export default ProductDropdown;
