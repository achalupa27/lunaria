import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const SocialProofSection = () => {
    return (
        <section className='mt-24 flex flex-col items-center justify-center text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }}>
                People who use Lunaria...
            </motion.h2>
            <div className='mb-36 mt-12 flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute h-32 w-52 rounded-full bg-[#99f5d1] blur-3xl' />
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-semibold text-[#99f5d1]'>73%</div>
                        <span>add another</span>
                        <span className='font-semibold text-[#99f5d1]'>income source</span>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute h-32 w-52 rounded-full bg-[#93c5fd] blur-3xl' />
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-semibold text-[#93c5fd]'>91%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span>see their</span>
                            <span className='font-semibold text-[#93c5fd]'>savings grow</span>
                        </div>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute h-32 w-52 rounded-full bg-[#f7ebc0] blur-3xl' />
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-semibold text-[#f7ebc0]'>58%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span>improve their</span>
                            <span className='font-semibold text-[#f7ebc0]'>spending habits</span>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProofSection;
