import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Props = {
    saves: Save[] | undefined;
    savingsAccounts: SavingsAccount[] | undefined;
    debtAccounts: DebtAccount[] | undefined;
};

type ChartView = 'monthly' | 'accounts' | 'distribution';

const viewLabels: Record<ChartView, string> = {
    monthly: 'Monthly Trend',
    accounts: 'Account Balances',
    distribution: 'Savings Distribution',
};

const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6', '#f97316'];

const SavingsChart = ({ saves, savingsAccounts, debtAccounts }: Props) => {
    const [view, setView] = useState<ChartView>('monthly');

    const handleNextView = () => {
        const views: ChartView[] = ['monthly', 'accounts', 'distribution'];
        const currentIndex = views.indexOf(view);
        const nextIndex = (currentIndex + 1) % views.length;
        setView(views[nextIndex]);
    };

    const prepareMonthlyData = () => {
        if (!saves) return [];

        const monthlyGroups = saves.reduce(
            (acc, save) => {
                const date = new Date(save.date);
                const monthKey = format(date, 'MMM yyyy');
                if (!acc[monthKey]) {
                    acc[monthKey] = {
                        deposits: 0,
                        withdrawals: 0,
                    };
                }
                if (save.type === 'Deposit') {
                    acc[monthKey].deposits += save.amount;
                } else {
                    acc[monthKey].withdrawals += save.amount;
                }
                return acc;
            },
            {} as Record<string, { deposits: number; withdrawals: number }>
        );

        return Object.entries(monthlyGroups)
            .map(([month, data]) => ({
                name: month,
                ...data,
            }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
            .slice(-6);
    };

    const prepareAccountData = () => {
        if (!savingsAccounts || !debtAccounts) return [];

        return [
            ...savingsAccounts.map((account) => ({
                name: account.name,
                balance: account.balance,
                type: 'Savings',
            })),
            ...debtAccounts.map((account) => ({
                name: account.name,
                balance: -account.balance, // Negative for debt
                type: 'Debt',
            })),
        ];
    };

    const prepareDistributionData = () => {
        if (!savingsAccounts) return [];

        return savingsAccounts.map((account) => ({
            name: account.name,
            value: account.balance,
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
                            <Bar dataKey='deposits' fill='#22c55e' name='Deposits' />
                            <Bar dataKey='withdrawals' fill='#ef4444' name='Withdrawals' />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'accounts':
                return (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={prepareAccountData()}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey='balance' fill='#3b82f6' />
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
                            <span>Savings by {viewLabels[view]}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DropdownMenuItem onClick={() => setView('monthly')} className='flex items-center justify-between'>
                            Monthly Trend
                            {view === 'monthly' && <Check className='h-4 w-4' />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('accounts')} className='flex items-center justify-between'>
                            Account Balances
                            {view === 'accounts' && <Check className='h-4 w-4' />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('distribution')} className='flex items-center justify-between'>
                            Savings Distribution
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

export default SavingsChart;
