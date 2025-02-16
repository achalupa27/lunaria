import Card from '@/components/ui/card';
import { CheckCircleIcon } from 'lucide-react';

const dashboardFeatures = [
    {
        title: 'Income',
        description: 'See all your revenue sources in one place.',
    },
    {
        title: 'Savings',
        description: 'Track how much you&apos;re setting aside for the future.',
    },
    {
        title: 'Spending',
        description: 'Analyze your expenses and optimize your budget.',
    },
];

const DashboardSection = () => {
    return (
        <section id='dashboard' className='py-16 text-center'>
            <h2 className='mb-4 text-4xl font-semibold'>Your Financial Dashboard</h2>
            <p className='text-lg text-gray-600 mb-10'>Get a complete overview of your personal finances, including income, savings, and spending.</p>
            <div className='grid items-stretch gap-8 lg:grid-cols-3'>
                {dashboardFeatures.map((feature, index) => (
                    <div key={index} className='h-full'>
                        <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                            <div className='flex flex-col sm:flex-row items-center justify-center space-x-3'>
                                <CheckCircleIcon className='text-green-500 mb-2 sm:mb-0' />
                                <h3 className='text-xl font-medium'>{feature.title}</h3>
                            </div>
                            <p className='mt-2 text-zinc-500'>{feature.description}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DashboardSection;
