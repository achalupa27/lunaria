import { Button } from '@/components/ui/button';
import { freeFeatures } from '@/components/website/pricing-page/data/features-free';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const FreeTable = () => {
    const user = false;

    return (
        <div className='flex h-[32rem] w-[18rem] flex-col rounded-2xl bg-white p-1 shadow dark:bg-black'>
            <div className='mx-auto mt-4 text-center'>
                <div className='text-2xl'>Free</div>
                <div className='text-sm'>No Credit Card required.</div>
            </div>
            <div className='grow px-6 pt-4'>
                {freeFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2 text-sm leading-8'>
                        <CheckCircle size={16} className='text-green-500' /> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {user ? (
                <Button asChild className='rounded-b-xl py-5'>
                    <Link href='/app'>Go to Dashboard</Link>
                </Button>
            ) : (
                <Button asChild className='rounded-b-xl py-5'>
                    <Link href='/authenticate'>Sign Up</Link>
                </Button>
            )}
        </div>
    );
};

export default FreeTable;
