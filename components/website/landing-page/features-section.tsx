import Card from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';

const features = [
    {
        title: 'AI-Powered Insights',
        description: 'Gain deep insights into your financial habits with AI-driven analytics.',
    },
    {
        title: 'Secure & Private',
        description: 'Your financial data is encrypted and never shared without your consent.',
    },
    {
        title: 'Wealth Dashboard',
        description: 'Monitor your income, savings, and investments in one place.',
    },
    {
        title: 'Spending Tracker',
        description: 'Track expenses accurately and receive personalized spending tips.',
    },
    {
        title: 'Income Overview',
        description: 'View your income sources and track how they evolve over time.',
    },
    {
        title: 'Savings Management',
        description: 'Manage all your savings, investments, and debt accounts.',
    },
];

const FeaturesSection = () => {
    return (
        <section className='py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-8 text-4xl font-semibold'>
                Features
            </motion.h2>
            <div className='grid gap-8 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3'>
                {features.map((feature, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }}>
                        <Card className='py-12'>
                            <div className='flex items-center justify-center space-x-3'>
                                <CheckCircleIcon className='text-green-500' />
                                <h3 className='text-xl font-medium'>{feature.title}</h3>
                            </div>
                            <p className='mt-2 text-zinc-500'>{feature.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
