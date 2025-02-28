import { useState } from 'react';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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

    const chartConfig = {
        desktop: {
            label: 'Desktop',
            color: '#2563eb',
        },
        mobile: {
            label: 'Mobile',
            color: '#60a5fa',
        },
    } satisfies ChartConfig;

    const chartData = getChartData();

    const renderChart = () => {
        if (view === 'monthly') {
            return (
                <ChartContainer config={chartConfig} className='w-full h-full'>
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis dataKey='name' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                        <Bar dataKey='Need' fill='#22c55e' radius={4} />
                        <Bar dataKey='Want' fill='#eab308' radius={4} />
                        <Bar dataKey='Waste' fill='#ef4444' radius={4} />
                    </BarChart>
                </ChartContainer>
            );
        }

        return (
            <ChartContainer config={chartConfig} className='w-full h-full'>
                <BarChart accessibilityLayer data={chartData}>
                    <XAxis dataKey='name' tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey='amount' fill='#f97316' radius={4} />
                </BarChart>
            </ChartContainer>
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
