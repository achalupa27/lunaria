'use client';

import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const proofs = [
    {
        title: '73%',
        side: 'add another',
        description: 'income source',
    },
    {
        title: '91%',
        side: 'see their',
        description: 'savings grow',
    },
    {
        title: '58%',
        side: 'improve their',
        description: 'spending habits',
    },
];

const SocialProofSection = () => {
    return (
        <section className='my-24 flex flex-col items-center justify-center text-center' aria-labelledby='stats-heading'>
            <motion.div id='stats-heading' initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='text-4xl font-semibold mb-12'>
                Our Users Get Better
            </motion.div>
            <div className='grid items-stretch gap-8 md:grid-cols-3' role='list' aria-label='User statistics'>
                {proofs.map((proof, index) => (
                    <motion.div key={index} role='listitem' aria-label={`${proof.title} of users ${proof.side} ${proof.description}`} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='flex h-full'>
                        <Card className='flex h-full flex-col py-12 w-60 items-center justify-center'>
                            <div className='text-4xl font-medium '>{proof.title}</div>
                            <span className='pt-2 text-base text-zinc-700 dark:text-zinc-300'>{proof.side}</span>
                            <span className='font-medium -mt-1 text-lg'>{proof.description}</span>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SocialProofSection;
