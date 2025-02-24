import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import Card from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
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
                    <ResponsiveContainer width='100%' height={300}>
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
                    <ResponsiveContainer width='100%' height={300}>
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
                    <ResponsiveContainer width='100%' height={300}>
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
        <Card>
            <div className='p-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='-ml-4 flex items-center space-x-2 rounded-xl px-4 text-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800'>
                            <span>Savings by {viewLabels[view]}</span>
                            <ChevronDown className='h-5 w-5' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                        <DropdownMenuItem onClick={() => setView('monthly')}>Monthly Trend</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('accounts')}>Account Balances</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setView('distribution')}>Savings Distribution</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className='mt-4'>{renderChart()}</div>
            </div>
        </Card>
    );
};

export default SavingsChart;
