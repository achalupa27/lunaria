import PricingTables from '@/components/website/pricing-page/pricing-selection';

const Pricing = () => {
    return (
        <div className='mx-auto flex min-h-screen w-[90%] flex-col items-center gap-12 py-8'>
            <h1 className='mt-16 text-center sm:text-6xl text-5xl font-medium'>Simple, Transparent Pricing.</h1>
            <h2 className='-mt-8 mb-8 text-3xl font-normal text-zinc-700 dark:text-zinc-300 text-center'>No hidden fees. Cancel anytime.</h2>
            <PricingTables />
        </div>
    );
};

export default Pricing;
