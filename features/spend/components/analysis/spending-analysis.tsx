import { Suspense } from 'react';
import DisplayCard from '@/features/shared/components/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { usePrepareSpendingData } from '../../hooks/analysis/use-prepare-spending-data';
import { useSpendingAnalysis } from '../../hooks/analysis/use-spending-analysis';
import { ErrorBoundary } from 'react-error-boundary';

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
