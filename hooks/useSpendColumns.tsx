import NeedPill from '@/components/UI/Pills/NeedPill';
import WantPill from '@/components/UI/Pills/WantPill';
import WastePill from '@/components/UI/Pills/WastePill';
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
                accessorKey: 'item',
                header: 'Item',
                cell: (props: any) => (
                    <div className='flex items-center justify-center'>
                        {props.row.original.necessity === 'Need' && <NeedPill text={props.row.original.item} />}
                        {props.row.original.necessity === 'Want' && <WantPill text={props.row.original.item} />}
                        {props.row.original.necessity === 'Waste' && <WastePill text={props.row.original.item} />}
                    </div>
                ),
            },
            {
                accessorKey: 'cost',
                header: 'Cost',
                cell: (props: any) => <span className='text-l-yellow'>${props.row.original.cost}</span>,
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
        ],
        []
    );
};
