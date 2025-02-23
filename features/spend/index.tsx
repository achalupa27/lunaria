import { useState, useRef } from 'react';
import SpendForm from './components/forms/spend-form';
import Page from '@/components/ui/page';
import BudgetForm from './components/forms/budget-form';
import SettingsForm from './components/forms/settings-form';
import useFetchSpends from './hooks/transaction/use-fetch-spends';
import useFetchBudgets from './hooks/budget/use-fetch-budgets';
import { useFilteredSpends, SpendingTerm } from './hooks/transaction/use-filtered-spends';
import { useBudgetProgress } from './hooks/budget/use-budget-progress';
import useFetchRecurringExpenses from './hooks/recurring-expense/use-fetch-recurring-expenses';
import TransactionTable from './components/transactions/transaction-table';
import CategoriesAndBudgets from './components/categories/categories-and-budgets';
import RecurringExpensesList from './components/recurring/recurring-expenses-list';
import SpendingPeriodSelector from './components/header/spending-period-selector';
import ActionButtons from './components/header/action-buttons';
import SpendingSummary from './components/summary/spending-summary';
import { useRole } from '@/hooks/use-role';
import SpendingAnalysis from './components/analysis/spending-analysis';
import { SpendingAnalysisRef } from './components/analysis/spending-analysis';
import RecentTransactions from './components/transactions/recent-transactions';

const Spend = () => {
    const { userRole } = useRole();
    const { data: spends } = useFetchSpends();
    const { data: budgets } = useFetchBudgets();
    const { data: recurringExpenses } = useFetchRecurringExpenses();

    console.log(spends);
    console.log(budgets);
    console.log(recurringExpenses);
    const [selectedTerm, setSelectedTerm] = useState<SpendingTerm>('All Time');

    const { filteredSpends, totalNeedSpent, totalWantSpent, totalWasteSpent, totalSpent, categoryTotals } = useFilteredSpends(spends, selectedTerm);
    const budgetProgress = useBudgetProgress(spends, budgets);

    const [spendFormOpen, setSpendFormOpen] = useState<boolean>(false);
    const [budgetFormOpen, setBudgetFormOpen] = useState<boolean>(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState<boolean>(false);
    const [selectedSpend, setSelectedSpend] = useState<Spend | undefined>();
    const [recurringExpenseFormOpen, setRecurringExpenseFormOpen] = useState<boolean>(false);
    const [selectedRecurringExpense, setSelectedRecurringExpense] = useState<RecurringExpense | undefined>();

    const analysisRef = useRef<SpendingAnalysisRef>(null);

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

    const handleTermChange = (term: SpendingTerm) => {
        setSelectedTerm(term);
    };

    const handleViewRecurringExpense = (expense: RecurringExpense) => {
        setSelectedRecurringExpense(expense);
        setRecurringExpenseFormOpen(true);
    };

    if (!userRole) return <div>Loading...</div>;

    return (
        <Page>
            <div className='flex justify-between'>
                <SpendingPeriodSelector selectedTerm={selectedTerm} onTermChange={handleTermChange} />
                <div className='flex items-center space-x-2'>
                    <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onAnalyzeClick={() => analysisRef.current?.analyze()} onBudgetClick={() => setBudgetFormOpen(true)} onNewSpendClick={handleFormOpen} userRole={userRole} />
                </div>
            </div>

            <SpendingSummary totalSpent={totalSpent} totalNeedSpent={totalNeedSpent} totalWantSpent={totalWantSpent} totalWasteSpent={totalWasteSpent} />

            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-4'>
                    <CategoriesAndBudgets categoryTotals={categoryTotals} budgetProgress={budgetProgress} />
                    <RecentTransactions spends={filteredSpends} onViewSpend={handleViewSpend} />
                </div>
                <RecurringExpensesList recurringExpenses={recurringExpenses} onViewExpense={handleViewRecurringExpense} />

                <SpendingAnalysis ref={analysisRef} spends={filteredSpends} budgets={budgets} recurringExpenses={recurringExpenses} categoryTotals={categoryTotals} budgetProgress={budgetProgress} totalSpent={totalSpent} totalNeedSpent={totalNeedSpent} totalWantSpent={totalWantSpent} totalWasteSpent={totalWasteSpent} />
            </div>

            {spendFormOpen && <SpendForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
            {recurringExpenseFormOpen && <SpendForm closeForm={handleFormClose} selectedRecurringExpense={selectedRecurringExpense} />}
            {budgetFormOpen && <BudgetForm closeForm={handleFormClose} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} selectedSpend={selectedSpend} />}
        </Page>
    );
};

export default Spend;
