import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const ProblemSection = () => {
    return (
        <section className='mt-20 flex flex-col items-center justify-center pb-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Managing Money is Hard
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-500'>
                Most finance apps track spending but overlook wealth growth essentials like savings and income.
            </motion.p>
            <div className='mt-12 flex flex-col items-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} viewport={{ once: true }} className='flex-1'>
                    <Card className='px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>Lack of Insights</div>
                        <p className='text-zinc-500'>Traditional apps show numbers but don’t provide deep insights into improving financial health.</p>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }} className='flex-1'>
                    <Card className='px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>Complicated Budgeting</div>
                        <p className='text-zinc-500'>Most budgeting tools are overwhelming, making it hard to stick to financial goals.</p>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} viewport={{ once: true }} className='h-full flex-1'>
                    <Card className='h-full px-8 py-10'>
                        <div className='mb-3 text-2xl font-medium'>No Clear Plan</div>
                        <p className='text-zinc-500'>People struggle to set and follow a plan for growing their wealth effectively.</p>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemSection;
