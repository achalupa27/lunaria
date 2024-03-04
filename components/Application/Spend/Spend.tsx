import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';
import { useSpendColumns } from '@/hooks/useSpendColumns';
import { initializeTable } from '@/utils/helper';
import Table from '@/components/UI/Table';
import SpendForm from './SpendForm';

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
        <div className='h-screen w-screen gap-2 px-10 py-6'>
            <SpendForm isOpen={spendFormOpen} closeForm={handleFormClose} spendToEdit={spendToEdit} />

            <div className='flex justify-between'>
                <div className='text-[40px] font-medium text-l-yellow'>Spending</div>
                <div className='flex flex-col items-center space-y-2 p-2'>
                    <button className='w-48 rounded-lg bg-l-yellow p-2 font-medium text-primary hover:bg-l-dark-yellow' onClick={handleFormOpen}>
                        + New Spending
                    </button>
                </div>
            </div>

            <Table table={table} handleRowClick={handleViewSpend} />
        </div>
    );
};

export default Spend;
