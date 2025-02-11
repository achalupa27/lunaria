import GreenPill from '@/components/ui/pills/green-pill';
import RedPill from '@/components/ui/pills/red-pill';
import YellowPill from '@/components/ui/pills/yellow-pill';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

export const useSpendColumns = () => {
    return useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
                cell: (props: any) => {
                    const parsedDate = props.row.original.date ? parseISO(props.row.original.date) : null;
                    const formattedDate = parsedDate ? format(parsedDate, "eee d MMM ''yy") : '';
                    return formattedDate;
                },
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'item',
                header: 'Item',
                cell: (props: any) => (
                    <div className='flex items-center justify-center'>
                        {props.row.original.necessity === 'Need' && <span className='text-green-600 dark:text-l-green'>{props.row.original.item}</span>}
                        {props.row.original.necessity === 'Want' && <span className='text-yellow-500 dark:text-l-yellow'>{props.row.original.item}</span>}
                        {props.row.original.necessity === 'Waste' && <span className='text-red-500 dark:text-red-300'>{props.row.original.item}</span>}
                    </div>
                ),
            },
            {
                accessorKey: 'cost',
                header: 'Cost',
                cell: (props: any) => {
                    let cost = props.row.original.cost;
                    if (props.row.original.currency === 'MXN') cost /= 11.35;
                    return (
                        <div className='flex items-center justify-center'>
                            <YellowPill text={`$${cost.toFixed(2)}`} />
                        </div>
                    );
                },
            },
        ],
        []
    );
};
