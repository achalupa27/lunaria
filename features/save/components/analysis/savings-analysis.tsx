import { useEffect, useState } from 'react';
import DisplayCard from '@/features/shared/components/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';

interface SavingsAnalysisProps {
    saves: Save[] | undefined;
    savingsAccounts: SavingsAccount[] | undefined;
    debtAccounts: DebtAccount[] | undefined;
    totalSavings: number;
    totalDebt: number;
}

const SavingsAnalysis = (props: SavingsAnalysisProps) => {
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

    useEffect(() => {
        if (saves?.length && !loading && !analysis) {
            handleAnalysis();
        }
    }, [saves, loading, analysis]);

    return (
        <DisplayCard title='Financial Analysis'>
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

export default SavingsAnalysis;
