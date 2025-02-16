import Card from '@/components/ui/card';
import { CheckCircleIcon } from 'lucide-react';

const saveFeatures = [
    {
        title: 'Emergency Fund',
        description: 'Be prepared for unexpected expenses.',
    },
    {
        title: 'Investments',
        description: 'Grow your wealth over time with smart investing.',
    },
    {
        title: 'Debt Management',
        description: 'Plan ahead for major expenses.',
    },
];

const SaveSection = () => {
    return (
        <section id='save' className='py-16 text-center'>
            <h2 className='mb-4 text-4xl font-semibold'>Build Your Savings</h2>
            <p className='text-lg text-zinc-600 mb-10'>Set aside money for the future and watch your savings grow over time.</p>
            <div className='grid items-stretch gap-8 lg:grid-cols-3'>
                {saveFeatures.map((feature, index) => (
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

export default SaveSection;
