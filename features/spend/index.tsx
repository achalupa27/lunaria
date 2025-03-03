import { useState } from 'react';
import Page from '@/components/ui/page';
import BudgetForm from './components/forms/budget-form';
import { useFilteredSpends, SpendingTerm } from './hooks/data/use-filtered-spends';
import { useBudgetProgress } from './hooks/data/use-budget-progress';
import CategoriesAndBudgets from './components/cards/categories/categories-and-budgets';
import RecurringExpensesList from './components/cards/recurring/recurring-expenses-list';
import SpendingPeriodSelector from './components/header/spending-period-selector';
import ActionButtons from './components/header/action-buttons';
import SpendingSummary from './components/header/summary/spending-summary';
import RecentSpending from './components/cards/recent/recent-spending';
import SpendingChart from './components/cards/visualization/spending-chart';
import { useReadBudgets } from './hooks/supabase/use-budget';
import { useReadRecurringExpenses } from './hooks/supabase/use-recurring-expenses';
import { useReadSpends } from './hooks/supabase/use-spends';
import SpendingAnalysis from './components/cards/analysis/spending-analysis';
import SpendForm from './components/forms/expense-form';

const Spend = () => {
    // const { userRole } = useRole();
    const { data: spends } = useReadSpends();
    const { data: budgets } = useReadBudgets();
    const { data: recurringExpenses } = useReadRecurringExpenses();

    const [selectedTerm, setSelectedTerm] = useState<SpendingTerm>('This Month');

    const { filteredSpends, totalNeedSpent, totalWantSpent, totalWasteSpent, totalSpent, categoryTotals } = useFilteredSpends(spends, selectedTerm);
    const budgetProgress = useBudgetProgress(spends, budgets);

    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
    const [budgetFormOpen, setBudgetFormOpen] = useState<boolean>(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState<boolean>(false);
    const [selectedSpend, setSelectedSpend] = useState<Spend | undefined>();
    const [recurringExpenseFormOpen, setRecurringExpenseFormOpen] = useState<boolean>(false);
    const [selectedRecurringExpense, setSelectedRecurringExpense] = useState<RecurringExpense | undefined>();
    const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>();

    const handleViewSpend = (row: Spend) => {
        setSelectedSpend(row);
        setSpendFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedSpend(undefined);
        setSpendFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedBudget(undefined);
        setSelectedSpend(undefined);
        setSpendFormOpen(false);
        setBudgetFormOpen(false);
        setSettingsFormOpen(false);
        setRecurringExpenseFormOpen(false);
    };

    const handleTermChange = (term: SpendingTerm) => {
        setSelectedTerm(term);
    };

    const handleViewRecurringExpense = (expense: RecurringExpense) => {
        setSelectedRecurringExpense(expense);
        setRecurringExpenseFormOpen(true);
    };

    const handleBudgetClick = (category: string) => {
        const budget = budgets?.find((b) => b.category === category);
        if (budget) {
            setSelectedBudget(budget);
            setBudgetFormOpen(true);
        } else {
            setSelectedBudget(undefined);
            setBudgetFormOpen(true);
        }
    };

    // if (!userRole) return <div>Loading...</div>;

    return (
        <Page>
            <div className='flex justify-between'>
                <SpendingPeriodSelector selectedTerm={selectedTerm} onTermChange={handleTermChange} />
                <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onBudgetClick={() => setBudgetFormOpen(true)} onNewSpendClick={handleFormOpen} userRole={undefined} />
            </div>

            <SpendingSummary totalSpent={totalSpent} totalNeedSpent={totalNeedSpent} totalWantSpent={totalWantSpent} totalWasteSpent={totalWasteSpent} />

            <div className='grid grid-cols-3 gap-4 flex-1 min-h-0'>
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    <RecentSpending spends={filteredSpends} onViewSpend={handleViewSpend} />
                    <RecurringExpensesList recurringExpenses={recurringExpenses} onViewExpense={handleViewRecurringExpense} />
                </div>
                <CategoriesAndBudgets categoryTotals={categoryTotals} budgetProgress={budgetProgress} onBudgetClick={handleBudgetClick} />
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    <SpendingChart spends={filteredSpends} />
                    <SpendingAnalysis spends={filteredSpends} budgets={budgets} recurringExpenses={recurringExpenses} categoryTotals={categoryTotals} budgetProgress={budgetProgress} totalSpent={totalSpent} totalNeedSpent={totalNeedSpent} totalWantSpent={totalWantSpent} totalWasteSpent={totalWasteSpent} />
                </div>
            </div>

            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {recurringExpenseFormOpen && <SpendForm closeForm={handleFormClose} selectedRecurringExpense={selectedRecurringExpense} />}
            {budgetFormOpen && <BudgetForm closeForm={handleFormClose} selectedBudget={selectedBudget} />}
        </Page>
    );
};

export default Spend;
