import { Dispatch, SetStateAction } from 'react';

type Props = {
    term: string;
    setTerm: Dispatch<SetStateAction<'Monthly' | 'Yearly'>>;
};

const TermChanger = ({ term, setTerm }: Props) => {
    return (
        <div className='relative flex w-96 overflow-hidden rounded-full border border-orange-50 bg-white p-[4px] shadow dark:bg-black'>
            {/* Sliding Background */}
            <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-zinc-950 transition-transform  duration-200 dark:bg-white ${term === 'Yearly' ? 'translate-x-full' : 'translate-x-0'}`}></div>

            {/* Monthly Option */}
            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Monthly' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Monthly')}>
                Monthly
            </div>

            {/* Yearly Option */}
            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Yearly' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Yearly')}>
                <p>Yearly</p>
                <div className='text-sm text-green-500'>
                    <strong>SAVE 20%</strong>
                </div>
            </div>
        </div>
    );
};

export default TermChanger;
