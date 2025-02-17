import BluePill from '@/components/ui/pills/blue-pill';
import RedPill from '@/components/ui/pills/red-pill';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

export const useSaveColumns = () => {
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
                accessorKey: 'account',
                header: 'Account',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: (props: any) => (
                    <div className='flex items-center justify-center'>
                        {props.row.original.type === 'Deposit' && <BluePill text={`+$${props.row.original.amount}`} />}
                        {props.row.original.type === 'Withdrawal' && <RedPill text={`-$${props.row.original.amount}`} />}
                    </div>
                ),
            },
        ],
        []
    );
};
