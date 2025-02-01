import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FinalCTASection = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Take Control of Your Finances Today
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='mb-8 max-w-2xl text-lg text-zinc-500'>
                Join thousands of users who are already transforming their financial future with Lunaria.
            </motion.p>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
                <Button size='lg' className='px-6 py-3 text-lg font-medium'>
                    Get Started Now
                </Button>
            </motion.div>
        </section>
    );
};

export default FinalCTASection;
