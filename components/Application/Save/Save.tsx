import { useState } from 'react';
import SaveForm from './SaveForm';
import { useAppSelector } from '@/redux/hooks';
import { selectSaving } from '@/redux/slices/saveSlice';
import { useSaveColumns } from '@/hooks/useSaveColumns';
import { initializeTable } from '@/utils/helper';
import Table from '@/components/UI/Table';

const Save = () => {
    const saves = useAppSelector(selectSaving);
    const saveColumns = useSaveColumns();
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    const table = initializeTable(saves, saveColumns);

    const handleViewSave = () => {};

    const handleFormClose = () => {
        setNewSaveIsOpen(false);
    };

    return (
        <div className='h-screen w-screen gap-2 px-10 py-6'>
            <SaveForm isOpen={newSaveIsOpen} closeForm={handleFormClose} />

            {/* <SpendForm isOpen={newSpendIsOpen} closeForm={handleFormClose} spendToEdit={spend} /> */}

            <div className='flex justify-between'>
                <div className='text-[40px] font-medium text-l-blue'>Saving</div>
                <div className='flex flex-col items-center space-y-2 p-2'>
                    <button className='hover:bg-l-dark-green w-48 rounded-lg bg-l-blue p-2 font-medium text-primary' onClick={() => setNewSaveIsOpen(true)}>
                        + New Saving
                    </button>
                </div>
            </div>

            <Table table={table} handleRowClick={handleViewSave} />
        </div>
    );
};

export default Save;
