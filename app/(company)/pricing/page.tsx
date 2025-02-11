'use client';

import { useState } from 'react';
import ProTable from '@/components/website/pricing-page/pro-table';
import TermChanger from '@/components/website/pricing-page/term-changer';
import FeatureTable from '@/components/website/pricing-page/feature-table';
import FreeTable from '@/components/website/pricing-page/free-table';
import { ArrowDown } from 'lucide-react';
import { features } from '@/components/website/pricing-page/data/features';
import PremiumTable from '@/components/website/pricing-page/premium-table';
import PricingTables from '@/components/website/pricing-page/pricing';

const Pricing = () => {
    const [term, setTerm] = useState<'Monthly' | 'Yearly'>('Yearly');

    return (
        <div className='mx-auto flex min-h-screen w-[90%] flex-col items-center gap-12 py-8'>
            <h1 className='mt-16 text-center text-6xl font-medium'>Simple, Transparent Pricing.</h1>
            <h2 className='-mt-8 mb-8 text-3xl font-normal text-zinc-700'>No hidden fees. Cancel anytime.</h2>
            <PricingTables />

            {/* <div className='flex flex-col items-center'>
                <div className='text-lg'>Full Feature List</div>
                <ArrowDown />
            </div>

            <FeatureTable category={'Features'} features={features} /> */}
        </div>
    );
};

export default Pricing;
