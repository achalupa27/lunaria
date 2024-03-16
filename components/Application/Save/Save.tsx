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
    const [selectedSave, setSelectedSave] = useState<Save | undefined>();

    const table = initializeTable(saves, saveColumns);

    const handleViewSave = (row: any) => {
        setSelectedSave(row);
        setSaveFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedSave(undefined);
        setSaveFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedSave(undefined);
        setSaveFormOpen(false);
    };

    return (
        <Page>
            <PageHeader title={'Saving'} titleStyle={'text-l-blue'} buttonText={'+ New Saving'} buttonStyle={'bg-l-blue hover:bg-l-dark-blue'} onClick={handleFormOpen} />
            <Table table={table} handleRowClick={handleViewSave} />

            <SaveForm isOpen={saveFormOpen} closeForm={handleFormClose} selectedSave={selectedSave} />
        </Page>
    );
};

export default Save;
