import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSaving } from '@/redux/slices/saveSlice';
import { useSaveColumns } from '@/hooks/useSaveColumns';
import { initializeTable } from '@/utils/helper';
import SaveForm from './components/save-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import PageHeader from '@/components/ui/page-header';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from 'recharts';
import HeaderCard from '@/components/ui/buttons/header-card';

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

    const [selectedNecessity, setSelectedNecessity] = useState<string>('All');

    const [cash, setCash] = useState<number>(1670);
    const [debt, setDebt] = useState<number>(13901);
    const [savings, setSavings] = useState<number>(cash - debt);

    return (
        <Page>
            <PageHeader title={'Saving'} titleStyle={'text-l-blue'} buttonText={'+ New Saving'} buttonStyle={'bg-l-blue hover:bg-l-dark-blue'} onClick={handleFormOpen} />

            <div className='my-2 flex space-x-6'>
                <HeaderCard title={'Savings'} value={savings} isSelected={true} color='blue' />
                <HeaderCard title={'Cash'} value={cash} isSelected={true} color='green' />
                <HeaderCard title={'Debt'} value={debt} isSelected={true} color='red' />
            </div>

            <div>Interest rate on debt</div>

            <div className='flex flex-1 space-x-4 overflow-auto scrollbar-none'>
                <div className='flex h-full flex-col space-y-4'>
                    <div className='rounded-md border border-l-green'>
                        <div className='flex justify-between rounded-md rounded-b-none bg-l-green'>
                            <div className='flex items-center space-x-2 rounded-md px-2 text-primary'>
                                <i className='fi fi-sr-piggy-bank' />
                                <span>Savings Accounts</span>
                            </div>
                            <div>
                                <button className='w-6 rounded-md bg-l-green text-primary hover:bg-l-dark-green'>+</button>
                            </div>
                        </div>
                        <div className='px-3 py-2'>
                            <div className='flex justify-between'>
                                <div>Cash</div>
                                <div className='text-l-green'>$150</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>TFSA</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Chequing</div>
                                <div className='text-l-green'>$50</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Investment</div>
                                <div className='text-l-green'>$50</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>RRSP</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Emergency</div>
                                <div className='text-l-green'>$0</div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md border border-l-red'>
                        <div className='flex items-center justify-between rounded-md rounded-b-none bg-l-red'>
                            <div className='flex items-center space-x-2 rounded-md px-2 text-primary'>
                                <i className='fi fi-rr-debt' />
                                <span>Debt Accounts</span>
                            </div>
                            <div>
                                <button className='w-6 rounded-md bg-l-red text-primary hover:bg-l-dark-red'>+</button>
                            </div>
                        </div>
                        <div className='px-3 py-2'>
                            <div className='flex justify-between'>
                                <div>NSLSC</div>
                                <div className='text-l-red'>-$12,000</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>CRA</div>
                                <div className='text-l-red'>-$1,000.00</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Seb</div>
                                <div className='text-l-red'>-$901.00</div>
                            </div>
                        </div>
                    </div>
                    <Table table={table} tableColor='blue' handleRowClick={handleViewSave} />
                </div>
                <div className='flex h-full w-full flex-col rounded-md border border-l-blue'>
                    <div className='flex justify-between rounded-md rounded-b-none bg-l-blue px-2 py-1 text-primary'>
                        <select name='choice' className='bg-transparent'>
                            <option value='first' selected>
                                Savings Accounts
                            </option>
                            <option value='second'>Weekly Saving</option>
                            <option value='third'>Monthly Saving</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <ResponsiveContainer>
                            <LineChart data={saves}>
                                <XAxis tick={{ fill: 'white' }} dataKey='date' tickLine={false} stroke={'#93c5fd'} />
                                <YAxis width={30} tick={{ fill: 'white' }} tickLine={false} stroke={'#93c5fd'} />
                                <Line type='monotone' dataKey='spent' dot={false} stroke={'#93c5fd'} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <SaveForm isOpen={saveFormOpen} closeForm={handleFormClose} selectedSave={selectedSave} />
        </Page>
    );
};

export default Save;
