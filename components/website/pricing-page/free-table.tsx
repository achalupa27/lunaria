import { Button } from '@/components/ui/button';
import { freeFeatures } from '@/components/website/pricing-page/data/features-free';
import Link from 'next/link';

const FreeTable = () => {
    const user = false;

    return (
        <div className='flex h-[32rem] w-[18rem] flex-col rounded-2xl  bg-white p-1 shadow'>
            <div className='mx-auto mt-2 text-center'>
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
                <Button asChild className='rounded-b-xl'>
                    <Link href='/app'>Go to Dashboard</Link>
                </Button>
            ) : (
                <Button asChild className='rounded-b-xl'>
                    <Link href='/authenticate'>Sign Up</Link>
                </Button>
            )}
        </div>
    );
};

export default FreeTable;
