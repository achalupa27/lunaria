import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const solutions = [
    {
        title: 'AI-Powered Insights',
        description: 'Understand your financial habits and get personalized recommendations.',
    },
    {
        title: 'Effortless Budgeting',
        description: 'Set realistic budgets and track them easily.',
    },
    {
        title: 'Financial Roadmap',
        description: 'Get a step-by-step plan tailored to your financial goals.',
    },
];

const SolutionSection = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-8 text-4xl font-semibold text-center'>
                A Smarter Way to Manage Money
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 mb-12'>
                Lunaria helps you go beyond simple expense tracking. Gain insights, simplify budgeting, and follow a clear path to financial growth.
            </motion.p>

            <div className='grid items-stretch gap-8 md:grid-cols-3'>
                {solutions.map((solution, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='flex h-full'>
                        <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                            <div className='flex flex-col sm:flex-row items-center justify-center space-x-3'>
                                <h3 className='text-xl font-medium'>{solution.title}</h3>
                            </div>
                            <p className='mt-2 text-zinc-500'>{solution.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SolutionSection;
