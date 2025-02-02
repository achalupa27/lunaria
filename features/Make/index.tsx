import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { useMakeColumns } from '@/hooks/useMakeColumns';
import { formatCurrency, initializeTable } from '@/utils/helper';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from 'recharts';
import HeaderCard from '@/components/ui/header-card';
import MakeForm from './components/make-form';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import MakeSettings from './components/make-settings';

const Make = () => {
    const makes = useAppSelector(selectMaking);
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [makeSettingsOpen, setMakeSettingsOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>();

    const table = initializeTable(makes, makeColumns);

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
                {/* <div className='flex h-full w-full flex-col rounded-md border border-l-green'>
                    <div className='flex justify-between rounded-md rounded-b-none bg-l-green px-2 py-1 text-primary'>
                        <select name='choice' className='bg-transparent'>
                            <option value='first' selected>
                                Daily Making
                            </option>
                            <option value='second'>Weekly Making</option>
                            <option value='third'>Monthly Making</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <ResponsiveContainer>
                            <LineChart data={makes}>
                                <XAxis tick={{ fill: 'white' }} dataKey='date' tickLine={false} stroke={'#99f5d1'} />
                                <YAxis width={30} tick={{ fill: 'white' }} tickLine={false} stroke={'#99f5d1'} />
                                <Line type='monotone' dataKey='spent' dot={false} stroke={'#99f5d1'} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div> */}
            </div>
            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedMake} />}
            {makeSettingsOpen && <MakeSettings closeForm={handleFormClose} selectedMake={selectedMake} />}
        </Page>
    );
};

export default Make;
