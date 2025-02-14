import Card from '@/components/ui/card';
import { CheckCircleIcon } from 'lucide-react';

const spendFeatures = [
    {
        title: 'Essentials',
        description: 'Manage necessary living expenses like rent and groceries.',
    },
    {
        title: 'Discretionary',
        description: 'Keep track of entertainment and non-essential purchases.',
    },
    {
        title: 'Investments',
        description: 'Allocate funds towards future financial growth.',
    },
];

const SpendSection = () => {
    return (
        <section id='spend' className='py-16 text-center'>
            <h2 className='mb-4 text-4xl font-semibold'>Smart Spending</h2>
            <p className='text-lg text-gray-600 mb-10'>Optimize your expenses and make informed financial decisions.</p>
            <div className='grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3'>
                {spendFeatures.map((feature, index) => (
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

export default SpendSection;
