import { useMemo } from 'react';

export const useSaveColumns = () => {
    return useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'type',
                header: 'Type',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: (props: any) => <span className={`${props.row.original.amount >= 0 ? 'text-l-blue' : 'text-l-red'}`}>${props.row.original.amount}</span>,
            },
            {
                accessorKey: 'account',
                header: 'Account',
            },
        ],
        []
    );
};
