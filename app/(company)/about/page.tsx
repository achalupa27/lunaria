'use client';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Users, Lock, MessageCircle, Star, Earth } from 'lucide-react';
import Link from 'next/link';

const coreValues = [
    {
        title: 'Inclusive Finance',
        description: "We're committed to making financial tools and knowledge accessible to everyone, regardless of their financial background or expertise.",
        icon: Earth,
    },
    {
        title: 'Security First',
        description: 'Your trust is our foundation. We implement the highest security standards and treat your financial data with the utmost care and confidentiality.',
        icon: ShieldCheck,
    },
    {
        title: 'Designed for You',
        description: 'Our platform is built around your needs, with intuitive interfaces and personalized experiences that adapt to your financial journey.',
        icon: User,
    },
];

const choices = [
    { stat: '100K+', label: 'Active Users', icon: Users },
    { stat: '256-bit', label: 'Encryption', icon: Lock },
    { stat: '24/7', label: 'Support', icon: MessageCircle },
    { stat: '4.8/5', label: 'User Rating', icon: Star },
];

const About = () => {
    return (
        <article>
            {/* Hero Section */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='mt-24 text-center max-w-7xl lg:px-8 py-32 pb-24'>
                <h1 className='text-4xl font-medium sm:text-6xl tracking-tight text-center'>Empowering Your Financial Journey</h1>
                <p className='mt-6 text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto'>Building a brighter financial future, one step at a time.</p>
            </motion.section>

            {/* Our Story Section */}
            <motion.section initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
                <h2 className='text-center mb-12'>Our Story</h2>
                <p className='text-lg text-zinc-700 dark:text-zinc-300 mb-8 leading-relaxed'>Founded in 2023, we started with a simple mission: to make personal finance management accessible and stress-free for everyone. We recognized that many people struggle with financial planning and wanted to create a solution that combines powerful technology with intuitive design.</p>
                <p className='text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed'>Today, we&apos;re proud to help thousands of users take control of their financial lives through smart budgeting, investing, and financial education.</p>
            </motion.section>

            {/* Core Values Section */}
            <motion.section initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
                <h2 className='text-center mb-16'>Our Core Values</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12'>
                    {coreValues.map((value, index) => (
                        <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='h-full'>
                            <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                                <value.icon className='w-8 h-8 mb-4' />
                                <h3 className='text-xl font-semibold mb-4 text-center'>{value.title}</h3>
                                <p className='text-zinc-700 dark:text-zinc-300 text-center'>{value.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Trust Indicators Section */}
            <motion.section initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className='py-24'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h2 className='text-center mb-16'>Why Choose Us</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {choices.map((item, index) => (
                            <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: index * 0.2 }} viewport={{ once: true }} className='h-full'>
                                <Card className='flex h-full flex-col py-12 w-full items-center justify-center'>
                                    <item.icon className='w-8 h-8 mx-auto mb-4' />
                                    <div className='text-3xl sm:text-4xl font-bold mb-2'>{item.stat}</div>
                                    <div className='text-zinc-700 dark:text-zinc-300'>{item.label}</div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Ready? */}
            <motion.section initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24'>
                <h2 className='text-center'>Want to Join the Community?</h2>
                <div className='flex justify-center mt-16'>
                    <Button asChild size='lg' className='rounded-full text-lg py-6'>
                        <Link href='/pricing'>Get Started Now</Link>
                    </Button>
                </div>
            </motion.section>
        </article>
    );
};

export default About;
