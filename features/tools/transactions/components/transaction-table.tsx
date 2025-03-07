import { useTable } from '@/hooks/use-table';
import Table from '@/components/ui/table';
import { useMemo } from 'react';
import { formatCurrency } from '@/utils/helper';
import { format, parseISO } from 'date-fns';

type Props = {
    transactions: (Spend | Make | Save)[];
    onViewTransaction: (transaction: Spend | Make | Save) => void;
};

const TransactionTable = ({ transactions, onViewTransaction }: Props) => {
    const columns = useMemo(
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
                cell: (props: any) => {
                    const transaction = props.row.original;
                    if ('necessity' in transaction) return 'Purchase';
                    if ('source' in transaction) return 'Income';
                    if ('goal' in transaction) return 'Savings';
                    return 'Unknown';
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                cell: (props: any) => {
                    const transaction = props.row.original;
                    if ('item' in transaction) return transaction.item;
                    if ('source' in transaction) return transaction.source;
                    if ('goal' in transaction) return transaction.goal;
                    return '';
                },
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: (props: any) => {
                    const transaction = props.row.original;
                    const amount = 'cost' in transaction ? transaction.cost : 'amount' in transaction ? transaction.amount : 0;
                    return formatCurrency(amount);
                },
            },
            {
                accessorKey: 'category',
                header: 'Category',
                cell: (props: any) => props.row.original.category || '-',
            },
        ],
        []
    );

    const { table } = useTable({ data: transactions, columns });

    return <Table table={table} handleRowClick={onViewTransaction} />;
};

export default TransactionTable;
