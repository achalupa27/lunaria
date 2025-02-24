import { forwardRef, useImperativeHandle, useState } from 'react';
import Card from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export type IncomeAnalysisRef = {
    analyze: () => void;
};

interface IncomeAnalysisProps {
    makes: Make[] | undefined;
}

const IncomeAnalysis = forwardRef<IncomeAnalysisRef, IncomeAnalysisProps>((props, ref) => {
    const { makes } = props;
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleAnalysis = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/openai/analyze-income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ makes }),
            });

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Failed to analyze income:', error);
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
                <Card className='text-center'>Analyzing your income data...</Card>
            ) : analysis ? (
                <Card className='h-full flex flex-col'>
                    <h3 className='text-lg font-semibold p-4 pb-2'>Income Analysis</h3>
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

IncomeAnalysis.displayName = 'IncomeAnalysis';

export default IncomeAnalysis;
