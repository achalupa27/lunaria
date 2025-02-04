import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import ProTable from '@/components/website/pricing-page/pro-table';
import TermChanger from '@/components/website/pricing-page/term-changer';
import { MONTHLY_BASIC, MONTHLY_PROFESSIONAL, STRIPE_KEY, YEARLY_BASIC, YEARLY_PROFESSIONAL } from '@/constants';
import FeatureTable from '@/components/website/pricing-page/feature-table';
import FreeTable from '@/components/website/pricing-page/free-table';
import { ArrowDown } from 'lucide-react';
import { features } from '@/components/website/pricing-page/data/features';

const Pricing = () => {
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
        <div className='mx-auto flex min-h-screen w-[90%] flex-col items-center gap-12 py-8'>
            <h1 className='mt-8 text-center text-6xl'>Simple, transparent pricing.</h1>
            <h2 className='-mt-8 mb-8'>No credit card required. Cancel anytime.</h2>
            <TermChanger term={term} setTerm={setTerm} />
            <div className='mt-8 flex flex-wrap justify-center gap-20'>
                <FreeTable />
                <ProTable term={term} purchaseSubscription={purchaseSubscription} />
            </div>

            <div className='flex flex-col items-center'>
                <div className='text-lg'>Full Feature List</div>
                <ArrowDown />
            </div>

            <FeatureTable category={'Features'} features={features} />
        </div>
    );
};

export default Pricing;
