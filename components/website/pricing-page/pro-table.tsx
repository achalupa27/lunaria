import { Button } from '@/components/ui/button';
import { MONTHLY_PROFESSIONAL_PRICE, YEARLY_PROFESSIONAL_PRICE } from '@/constants';
import { professionalFeatures } from '@/components/website/pricing-page/data/features-professional';
import Link from 'next/link';

type Props = {
    term: string;
    purchaseSubscription: any;
};

const ProTable = ({ term, purchaseSubscription }: Props) => {
    const user = false;

    return (
        <div className='flex h-[32rem] w-[18rem] flex-col rounded-2xl bg-white p-1 shadow'>
            <div className='mx-auto mt-2 text-center'>
                <div className='text-2xl font-bold'>Pro</div>
                <div className='text-sm'>{`$${term === 'Monthly' ? MONTHLY_PROFESSIONAL_PRICE : YEARLY_PROFESSIONAL_PRICE} USD per month`}</div>
            </div>
            <div className='mt-2 grow'>
                {professionalFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-3 px-4 text-sm leading-8'>
                        <i className='fi fi-rr-check'></i> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {user ? (
                <Button className='rounded-b-xl' onClick={() => purchaseSubscription('Professional')}>
                    Start Trial
                </Button>
            ) : (
                <Button asChild className='rounded-b-xl'>
                    <Link href='/register'>Sign Up</Link>
                </Button>
            )}
        </div>
    );
};

export default ProTable;
