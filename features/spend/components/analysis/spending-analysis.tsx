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
                <Card className='text-center'>Analyzing your spending patterns...</Card>
            ) : analysis ? (
                <Card className='h-full flex flex-col'>
                    <h3 className='text-lg font-semibold p-4 pb-2'>Spending Analysis</h3>
                    <div className='flex-1 overflow-y-auto scrollbar-none p-4 pt-0'>
                        <div className='prose prose-sm dark:prose-invert max-w-none'>
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className='h-full flex flex-col'>_</Card>
            )}
        </>
    );
});

export default SpendingAnalysis;
