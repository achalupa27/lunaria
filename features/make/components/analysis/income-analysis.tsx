import { useEffect, useState } from 'react';
import DisplayCard from '@/features/shared/components/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';

interface IncomeAnalysisProps {
    makes: Make[] | undefined;
}

const IncomeAnalysis = (props: IncomeAnalysisProps) => {
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

    useEffect(() => {
        if (makes?.length && !loading && !analysis) {
            handleAnalysis();
        }
    }, [makes, loading, analysis]);

    return (
        <DisplayCard title='Income Analysis'>
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

export default IncomeAnalysis;
