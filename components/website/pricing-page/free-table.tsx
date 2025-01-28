import { freeFeatures } from '@/components/website/pricing-page/data/features-free';
import Link from 'next/link';

const FreeTable = () => {
    const user = false;

    return (
        <div className='flex h-[32rem] w-[18rem] flex-col rounded border p-1'>
            <div className='px-2 py-1'>
                <div className='text-2xl'>Free</div>
                <div className='text-sm'>No Credit Card required.</div>
            </div>
            <div className='grow'>
                {freeFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-3 px-2 text-sm leading-8'>
                        <i className='fi fi-rr-check'></i> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {user ? (
                <Link className='button-secondary' href='/app'>
                    Go to Dashboard
                </Link>
            ) : (
                <Link className='button-secondary w-full' href='/authenticate'>
                    Sign Up
                </Link>
            )}
        </div>
    );
};

export default FreeTable;
