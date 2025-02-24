import { forwardRef, useImperativeHandle, useState } from 'react';
import Card from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export type SavingsAnalysisRef = {
    analyze: () => void;
};

interface SavingsAnalysisProps {
    saves: Save[] | undefined;
    savingsAccounts: SavingsAccount[] | undefined;
    debtAccounts: DebtAccount[] | undefined;
    totalSavings: number;
    totalDebt: number;
}

const SavingsAnalysis = forwardRef<SavingsAnalysisRef, SavingsAnalysisProps>((props, ref) => {
    const { saves, savingsAccounts, debtAccounts, totalSavings, totalDebt } = props;
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleAnalysis = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/openai/analyze-savings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    saves,
                    savingsAccounts,
                    debtAccounts,
                    totalSavings,
                    totalDebt,
                }),
            });

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Failed to analyze savings:', error);
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
                <Card className='text-center'>Analyzing your financial data...</Card>
            ) : analysis ? (
                <Card className='h-full flex flex-col'>
                    <h3 className='text-lg font-semibold p-4 pb-2'>Financial Analysis</h3>
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

export default SavingsAnalysis;
