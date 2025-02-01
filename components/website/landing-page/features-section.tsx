import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';

const features = [
    {
        title: 'AI-Powered Insights',
        description: 'Gain deep insights into your financial habits with AI-driven analytics.',
    },
    {
        title: 'Smart Budgeting',
        description: 'Automatically categorize expenses and get personalized budgeting recommendations.',
    },
    {
        title: 'Wealth Tracking',
        description: 'Monitor your income, savings, and investments in one place.',
    },
    {
        title: 'Secure & Private',
        description: 'Your financial data is encrypted and never shared without your consent.',
    },
    {
        title: 'Goal Setting',
        description: 'Set and track financial goals to stay on top of your money.',
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
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='rounded-xl border border-zinc-200 p-6 shadow dark:border-zinc-700'>
                        <div className='flex items-center justify-center space-x-3'>
                            <CheckCircleIcon className='text-green-500' />
                            <h3 className='text-xl font-medium'>{feature.title}</h3>
                        </div>
                        <p className='mt-2 text-zinc-500'>{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
