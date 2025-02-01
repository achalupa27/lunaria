import { motion } from 'framer-motion';

const ProblemSection = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Managing Money is Hard
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-gray-500'>
                Most personal finance apps focus on tracking spending but neglect the bigger picture. Saving, investing, and growing wealth require more than just knowing where your money went.
            </motion.p>
            <div className='mt-12 flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} viewport={{ once: true }} className='relative flex h-48 w-80 flex-col items-center justify-center rounded-xl border border-gray-300 p-6 shadow-md dark:border-gray-700'>
                    <div className='mb-2 text-2xl font-medium'>Lack of Insights</div>
                    <p className='text-gray-500'>Traditional apps show numbers but don’t provide deep insights into improving financial health.</p>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }} className='relative flex h-48 w-80 flex-col items-center justify-center rounded-xl border border-gray-300 p-6 shadow-md dark:border-gray-700'>
                    <div className='mb-2 text-2xl font-medium'>Complicated Budgeting</div>
                    <p className='text-gray-500'>Most budgeting tools are overwhelming, making it hard to stick to financial goals.</p>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} viewport={{ once: true }} className='relative flex h-48 w-80 flex-col items-center justify-center rounded-xl border border-gray-300 p-6 shadow-md dark:border-gray-700'>
                    <div className='mb-2 text-2xl font-medium'>No Clear Plan</div>
                    <p className='text-gray-500'>People struggle to set and follow a plan for growing their wealth effectively.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemSection;
