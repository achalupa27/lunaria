import { Dispatch, SetStateAction } from 'react';

type Props = {
    term: string;
    setTerm: Dispatch<SetStateAction<'Monthly' | 'Yearly'>>;
};

const TermChanger = ({ term, setTerm }: Props) => {
    return (
        <div className='relative flex w-80 overflow-hidden rounded border border-stone-50 bg-stone-100 p-[4px] shadow'>
            {/* Sliding Background */}
            <div className={`absolute top-0 left-0 h-full w-1/2 rounded bg-white transition-transform duration-200 ${term === 'Yearly' ? 'translate-x-full' : 'translate-x-0'}`}></div>

            {/* Monthly Option */}
            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Monthly' ? 'text-black' : 'text-gray-500'}`} onClick={() => setTerm('Monthly')}>
                Monthly
            </div>

            {/* Yearly Option */}
            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-semibold transition duration-200 ${term === 'Yearly' ? 'text-black' : 'text-gray-500'}`} onClick={() => setTerm('Yearly')}>
                <p>Yearly</p>
                <div className='text-xs text-[#39c269]'>
                    <strong>SAVE 20%</strong>
                </div>
            </div>
        </div>
    );
};

export default TermChanger;
