import { useEffect, useState } from 'react';
import { useMakeColumns } from '@/hooks/use-make-columns';
import { formatCurrency } from '@/utils/helper';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import MakeForm from './components/make-form';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import SettingsForm from './components/settings-form';
import useFetchMakes from './hooks/use-fetch-makes';
import { useTable } from '@/hooks/use-table';
import RecentMakes from './components/recent-makes';

const Make = () => {
    const { data: makes } = useFetchMakes();
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [makeSettingsOpen, setMakeSettingsOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleViewMake = (row: any) => {
        setSelectedMake(row);
        setMakeFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(false);
        setMakeSettingsOpen(false);
    };

    const handleAnalysis = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/openai/analyze-income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    makes,
                }),
            });

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     handleAnalysis();
    // }, []);

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800`}>
                    <span>Making - All Time</span>
                    <ChevronDown />
                </div>
                <div className='flex items-center space-x-2'>
                    <Button variant='secondary' className='rounded-lg' size='icon' onClick={() => setMakeSettingsOpen(true)}>
                        <Settings />
                    </Button>
                    <Button variant='secondary' className='rounded-lg' onClick={handleAnalysis}>
                        Analyze Income
                    </Button>
                    <Button className='rounded-lg' onClick={handleFormOpen}>
                        + New Making
                    </Button>
                </div>
            </div>
            <div className='flex space-x-6 overflow-x-auto py-2'>
                <Card className='gold-gradient dark:bg-l-green'>
                    <span className='leading-none'>{'All Sources'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Software'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Trading'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
                <Card>
                    <span className='leading-none'>{'Dividends'}</span>
                    <div className='space-x-2'>
                        <span className='text-3xl font-semibold'>{formatCurrency(0)}</span>
                    </div>
                </Card>
            </div>
            {/* <div>this year vs last year by month</div> */}
            <div className='flex flex-1 space-x-4 overflow-auto p-1 scrollbar-none'>
                <div className='flex h-full flex-col space-y-2'>
                    <RecentMakes makes={makes || []} onViewMake={handleViewMake} />
                </div>
                {loading ? (
                    <div className='mt-4 text-center'>Analyzing your income data...</div>
                ) : analysis ? (
                    <Card className='mt-4 whitespace-pre-wrap p-4'>
                        <h3 className='mb-2 text-lg font-semibold'>Income Analysis</h3>
                        {analysis}
                    </Card>
                ) : null}
            </div>
            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedMake} />}
            {makeSettingsOpen && <SettingsForm closeForm={handleFormClose} />}
        </Page>
    );
};

export default Make;
