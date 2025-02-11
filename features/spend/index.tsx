import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helper';
import SpendForm from './components/spend-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import { spendingCategories } from '@/constants';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import BudgetForm from './components/budget-form';
import SettingsForm from './components/settings-form';
import useFetchSpends from './hooks/use-fetch-spends';
import { useSpendColumns } from './hooks/use-spend-columns';
import { useTable } from '@/hooks/use-table';
import { useSubscription } from '@/hooks/use-subscription';
import ProtectedFeature from '@/components/feature';

const Spend = () => {
    const { data: spends } = useFetchSpends();

    const spendColumns = useSpendColumns();
    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
    const [budgetFormOpen, setBudgetFormOpen] = useState<boolean>(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState<boolean>(false);
    const [selectedSpend, setSelectedSpend] = useState<Spend | undefined>();

    const [totalNeedSpent, setTotalNeedSpent] = useState<number>(0);
    const [totalWantSpent, setTotalWantSpent] = useState<number>(0);
    const [totalWasteSpent, setTotalWasteSpent] = useState<number>(0);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    const [selectedNecessity, setSelectedNecessity] = useState<string>('All');

    const { table } = useTable({ data: spends || [], columns: spendColumns });

    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    useEffect(() => {
        if (spends && spends?.length > 0) {
            const necessityTotals = spends?.reduce(
                (acc, spend) => {
                    switch (spend.necessity) {
                        case 'Need':
                            acc.totalNeedSpent += spend.cost;
                            break;
                        case 'Want':
                            acc.totalWantSpent += spend.cost;
                            break;
                        case 'Waste':
                            acc.totalWasteSpent += spend.cost;
                            break;
                        default:
                            break;
                    }

                    acc.totalSpent += spend.cost;

                    return acc;
                },
                {
                    totalNeedSpent: 0,
                    totalWantSpent: 0,
                    totalWasteSpent: 0,
                    totalSpent: 0,
                }
            );

            // Set the state variables for each total
            setTotalNeedSpent(Number(necessityTotals.totalNeedSpent.toFixed(2)));
            setTotalWantSpent(Number(necessityTotals.totalWantSpent.toFixed(2)));
            setTotalWasteSpent(Number(necessityTotals.totalWasteSpent.toFixed(2)));
            setTotalSpent(Number(necessityTotals.totalSpent.toFixed(2)));
        }
    }, [spends]);

    const handleViewSpend = (row: any) => {
        setSelectedSpend(row);
        setSpendFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedSpend(undefined);
        setSpendFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedSpend(undefined);
        setSpendFormOpen(false);
        setBudgetFormOpen(false);
        setSettingsFormOpen(false);
    };

    const handleAnalysis = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/openai/analyze-spending', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spends,
                }),
            });

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const { subscription, loading: subscriptionLoading } = useSubscription();

    if (subscriptionLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Page>
            <div className='flex justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200`}>
                    <span>Spending - All Time</span>
                    <ChevronDown />
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant='secondary' className='rounded-lg' size='icon' onClick={() => setSettingsFormOpen(true)}>
                        <Settings />
                    </Button>
                    <ProtectedFeature requiredRole='premium' userRole={subscription?.role}>
                        <Button variant='secondary' className='rounded-lg' onClick={handleAnalysis}>
                            Analyze Spending
                        </Button>
                    </ProtectedFeature>
                    <Button variant='secondary' className='rounded-lg' onClick={() => setBudgetFormOpen(true)}>
                        + Create Budget
                    </Button>
                    <Button className='rounded-lg' onClick={handleFormOpen}>
                        + New Spending
                    </Button>
                </div>
            </div>
            <div className='my-2 flex space-x-6'>
                <Card className='gold-gradient dark:bg-l-green'>
                    <span className='leading-none'>{'All'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalSpent)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Need'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalNeedSpent)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Want'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalWantSpent)}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Waste'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalWasteSpent)}</span>
                    </div>
                </Card>
            </div>
            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-4'>
                    <div className='rounded-lg border border-orange-100 bg-white shadow'>
                        <div className='gold-gradient flex h-[40px] items-center rounded-lg rounded-b-none'>
                            <div className='flex items-center space-x-2 rounded-md px-2'>
                                <span>Categories</span>
                            </div>
                        </div>
                        <div className='flex-1 overflow-y-auto px-3 py-2'>
                            {spendingCategories.map((category) => (
                                <div key={category} className='flex justify-between border-b'>
                                    <div>{category}</div>
                                    <div className=''>{formatCurrency(0)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Table table={table} handleRowClick={handleViewSpend} />
                    {loading ? (
                        <div className='mt-4 text-center'>Analyzing your spending patterns...</div>
                    ) : analysis ? (
                        <Card className='mt-4 whitespace-pre-wrap p-4'>
                            <h3 className='mb-2 text-lg font-semibold'>Spending Analysis</h3>
                            {analysis}
                        </Card>
                    ) : null}
                </div>
            </div>
            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {budgetFormOpen && <BudgetForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
        </Page>
    );
};

export default Spend;
