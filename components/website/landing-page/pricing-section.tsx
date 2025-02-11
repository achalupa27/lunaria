import { motion } from 'framer-motion';
import PricingTables from '../pricing-page/pricing';

const PricingSection = () => {
    return (
        <section id='pricing' className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-4 text-4xl font-semibold'>
                Simple, Transparent Pricing
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='text-xl text-zinc-700 mb-24'>
                No hidden fees. Cancel anytime.
            </motion.p>
            <PricingTables />
        </section>
    );
};

export default PricingSection;
