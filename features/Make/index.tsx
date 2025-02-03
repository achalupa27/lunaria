import { useState } from 'react';
import { useMakeColumns } from '@/hooks/useMakeColumns';
import { formatCurrency } from '@/utils/helper';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import MakeForm from './components/make-form';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import SettingsForm from './components/settings-form';
import useFetchMakes from './hooks/use-fetch-makes';
import { useTable } from '@/hooks/use-table';

const Make = () => {
    const { data: makes } = useFetchMakes();
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [makeSettingsOpen, setMakeSettingsOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>();

    const { table } = useTable({ data: makes || [], columns: makeColumns });

    const handleViewMake = (row: any) => {
        setSelectedMake(row);
        setMakeFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(false);
        setMakeSettingsOpen(false);
    };

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200`}>
                    <span>Making - All Time</span>
                    <ChevronDown />
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant='secondary' className='rounded-lg' size='icon' onClick={() => setMakeSettingsOpen(true)}>
                        <Settings />
                    </Button>
                    <Button className='rounded-lg' onClick={handleFormOpen}>
                        + New Making
                    </Button>
                </div>
            </div>
            <div className='flex space-x-6 overflow-x-auto py-2'>
                <Card className='gold-gradient dark:bg-l-green'>
                    <span className='leading-none'>{'All Sources'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Software'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Trading'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Dividends'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
            </div>
            {/* <div>this year vs last year by month</div> */}
            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-2'>
                    <Table table={table} handleRowClick={handleViewMake} />
                </div>
            </div>
            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedMake} />}
            {makeSettingsOpen && <SettingsForm closeForm={handleFormClose} />}
        </Page>
    );
};

export default Make;
