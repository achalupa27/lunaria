import { useMemo } from 'react';

export const useMakeColumns = () => {
    return useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
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
