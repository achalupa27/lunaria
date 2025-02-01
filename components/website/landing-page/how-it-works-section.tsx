import MakeIcon from '@/components/icons/make-icon';
import SaveIcon from '@/components/icons/save-icon';
import SpendIcon from '@/components/icons/spend-icon';
import Image from 'next/image';

const HowItWorksSection = () => {
    return (
        <section className='flex flex-col items-center justify-center'>
            <div className='pb-20 text-3xl'>&quot;Whats gets measured gets improved.&quot;</div>
            <div className='-mt-16 text-gray-600'>- Unknown</div>
            <div className='mt-16 flex w-[60%] items-center justify-start'>
                <div>
                    <MakeIcon width={140} height={145} />
                </div>
                <div className='flex-1'>
                    <div className='text-2xl'>Income</div>
                    <div className='-mt-[2px] text-gray-400'>&quot;Upwards and Forwards.&quot;</div>
                    <div className='pt-1'>While most traditional personal finance apps focus on tracking your spending, we prioritize tracking income.</div>
                </div>
            </div>
            <div className='flex w-[60%] items-center justify-start'>
                <div>
                    <SaveIcon width={140} height={145} />
                </div>
                <div className='flex-1'>
                    <div className='text-2xl'>Saving</div>
                    <div className='-mt-[2px] text-gray-400'>&quot;Grounding.&quot;</div>
                    <div className='pt-1'>Your savings are your financial base.</div>
                </div>
            </div>
            <div className='flex w-[60%] items-center justify-start'>
                <div>
                    <SpendIcon width={140} height={145} />
                </div>
                <div className='flex-1'>
                    <div className='text-2xl'>Spending</div>
                    <div className='-mt-[2px] text-gray-400'>&quot;Upwards but Backwards&quot;</div>
                    <div className='pt-1'>A necessary part of personal finance, spending will take your finances backwards, but your life forwards. The key is balance. Make sure you don&apos;t go backwards more than you go forwards.</div>
                </div>
            </div>
            <div className='my-36 flex rounded-xl border border-blue-900/20 text-gray-600'>
                <Image src='/lunaria-plant.png' alt='lunaria plant' width={200} height={200} className='rounded-xl' />
                <div className='flex flex-col px-8 py-4'>
                    <span className='text-4xl font-semibold italic'>Lunaria annua</span>
                    <span className='-mt-2'>• the money plant</span>
                    <span className='pt-14'>
                        Lunaria annua, often referred to as honesty, <br />
                        symbolizes that financial integrity brings real wealth.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
