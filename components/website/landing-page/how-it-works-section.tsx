import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import Image from 'next/image';

const HowItWorksSection = () => {
    return (
        <section className='flex flex-col items-center justify-center'>
            <div className='text-3xl'>&quot;Whats gets measured gets improved.&quot;</div>
            <div className='text-zinc-700'>- Unknown</div>
            <h2 className='my-6 mt-20 text-4xl font-semibold'>How it Works</h2>
            <div className='flex gap-3'>
                <div className='flex flex-1 items-center justify-start rounded-xl border bg-white px-8 py-4 shadow'>
                    <div className='flex-1'>
                        <div className='text-2xl'>Spending</div>
                        <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Upwards but Backwards&quot;</div>
                        <div className='pt-1'>A necessary part of personal finance, spending will take your finances backwards, but your life forwards. The key is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                    </div>
                    <SpendIcon width={145} height={145} filled={true} />
                </div>
                <div className='flex flex-1 items-center justify-start rounded-xl border bg-white px-8 py-4 shadow'>
                    <MakeIcon width={145} height={145} filled={true} />
                    <div className='flex-1'>
                        <div className='text-2xl'>Making</div>
                        <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Upwards and Forward.&quot;</div>
                        <div className='pt-1'>Your entire finances depend on your income. While most traditional personal finance apps focus on tracking your spending, we prioritize tracking income.</div>
                    </div>
                </div>
            </div>
            <div className='mt-3 flex flex-col items-center justify-start rounded-xl border bg-white px-8 py-4 shadow'>
                <SaveIcon width={145} height={145} filled={true} />
                <div className='flex-1 text-center'>
                    <div className='text-2xl'>Saving</div>
                    <div className='-mt-[2px] text-zinc-700 dark:text-zinc-400'>&quot;Grounding.&quot;</div>
                    <div className='pt-1'>Your savings are your financial base.</div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
