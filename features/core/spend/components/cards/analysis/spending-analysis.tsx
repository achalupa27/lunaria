import { Suspense } from 'react';
import DisplayCard from '@/components/ui/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { ErrorBoundary } from 'react-error-boundary';
import { useSpendingAnalysis } from '@/features/core/spend/hooks/openai/use-spending-analysis';
import { usePrepareSpendingData } from '@/features/core/spend/hooks/openai/use-prepare-spending-data';

interface SpendingAnalysisProps {
    spends: Spend[] | undefined;
    budgets: Budget[] | undefined;
    recurringExpenses: RecurringExpense[] | undefined;
    categoryTotals: Record<string, number>;
    budgetProgress: Record<string, { spent: number; budget: number }>;
    totalSpent: number;
    totalNeedSpent: number;
    totalWantSpent: number;
    totalWasteSpent: number;
}

const NotEnoughData = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center h-full'>
            <div className='text-zinc-600 dark:text-zinc-400 mb-2'>Not enough transactions for analysis</div>
            <div className='text-sm text-zinc-500 dark:text-zinc-500'>Record at least 5 transactions to get AI-powered spending insights</div>
        </div>
    );
};

const AnalysisContent = ({ spendingData }: { spendingData: any }) => {
    const { data: analysis } = useSpendingAnalysis(spendingData);

    return (
        <div className='flex-1 overflow-y-auto scrollbar-none'>
            <div className='prose prose-sm dark:prose-invert max-w-none'>
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
        </div>
    );
};

const SpendingAnalysis = (props: SpendingAnalysisProps) => {
    const { spends, budgets, recurringExpenses, categoryTotals, budgetProgress, totalSpent, totalNeedSpent, totalWantSpent, totalWasteSpent } = props;

    // Early return if not enough transactions
    if (!spends || spends.length < 5) {
        return (
            <DisplayCard title='Spending Analysis'>
                <NotEnoughData />
            </DisplayCard>
        );
    }

    const { spendingData } = usePrepareSpendingData(spends, budgets, recurringExpenses, categoryTotals, budgetProgress, {
        totalSpent,
        totalNeedSpent,
        totalWantSpent,
        totalWasteSpent,
    });

    return (
        <DisplayCard title='Spending Analysis'>
            <ErrorBoundary fallback={<div>Error loading analysis</div>}>
                <Suspense fallback={<Loader />}>{spendingData && <AnalysisContent spendingData={spendingData} />}</Suspense>
            </ErrorBoundary>
        </DisplayCard>
    );
};

export default SpendingAnalysis;
