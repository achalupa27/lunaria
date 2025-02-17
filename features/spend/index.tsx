import { useState } from 'react';
import { formatCurrency } from '@/utils/helper';
import SpendForm from './components/forms/spend-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import { spendingCategories } from '@/constants';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import BudgetForm from './components/forms/budget-form';
import SettingsForm from './components/forms/settings-form';
import useFetchSpends from './hooks/transaction/use-fetch-spends';
import { useSpendColumns } from './hooks/use-spend-columns';
import { useTable } from '@/hooks/use-table';
import { useSubscription } from '@/hooks/use-subscription';
import ProtectedFeature from '@/components/feature';
import useFetchBudgets from './hooks/budget/use-fetch-budgets';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFilteredSpends, SpendingTerm } from './hooks/transaction/use-filtered-spends';
import { useBudgetProgress } from './hooks/budget/use-budget-progress';
import RecurringExpenseForm from './components/forms/recurring-expense-form';
import useFetchRecurringExpenses from './hooks/recurring-expense/use-fetch-recurring-expenses';
import TransactionTable from './components/transactions/transaction-table';
import CategoriesAndBudgets from './components/categories/categories-and-budgets';
import RecurringExpensesList from './components/recurring/recurring-expenses-list';
import SpendingPeriodSelector from './components/header/spending-period-selector';
import ActionButtons from './components/header/action-buttons';
import SpendingSummary from './components/summary/spending-summary';

const Spend = () => {
    const { data: spends } = useFetchSpends();
    const { data: budgets } = useFetchBudgets();
    const { data: recurringExpenses } = useFetchRecurringExpenses();
    const [selectedTerm, setSelectedTerm] = useState<SpendingTerm>('All Time');

    const { filteredSpends, totalNeedSpent, totalWantSpent, totalWasteSpent, totalSpent, categoryTotals } = useFilteredSpends(spends, selectedTerm);
    const budgetProgress = useBudgetProgress(spends, budgets);

    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
    const [budgetFormOpen, setBudgetFormOpen] = useState<boolean>(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState<boolean>(false);
    const [selectedSpend, setSelectedSpend] = useState<Spend | undefined>();

    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const [recurringExpenseFormOpen, setRecurringExpenseFormOpen] = useState<boolean>(false);
    const [selectedRecurringExpense, setSelectedRecurringExpense] = useState<RecurringExpense | undefined>();

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
        setRecurringExpenseFormOpen(false);
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

    const handleTermChange = (term: SpendingTerm) => {
        setSelectedTerm(term);
    };

    const handleViewRecurringExpense = (expense: RecurringExpense) => {
        setSelectedRecurringExpense(expense);
        setRecurringExpenseFormOpen(true);
    };

    if (subscriptionLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Page>
            <div className='flex justify-between'>
                <SpendingPeriodSelector selectedTerm={selectedTerm} onTermChange={handleTermChange} />
                <div className='flex items-center space-x-2'>
                    <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onAnalyzeClick={handleAnalysis} onBudgetClick={() => setBudgetFormOpen(true)} onRecurringExpenseClick={() => setRecurringExpenseFormOpen(true)} onNewSpendClick={handleFormOpen} userRole={subscription?.role} />
                </div>
            </div>

            <SpendingSummary totalSpent={totalSpent} totalNeedSpent={totalNeedSpent} totalWantSpent={totalWantSpent} totalWasteSpent={totalWasteSpent} />

            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-4'>
                    <CategoriesAndBudgets categoryTotals={categoryTotals} budgetProgress={budgetProgress} />
                    <TransactionTable spends={filteredSpends} onViewSpend={handleViewSpend} />
                    {loading ? (
                        <div className='mt-4 text-center'>Analyzing your spending patterns...</div>
                    ) : analysis ? (
                        <Card className='mt-4 whitespace-pre-wrap p-4'>
                            <h3 className='mb-2 text-lg font-semibold'>Spending Analysis</h3>
                            {analysis}
                        </Card>
                    ) : null}
                </div>
                <RecurringExpensesList recurringExpenses={recurringExpenses} onViewExpense={handleViewRecurringExpense} />
            </div>
            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {budgetFormOpen && <BudgetForm closeForm={handleFormClose} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {recurringExpenseFormOpen && <RecurringExpenseForm closeForm={handleFormClose} selectedRecurringExpense={selectedRecurringExpense} />}
        </Page>
    );
};

export default Spend;
