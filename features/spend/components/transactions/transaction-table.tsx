import { useTable } from '@/hooks/use-table';
import Table from '@/components/ui/table';
import { useSpendColumns } from '../../hooks/use-spend-columns';

type Props = {
    spends: Spend[];
    onViewSpend: (spend: Spend) => void;
};

const TransactionTable = ({ spends, onViewSpend }: Props) => {
    const { table } = useTable({ data: spends, columns: useSpendColumns() });

    return <Table table={table} handleRowClick={onViewSpend} />;
};

export default TransactionTable;
