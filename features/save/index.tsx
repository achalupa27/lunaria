import { useEffect, useState } from 'react';
import { useSaveColumns } from '@/hooks/use-save-columns';
import { formatCurrency } from '@/utils/helper';
import SaveForm from './components/save-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import useFetchSaves from './hooks/use-fetch-saves';
import { useTable } from '@/hooks/use-table';
import SettingsForm from './components/settings-form';
import useFetchSavingsAccounts from './hooks/use-fetch-savings-accounts';
import useFetchDebtAccounts from './hooks/use-fetch-debt-accounts';

const Save = () => {
    const { data: saves } = useFetchSaves();
    const { data: savingsAccounts } = useFetchSavingsAccounts();
    const { data: debtAccounts } = useFetchDebtAccounts();

    const [totalSavings, setTotalSavings] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);

    useEffect(() => {
        if (savingsAccounts) {
            setTotalSavings(savingsAccounts.reduce((acc, account) => acc + account.balance, 0));
        }
        if (debtAccounts) {
            setTotalDebt(debtAccounts.reduce((acc, account) => acc + account.balance, 0));
        }
    }, [savingsAccounts, debtAccounts]);

    const saveColumns = useSaveColumns();
    const [saveFormOpen, setSaveFormOpen] = useState(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState(false);
    const [selectedSave, setSelectedSave] = useState<Save | undefined>();

    const { table } = useTable({ data: saves || [], columns: saveColumns });

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
        setSettingsFormOpen(false);
    };

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200`}>
                    <span>Saving - All Time</span>
                    <ChevronDown />
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant='secondary' className='rounded-lg' size='icon' onClick={() => setSettingsFormOpen(true)}>
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
                        <span className='text-3xl font-semibold'>{formatCurrency(totalSavings - totalDebt)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Savings Accounts'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalSavings)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Debt Accounts'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalDebt)}</span>
                    </div>
                </Card>
            </div>

            <div>Interest rate on debt</div>

            <div className='flex flex-1 space-x-4 overflow-auto scrollbar-none'>
                <div className='flex h-full flex-col space-y-4 p-1'>
                    <div className='rounded-lg border border-orange-100 shadow'>
                        <div className='gold-gradient flex h-[30px] items-center justify-between rounded-lg rounded-b-none px-2'>Savings Accounts</div>
                        <div className='px-3 py-2'>
                            {savingsAccounts?.length === 0 ? (
                                <div className='flex flex-col items-center justify-center text-center text-gray-500'>
                                    <div>No savings accounts created.</div>
                                    <div>Click</div>
                                    <Button variant='secondary' className='rounded-lg' size='icon' disabled>
                                        <Settings />
                                    </Button>
                                    <div>in the top right to create one.</div>
                                </div>
                            ) : (
                                savingsAccounts?.map((account) => (
                                    <div key={account.id} className='flex justify-between'>
                                        <div>{account.name}</div>
                                        <div className='text-green-600'>{formatCurrency(account.balance)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='rounded-xl border border-orange-100'>
                        <div className='gold-gradient flex h-[30px] items-center justify-between rounded-lg rounded-b-none'>
                            <div className='flex items-center space-x-2 rounded-lg px-2 text-primary'>Debt Accounts</div>
                        </div>
                        <div className='px-3 py-2'>
                            {debtAccounts?.length === 0 ? (
                                <div className='flex flex-col items-center justify-center text-center text-gray-500'>
                                    <div>No debt accounts created.</div>
                                    <div>Click</div>
                                    <Button variant='secondary' className='rounded-lg' size='icon' disabled>
                                        <Settings />
                                    </Button>
                                    <div>in the top right to create one.</div>
                                </div>
                            ) : (
                                debtAccounts?.map((account) => (
                                    <div key={account.id} className='flex justify-between'>
                                        <div>{account.name}</div>
                                        <div className='text-red-600'>{formatCurrency(account.balance)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <Table table={table} handleRowClick={handleViewSave} />
                </div>
            </div>
            {saveFormOpen && <SaveForm closeForm={handleFormClose} selectedSave={selectedSave} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} />}
        </Page>
    );
};

export default Save;
