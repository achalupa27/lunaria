import Link from 'next/link';
import Products from './products';
import { Button } from '@/components/ui/button';

const MiddleSection = () => {
    return (
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-x-4'>
            <Products />
            <Button asChild variant='ghost' className='text-base font-normal'>
                <Link href='/pricing'>Pricing</Link>
            </Button>
        </div>
    );
};

export default MiddleSection;
