import Card from '@/components/ui/card';
import Page from '@/components/ui/page';
import { ChevronDown } from 'lucide-react';

const Home = () => {
    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className={`-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200`}>
                    <span>Dashboard - All Time</span>
                    <ChevronDown />
                </div>
            </div>
            <div className='my-2 flex space-x-6'>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Net Income'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'30'}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Net Savings'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'-12331'}</span>
                    </div>
                </Card>
                <Card className='dark:bg-l-green'>
                    <span className='leading-none'>{'Net Spending'}</span>
                    <div className='space-x-2'>
                        <span className=''>{'CAD'}</span>
                        <span className='text-3xl font-semibold'>${'30'}</span>
                    </div>
                </Card>
            </div>
        </Page>
    );
};

export default Home;
