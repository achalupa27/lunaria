import Card from '@/components/ui/card';
import { motion } from 'framer-motion';

const SocialProofSection = () => {
    return (
        <section className='mt-24 flex flex-col items-center justify-center text-center'>
            <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='text-4xl font-semibold'>
                People who use Lunaria...
            </motion.div>
            <div className='mb-36 mt-12 flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex  flex-1 flex-col items-center justify-center'>
                    {/* <div className='absolute h-52 w-60 bg-orange-100 blur-xl dark:bg-[#99f5d1] dark:blur-3xl' /> */}
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-medium dark:text-[#99f5d1]'>73%</div>
                        <span className='pt-2 text-base text-zinc-700'>add another</span>
                        <span className='font-medium dark:text-[#99f5d1]'>income source</span>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex flex-1 flex-col items-center justify-center'>
                    {/* <div className='absolute h-52 w-60 bg-orange-100 blur-xl dark:bg-[#93c5fd] dark:blur-3xl' /> */}
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-medium dark:text-[#93c5fd]'>91%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span className='pt-2 text-base text-zinc-700'>see their</span>
                            <span className='font-medium dark:text-[#93c5fd]'>savings grow</span>
                        </div>
                    </Card>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex flex-1 flex-col items-center justify-center'>
                    {/* <div className='absolute h-52 w-60 bg-orange-100 blur-xl dark:bg-[#f7ebc0] dark:blur-3xl' /> */}
                    <Card className='z-10 flex w-60 flex-col items-center py-8 text-xl'>
                        <div className='text-6xl font-medium dark:text-[#f7ebc0]'>58%</div>
                        <div className='flex flex-col items-center text-xl'>
                            <span className='pt-2 text-base text-zinc-700'>improve their</span>
                            <span className='font-medium dark:text-[#f7ebc0]'>spending habits</span>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProofSection;
