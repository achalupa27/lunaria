import { CornerLeftDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    term: string;
    setTerm: Dispatch<SetStateAction<'Monthly' | 'Yearly'>>;
};

const TermChanger = ({ term, setTerm }: Props) => {
    return (
        <div>
            <div className='relative flex w-96 rounded-full border border-orange-50 bg-white p-[4px] shadow dark:bg-black'>
                {/* Sliding Background */}
                <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-zinc-950 transition-transform duration-200 dark:bg-white ${term === 'Yearly' ? 'translate-x-full' : 'translate-x-0'}`}></div>

                {/* Monthly Option */}
                <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Monthly' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Monthly')}>
                    Monthly
                </div>

                {/* Yearly Option */}
                <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Yearly' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Yearly')}>
                    <p>Yearly</p>
                </div>
                <div className='absolute -right-8 -top-12 mt-3 flex items-center justify-center space-x-1'>
                    <CornerLeftDown strokeWidth={1} />
                    <div className='relative -top-2 flex rounded-full bg-green-400 px-3 pt-[1px] text-sm font-bold text-zinc-900'>SAVE 20%</div>
                </div>
            </div>
            <div className='mt-3 flex items-center justify-center'>
                <div className='w-[333px] rounded-full bg-orange-100 px-6 py-1 text-center font-semibold text-black'>
                    Get <span className='font-bold'>{term === 'Monthly' ? '0' : '72'} days free</span> on the {term} plan{term === 'Monthly' ? '.' : '!'}
                </div>
            </div>
        </div>
    );
};

export default TermChanger;
