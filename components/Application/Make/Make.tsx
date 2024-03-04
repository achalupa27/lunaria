import { useState } from 'react';
import MakeForm from './MakeForm';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { useMakeColumns } from '@/hooks/useMakeColumns';
import { initializeTable } from '@/utils/helper';
import Table from '@/components/UI/Table';

const Make = () => {
    const makes = useAppSelector(selectMaking);
    const makeColumns = useMakeColumns();
    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);

    const table = initializeTable(makes, makeColumns);

    const handleViewMake = () => {};

    const handleFormClose = () => {
        setNewMakeIsOpen(false);
    };

    return (
        <div className='h-screen w-screen gap-2 px-10 py-6'>
            <MakeForm isOpen={newMakeIsOpen} closeForm={handleFormClose} />
            {/* <SpendForm isOpen={newSpendIsOpen} closeForm={handleFormClose} spendToEdit={spend} /> */}

            <div className='flex justify-between'>
                <div className='text-[40px] font-medium text-l-green'>Making</div>
                <div className='flex flex-col items-center space-y-2 p-2'>
                    <button className='hover:bg-l-dark-green w-48 rounded-lg bg-l-green p-2 font-medium text-primary' onClick={() => setNewMakeIsOpen(true)}>
                        + New Making
                    </button>
                </div>
            </div>

            <Table table={table} handleRowClick={handleViewMake} />
        </div>
    );
};

export default Make;
