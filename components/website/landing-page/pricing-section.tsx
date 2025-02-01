import { motion } from 'framer-motion';

const PricingSection = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Choose Your Plan
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-500'>
                Flexible pricing plans designed to fit your needs and help you achieve financial success.
            </motion.p>
            <div className='mt-12 flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }} viewport={{ once: true }} className='relative flex h-64 w-80 flex-col items-center justify-center rounded-xl border border-zinc-300 p-6 shadow-md dark:border-zinc-700'>
                    <div className='mb-2 text-2xl font-medium'>Basic</div>
                    <p className='mb-4 text-zinc-500'>Free</p>
                    <p className='text-zinc-500'>Essential tools for managing your personal finances.</p>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }} className='relative flex h-64 w-80 flex-col items-center justify-center rounded-xl border border-zinc-300 p-6 shadow-md dark:border-zinc-700'>
                    <div className='mb-2 text-2xl font-medium'>Premium</div>
                    <p className='mb-4 text-zinc-500'>$5/month</p>
                    <p className='text-zinc-500'>Advanced insights and automation tools to optimize your finances.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
