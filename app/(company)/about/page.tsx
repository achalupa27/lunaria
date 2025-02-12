'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32'>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='text-center'>
                    <h1 className='text-5xl font-bold text-zinc-900 sm:text-6xl tracking-tight'>Empowering Your Financial Journey</h1>
                    <p className='mt-6 text-xl text-zinc-600 max-w-2xl mx-auto'>Building a brighter financial future, one step at a time.</p>
                </motion.div>
            </div>

            {/* Our Story Section */}
            <div className='py-24'>
                <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h2 className=' text-center mb-12'>Our Story</h2>
                    <p className='text-lg text-zinc-600 mb-8 leading-relaxed'>Founded in 2023, we started with a simple mission: to make personal finance management accessible and stress-free for everyone. We recognized that many people struggle with financial planning and wanted to create a solution that combines powerful technology with intuitive design.</p>
                    <p className='text-lg text-zinc-600 leading-relaxed'>Today, we&apos;re proud to help thousands of users take control of their financial lives through smart budgeting, investing, and financial education.</p>
                </div>
            </div>

            {/* Core Values Section */}
            <div className='py-24'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h2 className='text-center mb-16'>Our Core Values</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                        {[
                            {
                                title: 'Security First',
                                description: 'Your trust is our foundation. We implement the highest security standards and treat your financial data with the utmost care and confidentiality.',
                            },
                            {
                                title: 'User-Centered Design',
                                description: 'Our platform is built around your needs, with intuitive interfaces and personalized experiences that adapt to your financial journey.',
                            },
                            {
                                title: 'Inclusive Finance',
                                description: "We're committed to making financial tools and knowledge accessible to everyone, regardless of their financial background or expertise.",
                            },
                        ].map((value, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} className='p-8 rounded-2xl hover:bg-zinc-50 transition-colors duration-300'>
                                <h3 className='text-xl font-semibold text-zinc-900 mb-4'>{value.title}</h3>
                                <p className='text-zinc-600'>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Indicators Section */}
            <div className='py-24'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h2 className='text-center mb-16'>Why Choose Us</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-12'>
                        {[
                            { stat: '100K+', label: 'Active Users' },
                            { stat: '256-bit', label: 'Encryption' },
                            { stat: '24/7', label: 'Support' },
                            { stat: '4.8/5', label: 'User Rating' },
                        ].map((item, index) => (
                            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className='text-center'>
                                <div className='text-4xl font-bold text-zinc-900'>{item.stat}</div>
                                <div className='text-zinc-600 mt-3'>{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ready? */}
            <div className='py-24'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h2 className=' text-center mb-16'>Ready to Join the Community?</h2>
                </div>
            </div>
        </div>
    );
};

export default About;
