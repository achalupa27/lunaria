import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const SolutionSection = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                A Smarter Way to Manage Money
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-500 dark:text-zinc-400'>
                Lunaria helps you go beyond simple expense tracking. Gain insights, simplify budgeting, and follow a clear path to financial growth.
            </motion.p>
            <div className='mt-12 flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} viewport={{ once: true }} className='flex-1'>
                    <Card className='px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>AI-Powered Insights</div>
                        <p className='text-zinc-500'>Understand your financial habits and get personalized recommendations.</p>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }} className='flex-1'>
                    <Card className='px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>Effortless Budgeting</div>
                        <p className='text-zinc-500'>Set realistic budgets and track them easily.</p>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} viewport={{ once: true }} className='flex-1'>
                    <Card className='px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>Financial Roadmap</div>
                        <p className='text-zinc-500'>Get a step-by-step plan tailored to your financial goals.</p>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default SolutionSection;
