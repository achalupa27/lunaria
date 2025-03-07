'use client';

import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import Card from '@/components/ui/card';

const HowItWorksSection = () => {
    return (
        <section className='flex flex-col items-center justify-center my-24'>
            <h2 className='mb-4 mt-20 text-4xl font-semibold text-center '>A Simple Way to Think About Money</h2>
            <p className='max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 text-center mb-10'>Make &rarr; Save &rarr; Spend</p>
            <div className='md:border md:border-orange-100 md:dark:border-orange-200 md:rounded-xl md:shadow md:dark:bg-zinc-910 md:dark:shadow-orange-300/10 md:dark:shadow-lg px-8 md:bg-white'>
                <div className='flex flex-col gap-6 md:flex-row md:gap-0'>
                    <Card className='mt-0 flex flex-1 flex-col-reverse items-center p-8 text-center md:mt-6 md:flex-row md:text-start md:border-none md:shadow-none md:bg-transparent md:dark:shadow-none md:dark:bg-none'>
                        <div className='flex-1'>
                            <div className='text-2xl'>Spend</div>
                            <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Upwards but Backwards</div>
                            <div className='pt-1'>The key to good spending habits is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                        </div>
                        <SpendIcon width={145} height={145} filled={true} fillColor='fill-[#f7ebc0]' />
                    </Card>
                    <Card className='mt-0 flex flex-1 flex-col items-center p-8 text-center md:mt-6 md:flex-row md:text-start md:border-none md:shadow-none md:bg-transparent md:dark:shadow-none md:dark:bg-none'>
                        <MakeIcon width={145} height={145} filled={true} fillColor='fill-[#99f5d1]' />
                        <div className='flex-1'>
                            <div className='text-2xl'>Make</div>
                            <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Upwards and Forward.</div>
                            <div className='pt-1'>Your entire finances depend on your income. Making more money will make everything move.</div>
                        </div>
                    </Card>
                </div>
                <Card className='mt-6 md:mt-0 md:mb-6 md:dark:shadow-none flex w-full flex-1 flex-col items-center p-8 pt-4 text-center md:border-none md:shadow-none md:bg-transparent md:dark:bg-none'>
                    <SaveIcon width={145} height={145} filled={true} fillColor='fill-[#93c5fd]' />
                    <div className='flex-1 text-center'>
                        <div className='text-2xl'>Save</div>
                        <div className='-mt-[2px] text-zinc-600 dark:text-zinc-400 text-sm'>Grounding.</div>
                        <div className='pt-1 max-w-sm'>Your savings are your financial base. The bigger your savings, the more stable you will feel.</div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default HowItWorksSection;
