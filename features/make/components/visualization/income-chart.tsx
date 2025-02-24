import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Props = {
    makes: Make[];
};

type ChartView = 'monthly' | 'source' | 'distribution';

const viewLabels: Record<ChartView, string> = {
    monthly: 'Monthly Trend',
    source: 'Income Sources',
    distribution: 'Income Distribution',
};

const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6', '#f97316'];

const IncomeChart = ({ makes }: Props) => {
    const [view, setView] = useState<ChartView>('monthly');

    const handleNextView = () => {
        const views: ChartView[] = ['monthly', 'source', 'distribution'];
        const currentIndex = views.indexOf(view);
        const nextIndex = (currentIndex + 1) % views.length;
        setView(views[nextIndex]);
    };

    const prepareMonthlyData = () => {
        const monthlyGroups = makes.reduce(
            (acc, make) => {
                const date = new Date(make.date);
                const monthKey = format(date, 'MMM yyyy');
                if (!acc[monthKey]) {
                    acc[monthKey] = 0;
                }
                acc[monthKey] += make.amount;
                return acc;
            },
            {} as Record<string, number>
        );

        return Object.entries(monthlyGroups)
            .map(([month, amount]) => ({
                name: month,
                amount,
            }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
            .slice(-6);
    };

    const prepareSourceData = () => {
        const sourceGroups = makes.reduce(
            (acc, make) => {
                if (!acc[make.source]) {
                    acc[make.source] = 0;
                }
                acc[make.source] += make.amount;
                return acc;
            },
            {} as Record<string, number>
        );

        return Object.entries(sourceGroups).map(([source, amount]) => ({
            name: source,
            amount,
        }));
    };

    const prepareDistributionData = () => {
        return prepareSourceData().map((item) => ({
            name: item.name,
            value: item.amount,
        }));
    };

    const renderChart = () => {
        switch (view) {
            case 'monthly':
                return (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={prepareMonthlyData()}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey='amount' fill='#22c55e' name='Income' />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'source':
                return (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={prepareSourceData()}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey='amount' fill='#3b82f6' name='Amount' />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'distribution':
                return (
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie data={prepareDistributionData()} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} label={(entry) => `${entry.name} (${formatCurrency(entry.value)})`}>
                                {prepareDistributionData().map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <Card className='flex flex-col h-full p-6'>
            <div className='flex items-center justify-between'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='-ml-4 w-fit rounded-xl px-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-semibold'>
                            <span>Income by {viewLabels[view]}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DropdownMenuItem onClick={() => setView('monthly')} className='flex items-center justify-between'>
                            Monthly Trend
                            {view === 'monthly' && <Check className='h-4 w-4' />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('source')} className='flex items-center justify-between'>
                            Income Sources
                            {view === 'source' && <Check className='h-4 w-4' />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('distribution')} className='flex items-center justify-between'>
                            Income Distribution
                            {view === 'distribution' && <Check className='h-4 w-4' />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant='ghost' size='icon' onClick={handleNextView}>
                    <ChevronRight className='h-5 w-5' />
                </Button>
            </div>
            <div className='flex-1 min-h-0 mt-4'>{renderChart()}</div>
        </Card>
    );
};

export default IncomeChart;
