import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ProductsHero = () => {
    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className='mb-6 text-5xl font-bold'>
                Discover the Future of Finance
            </motion.h1>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }} className='mb-8 max-w-2xl text-lg text-gray-500'>
                Our innovative product helps you track, manage, and grow your wealth effortlessly. Take control of your financial future today.
            </motion.p>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
                <Button size='lg' className='px-6 py-3 text-lg font-medium'>
                    Shop Now
                </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.9 }} className='mt-12'>
                <Image src='/product-hero.png' alt='Product Image' width={600} height={400} className='rounded-lg shadow-lg' />
            </motion.div>
        </section>
    );
};

export default ProductsHero;
