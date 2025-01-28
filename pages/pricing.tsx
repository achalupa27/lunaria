import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import BasicTable from '@/components/website/pricing-page/basic-table';
import ProTable from '@/components/website/pricing-page/pro-table';
import TermChanger from '@/components/website/pricing-page/term-changer';
import { MONTHLY_BASIC, MONTHLY_PROFESSIONAL, STRIPE_KEY, YEARLY_BASIC, YEARLY_PROFESSIONAL } from '@/constants';
import { bodyFeatures } from '@/components/website/pricing-page/data/body-features';
import { lifeFeatures } from '@/components/website/pricing-page/data/life-features';
import { mindFeatures } from '@/components/website/pricing-page/data/mind-features';
import { toolFeatures } from '@/components/website/pricing-page/data/tools-features';
import FeatureTable from '@/components/website/pricing-page/feature-table';

const Pricing = () => {
    const [term, setTerm] = useState<'Monthly' | 'Yearly'>('Yearly');

    const priceMapping = {
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
            <h1 className='mb-8 text-center'>Take the next step.</h1>
            <TermChanger term={term} setTerm={setTerm} />
            <div className='mt-8 flex flex-wrap justify-center gap-8'>
                <BasicTable term={term} purchaseSubscription={purchaseSubscription} />
                <ProTable term={term} purchaseSubscription={purchaseSubscription} />
            </div>

            <div className='flex flex-col items-center '>
                <div className='text-lg'>Full Feature List</div>
                <div>
                    <i className='fi fi-rr-arrow-down pt-1' />
                </div>
            </div>

            <FeatureTable category={'Life'} features={lifeFeatures} />
            <FeatureTable category={'Body'} features={bodyFeatures} />
            <FeatureTable category={'Mind'} features={mindFeatures} />
            <FeatureTable category={'Tools'} features={toolFeatures} />

            <div className='flex flex-col items-center justify-center px-6'>
                <p className='text-xl'>New features are always being added!</p>
                <p className='mt-1 text-center text-xs'>That means prices will go up! Subscribe to Professional Yearly to lock in the current price for your subscription year.</p>
            </div>
        </div>
    );
};

export default Pricing;
