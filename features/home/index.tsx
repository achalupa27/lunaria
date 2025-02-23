import { useState } from 'react';
import Card from '@/components/ui/card';
import Page from '@/components/ui/page';
import { ChevronDown } from 'lucide-react';
import useFetchMakes from '../make/hooks/use-fetch-makes';
import useFetchSaves from '../save/hooks/use-fetch-saves';
import useFetchSpends from '../spend/hooks/transaction/use-fetch-spends';
import RecentTransactions from './components/recent-transactions';
import SpendForm from '../spend/components/forms/spend-form';
import MakeForm from '../make/components/make-form';
import SaveForm from '../save/components/forms/save-form';

const Home = () => {
    const { data: spends } = useFetchSpends();
    const { data: makes } = useFetchMakes();
    const { data: saves } = useFetchSaves();

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

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                    <span>Dashboard - All Time</span>
                    <ChevronDown />
                </div>
            </div>
            <div className='my-2 flex space-x-6'>
                <Card className=''>
                    <span className='leading-none'>{'Net Income'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'30'}</span>
                    </div>
                </Card>
                <Card className=''>
                    <span className='leading-none'>{'Net Savings'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'-12331'}</span>
                    </div>
                </Card>
                <Card className=''>
                    <span className='leading-none'>{'Net Spending'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'30'}</span>
                    </div>
                </Card>
            </div>

            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-4'>
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
