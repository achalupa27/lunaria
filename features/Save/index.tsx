import { useState } from 'react';
import { useSaveColumns } from '@/hooks/useSaveColumns';
import { formatCurrency, initializeTable } from '@/utils/helper';
import SaveForm from './components/save-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import useFetchSaves from './hooks/use-fetch-saves';

const Save = () => {
    const { data: saves } = useFetchSaves();
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
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200`}>
                    <span>Saving - All Time</span>
                    <ChevronDown />
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant='secondary' className='rounded-lg' size='icon' onClick={handleFormOpen}>
                        <Settings />
                    </Button>
                    <Button className='rounded-lg' onClick={handleFormOpen}>
                        + New Saving
                    </Button>
                </div>
            </div>

            <div className='my-2 flex space-x-6'>
                <Card className='gold-gradient dark:bg-l-green'>
                    <span className='leading-none'>{'Net Savings'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(savings)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Savings Accounts'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(cash)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Debt Accounts'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(debt)}</span>
                    </div>
                </Card>
            </div>

            <div>Interest rate on debt</div>

            <div className='flex flex-1 space-x-4 overflow-auto scrollbar-none'>
                <div className='flex h-full flex-col space-y-4 p-1'>
                    <div className='rounded-lg border border-orange-100 shadow'>
                        <div className='gold-gradient flex h-[30px] items-center justify-between rounded-lg rounded-b-none px-2'>Savings Accounts</div>
                        <div className='px-3 py-2'>
                            <div className='flex justify-between'>
                                <div>Cash</div>
                                <div className='text-green-600'>{formatCurrency(150)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>TFSA</div>
                                <div className='text-green-600'>{formatCurrency(0)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Chequing</div>
                                <div className='text-green-600'>{formatCurrency(50)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Investment</div>
                                <div className='text-green-600'>{formatCurrency(25)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>RRSP</div>
                                <div className='text-green-600'>{formatCurrency(100)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Emergency</div>
                                <div className='text-green-600'>{formatCurrency(0)}</div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-xl border border-orange-100'>
                        <div className='gold-gradient flex h-[30px] items-center justify-between rounded-lg rounded-b-none'>
                            <div className='flex items-center space-x-2 rounded-lg px-2 text-primary'>Debt Accounts</div>
                        </div>
                        <div className='px-3 py-2'>
                            <div className='flex justify-between'>
                                <div>NSLSC</div>
                                <div className='text-red-600'>{formatCurrency(-12000)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>CRA</div>
                                <div className='text-red-600'>{formatCurrency(-1000)}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Seb</div>
                                <div className='text-red-600'>{formatCurrency(-901)}</div>
                            </div>
                        </div>
                    </div>
                    <Table table={table} handleRowClick={handleViewSave} />
                </div>
                {/* <div className='flex h-full w-full flex-col rounded-md border border-l-blue'>
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
                </div> */}
            </div>
            {saveFormOpen && <SaveForm closeForm={handleFormClose} selectedSave={selectedSave} />}
        </Page>
    );
};

export default Save;
