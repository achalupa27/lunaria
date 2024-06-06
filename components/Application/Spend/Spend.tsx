import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSpending } from '@/redux/slices/spendSlice';
import { useSpendColumns } from '@/hooks/useSpendColumns';
import { initializeTable } from '@/utils/helper';
import SpendForm from './SpendForm';
import Table from '@/components/UI/Table';
import Page from '@/components/UI/Page';
import PageHeader from '@/components/UI/PageHeader';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import HeaderCard from '@/components/UI/Cards/HeaderCard';

const Spend = () => {
    const spends = useAppSelector(selectSpending);
    const spendColumns = useSpendColumns();
    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
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
    };

    return (
        <Page>
            <PageHeader title={'Spending'} titleStyle={'text-l-yellow'} buttonText={'+ New Spending'} buttonStyle={'bg-l-yellow hover:bg-l-dark-yellow'} onClick={handleFormOpen} />
            <div className='my-2 flex space-x-6'>
                <HeaderCard title={'This Month'} value={totalSpent} isSelected={selectedNecessity === 'All'} onClick={() => setSelectedNecessity('All')} color='yellow' />
                <HeaderCard title={'Need'} value={`${totalNeedSpent.toFixed(2)}`} isSelected={selectedNecessity === 'Need'} onClick={() => setSelectedNecessity('Need')} color='green' />
                <HeaderCard title={'Want'} value={`${totalWantSpent.toFixed(2)}`} isSelected={selectedNecessity === 'Want'} onClick={() => setSelectedNecessity('Want')} color='yellow' />
                <HeaderCard title={'Waste'} value={`${totalWasteSpent.toFixed(2)}`} isSelected={selectedNecessity === 'Waste'} onClick={() => setSelectedNecessity('Waste')} color='red' />
            </div>
            <div className='flex flex-1 space-x-4 overflow-auto scrollbar-none'>
                <Table table={table} tableColor='yellow' handleRowClick={handleViewSpend} />
                <div className='h-full w-full rounded-md border border-l-yellow'>
                    <div className='flex justify-between rounded-md rounded-b-none bg-l-yellow px-2 py-1 text-primary'>
                        <select name='choice' className='bg-transparent'>
                            <option value='first' selected>
                                Daily Spending
                            </option>
                            <option value='second'>Weekly Spending</option>
                            <option value='third'>Monthly Spending</option>
                        </select>
                    </div>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <XAxis height={0} dataKey='date' tickLine={false} />
                            <YAxis width={0} tickLine={false} />
                            <Line type='monotone' dataKey='spent' stroke={'#f7ebc0'} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <SpendForm isOpen={spendFormOpen} closeForm={handleFormClose} selectedSpend={selectedSpend} />
        </Page>
    );
};

export default Spend;
