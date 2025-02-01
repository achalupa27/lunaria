import { motion } from 'framer-motion';
import FreeTable from '../pricing-page/free-table';
import ProTable from '../pricing-page/pro-table';
import TermChanger from '../pricing-page/term-changer';
import { MONTHLY_BASIC, YEARLY_BASIC, MONTHLY_PROFESSIONAL, YEARLY_PROFESSIONAL, STRIPE_KEY } from '@/constants';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const PricingSection = () => {
    const [term, setTerm] = useState<'Monthly' | 'Yearly'>('Yearly');

    const priceMapping: any = {
        Basic: {
            Monthly: MONTHLY_BASIC,
            Yearly: YEARLY_BASIC,
        },
        Professional: {
            Monthly: MONTHLY_PROFESSIONAL,
            Yearly: YEARLY_PROFESSIONAL,
        },
    };

    const purchaseSubscription = async (level: string) => {
        const price = priceMapping[level]?.[term];
        if (!price) return;

        const stripe = await loadStripe(STRIPE_KEY);
        const { error }: any = await stripe?.redirectToCheckout({
            lineItems: [{ price, quantity: 1 }],
            mode: 'subscription',
            successUrl: 'https://www.placeholder.io/app',
            cancelUrl: 'https://www.placeholder.io/pricing',
        });

        if (error) console.error(error);
    };

    return (
        <section className='flex flex-col items-center justify-center py-24 text-center'>
            <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className='mb-6 text-4xl font-semibold'>
                Choose Your Plan
            </motion.h2>
            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} className='max-w-2xl text-lg text-zinc-500'>
                Flexible pricing plans designed to fit your needs and help you achieve financial success.
            </motion.p>
            <div className='mt-12'>
                <TermChanger term={term} setTerm={setTerm} />
            </div>
            <div className='mt-16 flex gap-20'>
                <FreeTable />
                <ProTable term={term} purchaseSubscription={purchaseSubscription} />
            </div>
        </section>
    );
};

export default PricingSection;
