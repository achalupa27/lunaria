import { motion } from 'framer-motion';

const SocialProofSection = () => {
    return (
        <section className='flex flex-col items-center justify-center text-center'>
            <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='text-3xl font-medium'>
                People who use lunaria...
            </motion.div>
            <div className='mb-36 mt-12 flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#99f5d1]'>73%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>add another</span>
                        <span className='font-semibold text-[#99f5d1]'>income source</span>
                    </div>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#93c5fd]'>91%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>see their</span>
                        <span className='font-semibold text-[#93c5fd]'>savings grow</span>
                    </div>
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className='relative flex h-60 w-80 flex-col items-center justify-center'>
                    <div className='absolute top-14 h-20 w-20 rounded-full bg-[#99f5d1] blur-3xl ' />
                    <div className='text-6xl font-semibold text-[#f7ebc0]'>58%</div>
                    <div className='flex flex-col items-center text-xl'>
                        <span>improve their</span>
                        <span className='font-semibold text-[#f7ebc0]'>spending habits</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProofSection;
