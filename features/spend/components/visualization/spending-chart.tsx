import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
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
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray='3 3' />
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
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray='3 3' />
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
        <Card>
            <div className='p-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='-ml-4 flex items-center space-x-2 rounded-xl px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-semibold'>
                            <span>Spending by {viewLabels[view]}</span>
                            <ChevronDown className='h-5 w-5' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DropdownMenuItem onClick={() => setView('necessity')}>By Necessity</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('category')}>By Category</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('monthly')}>Monthly Trend</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className='mt-4'>{renderChart()}</div>
            </div>
        </Card>
    );
};

export default SpendingChart;
