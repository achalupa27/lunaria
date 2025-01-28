import { Button } from '@/components/ui/button';
import { MONTHLY_BASIC_PRICE, YEARLY_BASIC_PRICE } from '@/constants';
import { basicFeatures } from '@/components/website/pricing-page/data/features-basic';
import Link from 'next/link';

type Props = {
    term: string;
    purchaseSubscription: any;
};

const BasicTable = ({ term, purchaseSubscription }: Props) => {
    const user = true;

    return (
        <div className='flex h-[32rem] w-[18rem] flex-col rounded-2xl border border-stone-50 bg-stone-100 p-1 shadow'>
            <div className='mx-auto mt-2 text-center'>
                <div className='text-2xl'>Basic</div>
                <div className='text-sm'>{`$${term === 'Monthly' ? MONTHLY_BASIC_PRICE : YEARLY_BASIC_PRICE} USD per month`}</div>
            </div>
            <div className='mt-2 grow'>
                {basicFeatures.map((feature, i) => (
                    <div key={i} className='flex items-center gap-3 px-4 text-sm leading-8'>
                        <i className='fi fi-rr-check'></i> <div>{feature.feature}</div>
                    </div>
                ))}
            </div>
            {user ? (
                <Button className='rounded-xl' onClick={() => purchaseSubscription('Basic')}>
                    Start Trial
                </Button>
            ) : (
                <Button asChild>
                    <Link className='rounded-xl' href='/register'>
                        Sign Up
                    </Link>
                </Button>
            )}
        </div>
    );
};

export default BasicTable;
