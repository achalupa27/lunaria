'use client';

import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import Card from '@/components/ui/card';

const HowItWorksSection = () => {
    return (
        <section className='flex flex-col items-center justify-center'>
            <h2 className='mb-4 mt-20 text-4xl font-semibold text-center'>A Simple Way to Think About Money</h2>
            <p className='max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 text-center mb-10'>Make - Save - Spend</p>
            <div className='flex flex-col gap-6 md:flex-row'>
                <Card className='mt-0 flex flex-1 flex-col-reverse items-center p-8 text-center dark:border dark:border-orange-50/10 dark:shadow-lg dark:shadow-orange-50/20 md:mt-6 md:flex-row md:text-start'>
                    <div className='flex-1'>
                        <div className='text-2xl'>Spending</div>
                        <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Upwards but Backwards</div>
                        <div className='pt-1'>The key to good spending habits is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                    </div>
                    <SpendIcon width={145} height={145} filled={true} />
                </Card>
                <Card className='mt-0 flex flex-1 flex-col items-center p-8 text-center dark:border dark:border-green-50/10 dark:shadow-lg dark:shadow-green-50/20 md:mt-6 md:flex-row md:text-start'>
                    <MakeIcon width={145} height={145} filled={true} />
                    <div className='flex-1'>
                        <div className='text-2xl'>Making</div>
                        <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Upwards and Forward.</div>
                        <div className='pt-1'>Your entire finances depend on your income. Making more money will make everything easier.</div>
                    </div>
                </Card>
            </div>
            <Card className='mt-6 flex w-full flex-1 flex-col items-center p-8 pt-4 text-center dark:border dark:border-blue-50/10 dark:shadow-lg dark:shadow-blue-50/20'>
                <SaveIcon width={145} height={145} filled={true} />
                <div className='flex-1 text-center'>
                    <div className='text-2xl'>Saving</div>
                    <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Grounding.</div>
                    <div className='pt-1'>Your savings are your financial base.</div>
                </div>
            </Card>
        </section>
    );
};

export default HowItWorksSection;
