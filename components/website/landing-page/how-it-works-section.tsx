import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import Card from '@/components/ui/card';

const HowItWorksSection = () => {
    return (
        <section className='flex flex-col items-center justify-center'>
            <h2 className='my-3 mt-20 text-4xl font-semibold'>How it Works</h2>
            <div className='mb-12 text-center text-xl'>&quot;Whats gets measured gets improved.&quot;</div>
            <div className='flex flex-col gap-6 md:flex-row'>
                <Card className='mt-0 flex flex-1 flex-col-reverse items-center border-2 border-orange-50 p-8 text-center shadow-lg shadow-orange-50 dark:border dark:border-orange-50/10 dark:shadow-orange-50/20 md:mt-6 md:flex-row md:text-start'>
                    <div className='flex-1'>
                        <div className='text-2xl'>Spending</div>
                        <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Upwards but Backwards&quot;</div>
                        <div className='pt-1'>The key to good spending habits is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                    </div>
                    <SpendIcon width={145} height={145} filled={true} />
                </Card>
                <Card className='mt-0 flex flex-1 flex-col items-center border-2 border-green-50 p-8 text-center shadow-lg shadow-green-50 dark:border dark:border-green-50/10 dark:shadow-green-50/20 md:mt-6 md:flex-row md:text-start'>
                    <MakeIcon width={145} height={145} filled={true} />
                    <div className='flex-1'>
                        <div className='text-2xl'>Making</div>
                        <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Upwards and Forward.&quot;</div>
                        <div className='pt-1'>Your entire finances depend on your income. Making more money will make everything easier.</div>
                    </div>
                </Card>
            </div>
            <Card className='mt-6 flex w-full flex-1 flex-col items-center border-2 border-blue-50 p-8 pt-4 text-center shadow-lg shadow-blue-50 dark:border dark:border-blue-50/10 dark:shadow-blue-50/20'>
                <SaveIcon width={145} height={145} filled={true} />
                <div className='flex-1 text-center'>
                    <div className='text-2xl'>Saving</div>
                    <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Grounding.&quot;</div>
                    <div className='pt-1'>Your savings are your financial base.</div>
                </div>
            </Card>
        </section>
    );
};

export default HowItWorksSection;
