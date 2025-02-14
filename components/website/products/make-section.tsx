import Card from '@/components/ui/card';
import { CheckCircleIcon } from 'lucide-react';

const makeFeatures = [
    {
        title: 'Active Income',
        description: 'Monitor your salary, freelancing, and side gigs.',
    },
    {
        title: 'Passive Income',
        description: 'Track dividends, investments, and rental income.',
    },
    {
        title: 'New Opportunities',
        description: 'Find ways to increase your earnings and achieve financial freedom.',
    },
];

const MakeSection = () => {
    return (
        <section id='make' className='py-16 text-center'>
            <h2 className='mb-4 text-4xl font-semibold text-center'>Make More Money</h2>
            <p className='text-lg text-gray-600 mb-10'>Increase your income by identifying new opportunities and optimizing your earnings.</p>
            <div className='grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3'>
                {makeFeatures.map((feature, index) => (
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

export default MakeSection;
