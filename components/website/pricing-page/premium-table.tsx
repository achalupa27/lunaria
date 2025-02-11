import { Button } from '@/components/ui/button';
import { MONTHLY_PREMIUM_PRICE, YEARLY_PREMIUM_PRICE } from '@/constants';
import {} from '@/components/website/pricing-page/data/features-professional';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { premiumFeatures } from './data/features-premium';

type Props = {
    term: string;
    purchaseSubscription: any;
};

const PremiumTable = ({ term, purchaseSubscription }: Props) => {
    const user = false;

    return (
        <div className='gold-gradient relative flex h-[36rem] w-[22rem] flex-col rounded-2xl border border-orange-200 p-1 dark:bg-black'>
            <div className='dark:gradient-bg absolute left-0 top-0 -z-10 flex h-[36rem] w-[22rem] flex-col rounded-2xl bg-orange-100 blur dark:bg-gradient-to-tr' />

            <div className='mx-auto mt-4 text-center'>
                <div className='text-4xl font-semibold'>Premium</div>
                <div className='text-lg'>{`$${term === 'Monthly' ? MONTHLY_PREMIUM_PRICE : YEARLY_PREMIUM_PRICE} per month`}</div>
                {/* {term === 'Yearly' && <div className='-mt-1 text-sm text-zinc-700'>Billed annually.</div>} */}
            </div>
            <div className='grow px-6 pt-4'>
                {premiumFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2 leading-8'>
                        <CheckCircle size={18} className='text-black' /> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {user ? (
                <Button className='rounded-b-xl py-5' onClick={() => purchaseSubscription('Professional')}>
                    Start Trial
                </Button>
            ) : (
                <Button asChild className='rounded-b-xl py-5'>
                    <Link href='/register'>Sign Up</Link>
                </Button>
            )}
        </div>
    );
};

export default PremiumTable;
