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
        <section className='my-24 flex flex-col items-center justify-center text-center'>
            <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='text-4xl font-semibold mb-12'>
                Our Users Get Better
            </motion.div>
            <div className='grid items-stretch gap-8 md:grid-cols-3'>
                {proofs.map((proof, index) => (
                    <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='flex h-full'>
                        <Card className='flex h-full flex-col py-12 w-60 items-center justify-center'>
                            <div className='text-4xl font-medium dark:text-[#99f5d1]'>{proof.title}</div>
                            <span className='pt-2 text-base text-zinc-700'>{proof.side}</span>
                            <span className='font-medium -mt-1 dark:text-[#99f5d1] text-lg'>{proof.description}</span>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SocialProofSection;
