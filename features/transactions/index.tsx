import { useState, useEffect } from 'react';
import Page from '@/components/ui/page';
import useFetchSpends from '../spend/hooks/transaction/use-fetch-spends';
import TransactionTable from './components/transaction-table';
import SpendForm from '../spend/components/forms/spend-form';
import useFetchMakes from '../make/hooks/use-fetch-makes';
import useFetchSaves from '../save/hooks/transactions/use-fetch-saves';
import TransactionFilters from './components/transaction-filters';
import { useAppDispatch } from '@/redux/hooks';
import { setTab } from '@/redux/slices/tab-slice';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import PeriodSelector, { Period } from '../shared/components/period-selector';
import { exportToCSV } from '@/utils/export';

type TransactionType = 'spends' | 'makes' | 'saves';

const Transactions = () => {
    const { data: spends } = useFetchSpends();
    const { data: makes } = useFetchMakes();
    const { data: saves } = useFetchSaves();
    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
    const [selectedSpend, setSelectedSpend] = useState<Spend | undefined>();
    const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>(['spends', 'makes', 'saves']);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('All Time');

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const fromTab = searchParams.get('from');

    // Add this effect to clear URL when accessing from sidebar
    useEffect(() => {
        // If there's no fromTab parameter, we're coming from the sidebar
        // If there is a fromTab parameter but we clicked the sidebar, we should clear it
        if (!fromTab || document.referrer === '') {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    // Filter transactions based on selected types and period
    const filteredTransactions = [...(selectedTypes.includes('spends') ? spends || [] : []), ...(selectedTypes.includes('makes') ? makes || [] : []), ...(selectedTypes.includes('saves') ? saves || [] : [])]
        .filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            const now = new Date();

            switch (selectedPeriod) {
                case 'This Month': {
                    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    return transactionDate >= firstDay && transactionDate <= lastDay;
                }
                case 'Last Month': {
                    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
                    return transactionDate >= firstDay && transactionDate <= lastDay;
                }
                case 'This Year': {
                    const firstDay = new Date(now.getFullYear(), 0, 1);
                    const lastDay = new Date(now.getFullYear(), 11, 31);
                    return transactionDate >= firstDay && transactionDate <= lastDay;
                }
                case 'Last Year': {
                    const firstDay = new Date(now.getFullYear() - 1, 0, 1);
                    const lastDay = new Date(now.getFullYear() - 1, 11, 31);
                    return transactionDate >= firstDay && transactionDate <= lastDay;
                }
                case 'All Time':
                default:
                    return true;
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleViewTransaction = (transaction: Spend | Make | Save) => {
        // Determine the type of transaction and open appropriate form
        if ('necessity' in transaction) {
            setSelectedSpend(transaction);
            setSpendFormOpen(true);
        }
        // Add handlers for Make and Save when those forms are ready
    };

    const handleFormClose = () => {
        setSelectedSpend(undefined);
        setSpendFormOpen(false);
    };

    const handleToggleType = (type: TransactionType) => {
        setSelectedTypes((prev) => {
            // Don't allow deselecting the last filter
            if (prev.length === 1 && prev.includes(type)) return prev;

            return prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
        });
    };

    const handleBack = () => {
        if (fromTab) {
            dispatch(setTab(fromTab));
            // Clear the URL parameter when navigating back
            window.history.replaceState({}, '', window.location.pathname);
        }
    };

    const handleExport = () => {
        const filename = `transactions_${selectedPeriod.toLowerCase().replace(' ', '_')}`;
        exportToCSV(filteredTransactions, filename);
    };

    return (
        <Page>
            <div className='flex justify-between mb-6'>
                <div className='flex items-center space-x-4'>
                    {fromTab && window.history.length > 1 && (
                        <Button variant='ghost' className='flex items-center space-x-2' onClick={handleBack}>
                            <ArrowLeft className='h-4 w-4' />
                            <span>Back to {fromTab}</span>
                        </Button>
                    )}
                    <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} label='Transactions' />
                </div>
                <Button variant='outline' className='flex items-center space-x-2' onClick={handleExport}>
                    <Download className='h-4 w-4' />
                    <span>Export CSV</span>
                </Button>
            </div>

            <TransactionFilters selectedTypes={selectedTypes} onToggleType={handleToggleType} />

            <div className='flex-1 overflow-auto'>
                <TransactionTable transactions={filteredTransactions} onViewTransaction={handleViewTransaction} />
            </div>

            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
        </Page>
    );
};

export default Transactions;
