import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';
import { useSpendColumns } from '@/hooks/useSpendColumns';
import { initializeTable } from '@/utils/helper';
import SpendForm from './SpendForm';
import Table from '@/components/UI/Table';
import Page from '@/components/UI/Page';
import PageHeader from '@/components/UI/PageHeader';

const Spend = () => {
    const spends = useAppSelector(selectSpending);
    const spendColumns = useSpendColumns();
    const [spendFormOpen, setSpendFormOpen] = useState(false);
    const [spendToEdit, setSpendToEdit] = useState<Spend | undefined>();

    const table = initializeTable(spends, spendColumns);

    const handleViewSpend = (row: any) => {
        setSpendToEdit(row);
        setSpendFormOpen(true);
    };

    const handleFormOpen = () => {
        setSpendToEdit(undefined);
        setSpendFormOpen(true);
    };

    const handleFormClose = () => {
        setSpendFormOpen(false);
    };

    return (
        <Page>
            <PageHeader title={'Spending'} titleStyle={'text-l-yellow'} buttonText={'+ New Spending'} buttonStyle={'bg-l-yellow hover:bg-l-dark-yellow'} onClick={handleFormOpen} />
            <Table table={table} handleRowClick={handleViewSpend} />

            <SpendForm isOpen={spendFormOpen} closeForm={handleFormClose} spendToEdit={spendToEdit} />
        </Page>
    );
};

export default Spend;
