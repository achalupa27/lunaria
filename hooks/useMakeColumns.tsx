import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

export const useMakeColumns = () => {
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
                accessorKey: 'source',
                header: 'Source',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: (props: any) => <span className='text-l-green'>${props.row.original.amount}</span>,
            },
        ],
        []
    );
};
