import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Props = {
    spends: Spend[];
};

type ChartView = 'necessity' | 'category' | 'monthly';

const viewLabels: Record<ChartView, string> = {
    necessity: 'Necessity',
    category: 'Category',
    monthly: 'Monthly Trend',
};

const SpendingChart = ({ spends }: Props) => {
    const [view, setView] = useState<ChartView>('necessity');

    const handleNextView = () => {
        const views: ChartView[] = ['necessity', 'category', 'monthly'];
        const currentIndex = views.indexOf(view);
        const nextIndex = (currentIndex + 1) % views.length;
        setView(views[nextIndex]);
    };

    const prepareNecessityData = () => {
        const necessityGroups = spends.reduce(
            (acc, spend) => {
                const necessity = spend.necessity;
                if (!acc[necessity]) {
                    acc[necessity] = 0;
                }
                acc[necessity] += spend.cost;
                return acc;
            },
            {} as Record<string, number>
        );

        return Object.entries(necessityGroups).map(([necessity, amount]) => ({
            name: necessity,
            amount,
        }));
    };

    const prepareCategoryData = () => {
        const categoryGroups = spends.reduce(
            (acc, spend) => {
                const category = spend.category;
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += spend.cost;
                return acc;
            },
            {} as Record<string, number>
        );

        return Object.entries(categoryGroups).map(([category, amount]) => ({
            name: category,
            amount,
        }));
    };

    const prepareMonthlyData = () => {
        const monthlyGroups = spends.reduce(
            (acc, spend) => {
                const date = new Date(spend.date);
                const monthKey = format(date, 'MMM yyyy');
                if (!acc[monthKey]) {
                    acc[monthKey] = {
                        Need: 0,
                        Want: 0,
                        Waste: 0,
                    };
                }
                acc[monthKey][spend.necessity] += spend.cost;
                return acc;
            },
            {} as Record<string, Record<string, number>>
        );

        return Object.entries(monthlyGroups)
            .map(([month, data]) => ({
                name: month,
                ...data,
            }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
            .slice(-6); // Show last 6 months
    };

    const getChartData = () => {
        switch (view) {
            case 'necessity':
                return prepareNecessityData();
            case 'category':
                return prepareCategoryData();
            case 'monthly':
                return prepareMonthlyData();
            default:
                return [];
        }
    };

    const chartData = getChartData();

    const renderChart = () => {
        if (view === 'monthly') {
            return (
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={chartData}>
                        <XAxis dataKey='name' />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey='Need' fill='#22c55e' />
                        <Bar dataKey='Want' fill='#eab308' />
                        <Bar dataKey='Waste' fill='#ef4444' />
                    </BarChart>
                </ResponsiveContainer>
            );
        }

        return (
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={chartData}>
                    <XAxis dataKey='name' />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey='amount' fill='#f97316' />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Card className='h-full'>
            <div className='p-4 flex flex-col h-full'>
                <div className='flex items-center justify-between'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='-ml-4 w-fit rounded-xl px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-semibold'>
                                <span>Spending by {viewLabels[view]}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start'>
                            <DropdownMenuItem onClick={() => setView('necessity')} className='flex items-center justify-between'>
                                By Necessity
                                {view === 'necessity' && <Check className='h-4 w-4' />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setView('category')} className='flex items-center justify-between'>
                                By Category
                                {view === 'category' && <Check className='h-4 w-4' />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setView('monthly')} className='flex items-center justify-between'>
                                Monthly Trend
                                {view === 'monthly' && <Check className='h-4 w-4' />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant='ghost' size='icon' onClick={handleNextView}>
                        <ChevronRight className='h-5 w-5' />
                    </Button>
                </div>
                <div className='flex-1 min-h-0 mt-4'>{renderChart()}</div>
            </div>
        </Card>
    );
};

export default SpendingChart;
