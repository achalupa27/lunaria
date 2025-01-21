'use client';
import Link from 'next/link';
import ProductDropdown from './product-dropdown';
import { products } from '../data';

const Products = () => {
    return (
        <div className='flex'>
            {Object.keys(products).map((category) => (
                <div key={category} className='group relative'>
                    <Link href={`/${category}`} className='flex h-8 cursor-pointer items-center justify-between space-x-2 rounded px-4 transition duration-200 group-hover:bg-stone-300 hover:bg-stone-300 dark:group-hover:bg-stone-700 hover:dark:bg-stone-700'>
                        <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                        <i className='fi fi-rr-angle-small-down' />
                    </Link>
                    <div className='invisible absolute bottom-0 h-3 w-full translate-y-full group-hover:visible'></div>
                    <div className='invisible fixed left-1/2 z-40 mt-2 w-max translate-y-[-10px] -translate-x-1/2 transform rounded opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                        <ProductDropdown category={category} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
