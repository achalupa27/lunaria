import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '../../config';
import { ChevronDown } from 'lucide-react';
import ProductDropdown from './product-dropdown';

const MiddleSection = () => {
    return (
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-x-4'>
            {/* Products Dropdown Trigger */}
            {Object.keys(products).map((category) => (
                <div key={category} className='group relative'>
                    <Button asChild variant='ghost' className='text-base font-normal'>
                        <Link href={`/${category}`}>
                            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                            <ChevronDown />
                        </Link>
                    </Button>
                    <ProductDropdown category={category} />
                </div>
            ))}

            {/* Pricing Button */}
            <Button asChild variant='ghost' className='text-base font-normal'>
                <Link href='/pricing'>Pricing</Link>
            </Button>
        </div>
    );
};

export default MiddleSection;
