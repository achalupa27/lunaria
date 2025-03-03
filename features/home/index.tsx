'use client';

import { useState } from 'react';
import Card from '@/components/ui/card';
import Page from '@/components/ui/page';
import { ChevronDown } from 'lucide-react';
import { useReadMakes } from '../make/hooks/supabase/use-makes';
import { useReadSaves } from '../save/hooks/supabase/use-saves';
import { useReadSpends } from '../spend/hooks/supabase/use-spends';
import RecentTransactions from './components/recent-transactions';
import MakeForm from '../make/components/forms/make-form';
import SaveForm from '../save/components/forms/save-form';
import { formatCurrency } from '@/utils/helper';
import SpendForm from '../spend/components/forms/expense-form';
import { useReadAssets } from '../save/hooks/supabase/use-assets';
import { useReadDebtAccounts } from '../save/hooks/supabase/use-debt-accounts';
const Home = () => {
    const { data: makes } = useReadMakes();
    const { data: saves } = useReadSaves();
    const { data: spends } = useReadSpends();
    const { data: assets } = useReadAssets();
    const { data: debtAccounts } = useReadDebtAccounts();

    const [spendFormOpen, setSpendFormOpen] = useState(false);
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [saveFormOpen, setSaveFormOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(undefined);

    const handleViewTransaction = (transaction: Make | Save | Spend) => {
        setSelectedTransaction(transaction);
        if ('necessity' in transaction) {
            setSpendFormOpen(true);
        } else if ('source' in transaction) {
            setMakeFormOpen(true);
        } else {
            setSaveFormOpen(true);
        }
    };

    const handleFormClose = () => {
        setSelectedTransaction(undefined);
        setSpendFormOpen(false);
        setMakeFormOpen(false);
        setSaveFormOpen(false);
    };

    const totalIncome = makes?.reduce((acc, make) => acc + make.amount, 0) || 0;
    const totalSavings = saves?.reduce((acc, save) => acc + save.amount, 0) || 0;
    const totalSpending = spends?.reduce((acc, spend) => acc + spend.cost, 0) || 0;
    const totalAssets = assets?.reduce((acc, asset) => acc + asset.value, 0) || 0;
    const totalDebt = debtAccounts?.reduce((acc, debt) => acc + debt.current_balance, 0) || 0;
    const totalNetWorth = totalAssets + totalSavings - totalDebt;

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                    <span>Dashboard - All Time</span>
                    <ChevronDown />
                </div>
            </div>
            <div className='my-2 flex space-x-6'>
                <Card className='gold-gradient'>
                    <span className='leading-none'>{'Net Worth'}</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalNetWorth)}</span>
                    </div>
                </Card>
                <Card className=''>
                    <span className='leading-none'>{'Net Income'}</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalIncome)}</span>
                    </div>
                </Card>
                <Card className=''>
                    <span className='leading-none'>{'Net Savings'}</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalSavings)}</span>
                    </div>
                </Card>
                <Card className=''>
                    <span className='leading-none'>{'Net Spending'}</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalSpending)}</span>
                    </div>
                </Card>
            </div>

            <div className='grid grid-cols-3 gap-4 flex-1 min-h-0'>
                <div className='grid gap-4'>
                    <RecentTransactions makes={makes || []} saves={saves || []} spends={spends || []} onViewTransaction={handleViewTransaction} />
                </div>
            </div>

            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedTransaction} />}
            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedTransaction} />}
            {saveFormOpen && <SaveForm closeForm={handleFormClose} selectedSave={selectedTransaction} />}
        </Page>
    );
};

export default Home;
