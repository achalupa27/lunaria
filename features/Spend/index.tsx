import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';
import { useSpendColumns } from '@/hooks/useSpendColumns';
import { formatCurrency, initializeTable } from '@/utils/helper';
import SpendForm from './components/spend-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import PageHeader from '@/components/ui/page-header';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import HeaderCard from '@/components/ui/header-card';
import { spendingCategories } from '@/constants';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import BudgetForm from './components/budget-form';
import SettingsForm from './components/settings-form';

const Spend = () => {
    const spends = useAppSelector(selectSpending);
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
    const [chartData, setChartData] = useState<SpendDataPoint>();

    const table = initializeTable(spends, spendColumns);

    useEffect(() => {
        if (spends.length > 0) {
            const necessityTotals = spends.reduce(
                (acc, spend) => {
                    // Convert cost to USD if currency is 'MXN'
                    const convertedCost = spend.currency === 'MXN' ? spend.cost / 11.5 : spend.cost;

                    // Filter spends based on necessity category and sum the costs
                    switch (spend.necessity) {
                        case 'Need':
                            acc.totalNeedSpent += convertedCost;
                            break;
                        case 'Want':
                            acc.totalWantSpent += convertedCost;
                            break;
                        case 'Waste':
                            acc.totalWasteSpent += convertedCost;
                            break;
                        default:
                            break;
                    }

                    acc.totalSpent += convertedCost;

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

    useEffect(() => {
        // Group spends by date and sum the costs for each day
        const groupedSpendsByDay: { [key: string]: number } = spends.reduce((acc, spend) => {
            const date = spend.date;
            const convertedCost = spend.currency === 'MXN' ? spend.cost / 11.5 : spend.cost;

            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += convertedCost;

            return acc;
        }, {} as { [key: string]: number });

        // Convert the grouped data into an array of objects for the LineChart component
        const groupedChartData: SpendDataPoint = Object.entries(groupedSpendsByDay).map(([date, spent]) => ({ date, spent }));

        // Update state variable to trigger re-render with new chart data
        setChartData(groupedChartData);
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
                <div className='flex h-full flex-col space-y-4 bg-white'>
                    <div className='rounded-lg border border-orange-100 shadow'>
                        <div className='gold-gradient flex h-[30px] items-center rounded-lg rounded-b-none'>
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
                    {/* <div>Recent Transactions</div> */}
                    <Table table={table} tableColor='yellow' handleRowClick={handleViewSpend} />
                </div>
                {/* <div className='flex h-full w-full flex-col rounded-md border border-l-yellow'>
                    <div className='flex justify-between rounded-md rounded-b-none bg-l-yellow px-2 py-1 text-primary'>
                        <select name='choice' className='bg-transparent'>
                            <option value='first' selected>
                                Daily Spending
                            </option>
                            <option value='second'>Weekly Spending</option>
                            <option value='third'>Monthly Spending</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <ResponsiveContainer>
                            <LineChart data={chartData}>
                                <XAxis tick={{ fill: 'white' }} dataKey='date' tickLine={false} stroke={'#f7ebc0'} />
                                <YAxis width={40} tick={{ fill: 'white' }} tickLine={false} stroke={'#f7ebc0'} />
                                <Line type='monotone' dataKey='spent' dot={false} stroke={'#f7ebc0'} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div> */}
            </div>
            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {budgetFormOpen && <BudgetForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
        </Page>
    );
};

export default Spend;
