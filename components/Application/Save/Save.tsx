import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSaving } from '@/redux/slices/saveSlice';
import { useSaveColumns } from '@/hooks/useSaveColumns';
import { initializeTable } from '@/utils/helper';
import SaveForm from './SaveForm';
import Table from '@/components/UI/Table';
import Page from '@/components/UI/Page';
import PageHeader from '@/components/UI/PageHeader';

const Save = () => {
    const saves = useAppSelector(selectSaving);
    const saveColumns = useSaveColumns();
    const [saveFormOpen, setSaveFormOpen] = useState(false);
    const [saveToEdit, setSaveToEdit] = useState<Save | undefined>();

    const table = initializeTable(saves, saveColumns);

    const handleViewSave = (row: any) => {
        setSaveToEdit(row);
        setSaveFormOpen(true);
    };

    const handleFormOpen = () => {
        setSaveToEdit(undefined);
        setSaveFormOpen(true);
    };

    const handleFormClose = () => {
        setSaveFormOpen(false);
    };

    return (
        <Page>
            <PageHeader title={'Saving'} titleStyle={'text-l-blue'} buttonText={'+ New Saving'} buttonStyle={'bg-l-blue hover:bg-l-dark-blue'} onClick={handleFormOpen} />
            <Table table={table} handleRowClick={handleViewSave} />

            <SaveForm isOpen={saveFormOpen} closeForm={handleFormClose} saveToEdit={saveToEdit} />
        </Page>
    );
};

export default Save;
