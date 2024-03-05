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
                accessorKey: 'type',
                header: 'Type',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: (props: any) => <span className={`${props.row.original.type === 'Deposit' ? 'text-l-blue' : 'text-l-red'}`}>${props.row.original.amount}</span>,
            },
            {
                accessorKey: 'account',
                header: 'Account',
            },
        ],
        []
    );
};
