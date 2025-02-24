import { useEffect, useState } from 'react';
import { analyzeSpending } from '../../services/openai/analyze-spending-service';
import { usePrepareSpendingData } from '../../hooks/analysis/use-prepare-spending-data';
import ReactMarkdown from 'react-markdown';
import DisplayCard from '@/features/shared/components/display-card';
import Loader from '@/components/ui/loader';

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

const SpendingAnalysis = (props: SpendingAnalysisProps) => {
    const { spends, budgets, recurringExpenses, categoryTotals, budgetProgress, totalSpent, totalNeedSpent, totalWantSpent, totalWasteSpent } = props;

    const { spendingData, tokenCount } = usePrepareSpendingData(spends, budgets, recurringExpenses, categoryTotals, budgetProgress, {
        totalSpent,
        totalNeedSpent,
        totalWantSpent,
        totalWasteSpent,
    });
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleAnalysis = async () => {
        try {
            setLoading(true);
            const response = await analyzeSpending(spendingData);
            setAnalysis(response);
        } catch (error) {
            console.error('Failed to analyze spending:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (spends?.length && !loading && !analysis) {
            handleAnalysis();
        }
    }, [spends, loading, analysis]);

    return (
        <DisplayCard title='Spending Analysis'>
            {loading && <Loader />}
            {!loading && analysis && (
                <div className='flex-1 overflow-y-auto scrollbar-none p-4 pt-0'>
                    <div className='prose prose-sm dark:prose-invert max-w-none'>
                        <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                </div>
            )}
        </DisplayCard>
    );
};

export default SpendingAnalysis;
