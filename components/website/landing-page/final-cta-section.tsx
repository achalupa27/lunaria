import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FinalCTASection = () => {
    return (
        <motion.section initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='dark:gradient-bg mb-16 flex flex-col items-center justify-center rounded-[2rem] bg-gradient-to-bl from-[#f4e1b2]/80 via-[#f2ca73]/80 to-[#f9d97c]/80 px-8 py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-4 text-4xl font-semibold text-black'>
                Take Control of Your Finances Today
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='mb-8 max-w-3xl text-lg text-zinc-800'>
                Join thousands of users who are already transforming their financial future with Lunaria.
            </motion.p>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
                <Button size='lg' className='mt-4 rounded-full dark:bg-black dark:text-white dark:hover:bg-zinc-900'>
                    Get Started Now
                </Button>
            </motion.div>
        </motion.section>
    );
};

export default FinalCTASection;
