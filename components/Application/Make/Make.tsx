import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { useMakeColumns } from '@/hooks/useMakeColumns';
import { initializeTable } from '@/utils/helper';
import MakeForm from './MakeForm';
import Table from '@/components/UI/Table';
import Page from '@/components/UI/Page';
import PageHeader from '@/components/UI/PageHeader';

const Make = () => {
    const makes = useAppSelector(selectMaking);
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [makeToEdit, setMakeToEdit] = useState<Make | undefined>();

    const table = initializeTable(makes, makeColumns);

    const handleViewMake = (row: any) => {
        setMakeToEdit(row);
        setMakeFormOpen(true);
    };

    const handleFormOpen = () => {
        setMakeToEdit(undefined);
        setMakeFormOpen(true);
    };

    const handleFormClose = () => {
        setMakeFormOpen(false);
    };

    return (
        <Page>
            <PageHeader title={'Making'} titleStyle={'text-l-green'} buttonText={'+ New Making'} buttonStyle={'bg-l-green hover:bg-l-dark-green'} onClick={handleFormOpen} />
            <Table table={table} handleRowClick={handleViewMake} />

            <MakeForm isOpen={makeFormOpen} closeForm={handleFormClose} makeToEdit={makeToEdit} />
        </Page>
    );
};

export default Make;
