'use client';
import Link from 'next/link';
import ProductDropdown from './product-dropdown';
import { products } from '../data';
import { Button } from '@/components/ui/button';

const Products = () => {
    return (
        <div className='flex'>
            {Object.keys(products).map((category) => (
                <div key={category} className='group relative'>
                    <Button asChild variant='ghost' className='text-base font-normal'>
                        <Link href={`/${category}`}>
                            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                            <i className='fi fi-rr-angle-small-down' />
                        </Link>
                    </Button>
                    <div className='invisible absolute bottom-0 h-3 w-full translate-y-full group-hover:visible'></div>
                    <div className='invisible fixed left-1/2 z-40 mt-2 w-max -translate-x-1/2 translate-y-[-10px] transform rounded opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                        <ProductDropdown category={category} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
