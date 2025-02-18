import { forwardRef, useImperativeHandle, useState } from 'react';
import Card from '@/components/ui/card';
import { analyzeSpending } from '../../services/openai/analyze-spending-service';
import { usePrepareSpendingData } from '../../hooks/analysis/use-prepare-spending-data';
import ReactMarkdown from 'react-markdown';

export type SpendingAnalysisRef = {
    analyze: () => void;
};

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

const SpendingAnalysis = forwardRef<SpendingAnalysisRef, SpendingAnalysisProps>((props, ref) => {
    const { spends, budgets, recurringExpenses, categoryTotals, budgetProgress, totalSpent, totalNeedSpent, totalWantSpent, totalWasteSpent } = props;

    const { spendingData, tokenCount } = usePrepareSpendingData(spends, budgets, recurringExpenses, categoryTotals, budgetProgress, {
        totalSpent,
        totalNeedSpent,
        totalWantSpent,
        totalWasteSpent,
    });
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    console.log(spendingData);
    console.log(tokenCount);

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

    useImperativeHandle(ref, () => ({
        analyze: handleAnalysis,
    }));

    return (
        <>
            {loading ? (
                <div className='mt-4 text-center'>Analyzing your spending patterns...</div>
            ) : analysis ? (
                <Card className='prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap p-4'>
                    <h3 className='mb-2 text-lg font-semibold'>Spending Analysis</h3>
                    <ReactMarkdown className='overflow-y-auto scrollbar-none'>{analysis}</ReactMarkdown>
                </Card>
            ) : null}
        </>
    );
});

export default SpendingAnalysis;
