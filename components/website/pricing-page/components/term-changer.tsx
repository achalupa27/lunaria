import { CornerLeftDown, CornerRightDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    term: string;
    setTerm: Dispatch<SetStateAction<'Monthly' | 'Yearly'>>;
};

const TermChanger = ({ term, setTerm }: Props) => {
    return (
        <>
            <div className='relative flex w-72 sm:w-96 rounded-full border border-orange-50 bg-white p-[4px] shadow dark:bg-black' aria-label='Term Changer'>
                {/* Sliding Background */}
                <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-zinc-950 transition-transform duration-200 dark:bg-white ${term === 'Yearly' ? 'translate-x-full' : 'translate-x-0'}`}></div>

                {/* Monthly Option */}
                <button type='button' className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Monthly' ? 'text-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400'}`} onClick={() => setTerm('Monthly')}>
                    Monthly
                </button>

                {/* Yearly Option */}
                <button type='button' className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Yearly' ? 'text-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400'}`} onClick={() => setTerm('Yearly')}>
                    Yearly
                </button>
                <div className='absolute sm:-right-8 right-12 -top-12 mt-3 flex items-center justify-center space-x-1'>
                    <div className='lock sm:hidden relative -top-2 flex rounded-full bg-green-400 px-3 pt-[1px] text-sm font-bold text-zinc-900'>SAVE 20%</div>
                    <CornerRightDown className='block sm:hidden' strokeWidth={1} />
                    <CornerLeftDown className='hidden sm:block' strokeWidth={1} />
                    <div className='hidden sm:flex relative -top-2 rounded-full bg-green-400 px-3 pt-[1px] text-sm font-bold text-zinc-900'>SAVE 20%</div>
                </div>
            </div>
            <div className='mt-3 flex items-center justify-center'>
                <div className='whitespace-nowrap rounded-full bg-orange-100 px-5 py-1 text-center text-sm sm:text-base font-medium text-black'>
                    Get <span className='font-bold'>{term === 'Monthly' ? '0' : '72'} days free</span> on the {term} plan{term === 'Monthly' ? '.' : '!'}
                </div>
            </div>
        </>
    );
};

export default TermChanger;
