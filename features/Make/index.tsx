import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import { useMakeColumns } from '@/hooks/useMakeColumns';
import { initializeTable } from '@/utils/helper';
import MakeForm from './components/MakeForm';
import Table from '@/components/ui/Table';
import Page from '@/components/ui/Page';
import PageHeader from '@/components/ui/PageHeader';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from 'recharts';
import HeaderCard from '@/components/ui/Cards/HeaderCard';

const Make = () => {
    const makes = useAppSelector(selectMaking);
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
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
    };

    const [selectedNecessity, setSelectedNecessity] = useState<string>('All');

    const [savings, setSavings] = useState<number>(50);

    return (
        <Page>
            <PageHeader title={'Making'} titleStyle={'text-l-green'} buttonText={'+ New Making'} buttonStyle={'bg-l-green hover:bg-l-dark-green'} onClick={handleFormOpen} />
            <div className='my-2 flex space-x-6'>
                <HeaderCard title={'All Income'} value={savings} isSelected={selectedNecessity === 'All'} onClick={() => setSelectedNecessity('All')} color='green' />
            </div>

            <div className='flex flex-1 space-x-4 overflow-auto scrollbar-none'>
                <div className='flex h-full flex-col space-y-2'>
                    <div className='rounded-md border border-l-green'>
                        <div className='flex items-center justify-between rounded-md rounded-b-none bg-l-green'>
                            <div className='flex items-center space-x-2 rounded-md px-2 text-primary'>
                                <i className='fi fi-rr-coins' />
                                <span>Income Sources</span>
                            </div>
                            <div>
                                <button className='w-6 rounded-md bg-l-green px-1 text-primary hover:bg-l-dark-green'>+</button>
                            </div>
                        </div>
                        <div className='px-3 py-2'>
                            <div className='flex justify-between'>
                                <div>Software</div>
                                <div className='text-l-green'>$100</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Trading</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Dividends</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Social Media</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                        </div>
                    </div>

                    <Table table={table} tableColor='green' handleRowClick={handleViewMake} />
                </div>
                <div className='flex h-full w-full flex-col rounded-md border border-l-green'>
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
                </div>
            </div>
            <MakeForm isOpen={makeFormOpen} closeForm={handleFormClose} selectedMake={selectedMake} />
        </Page>
    );
};

export default Make;
