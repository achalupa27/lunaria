import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const problems = [
    {
        title: 'Lack of Insights',
        description: 'Traditional apps show numbers but don’t provide deep insights.',
    },
    {
        title: 'Complicated Budgeting',
        description: 'Most budgeting tools are overwhelming, making it hard to stick to financial goals.',
    },
    {
        title: 'No Clear Plan',
        description: 'People struggle to set and follow a plan for growing their wealth effectively.',
    },
];

const ProblemSection = () => {
    return (
        <section className='flex flex-col items-center justify-center pb-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Managing Money is Hard
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-12'>
                Most finance apps track spending but overlook wealth growth essentials like savings and income.
            </motion.p>

            <div className='grid items-stretch gap-8 md:grid-cols-3'>
                {problems.map((problem, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='flex h-full'>
                        <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                            <div className='flex flex-col sm:flex-row items-center justify-center space-x-3'>
                                <h3 className='text-xl font-medium'>{problem.title}</h3>
                            </div>
                            <p className='mt-2 text-zinc-700 dark:text-zinc-300'>{problem.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProblemSection;

{
    /* <Card className='flex h-48 w-96 flex-col items-center justify-center'> */
}
