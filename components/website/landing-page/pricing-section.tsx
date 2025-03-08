'use client';

import { motion } from 'framer-motion';
import PricingTables from '../pricing/pricing-selection';

const PricingSection = () => {
    return (
        <section id='pricing' className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-4 text-4xl font-semibold'>
                Simple, Transparent Pricing
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='text-xl text-zinc-600 dark:text-zinc-400 mb-24'>
                No hidden fees. Cancel anytime.
            </motion.p>
            <PricingTables />
        </section>
    );
};

export default PricingSection;
