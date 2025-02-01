import Link from 'next/link';
import { companyPages, legalPages, productPages } from '@/constants';
import { Button } from '@/components/ui/button';

const Links = () => {
    return (
        <div className='flex flex-wrap space-x-12 [&>div]:w-32'>
            <div className='flex flex-col space-y-1 text-sm'>
                <Link href='/products' className='mb-1 px-1 text-base font-medium'>
                    Products
                </Link>
                {productPages.map((page) => (
                    <Button className='w-fit' size='sm' variant='link' asChild key={page.page}>
                        <Link href={`/${page.link}`}>{page.page}</Link>
                    </Button>
                ))}
            </div>
            <div className='flex flex-col space-y-1 text-sm'>
                <Link href='/company' className='mb-1 px-1 text-base font-medium'>
                    Company
                </Link>
                {companyPages.map((page) => (
                    <Button className='w-fit' size='sm' variant='link' asChild key={page.page}>
                        <Link href={`/${page.link}`}>{page.page}</Link>
                    </Button>
                ))}
            </div>
            <div className='flex flex-col space-y-1 text-sm'>
                <Link href='/legal' className='mb-1 px-1 text-base font-medium'>
                    Legal
                </Link>
                {legalPages.map((page) => (
                    <Button className='w-fit' size='sm' variant='link' asChild key={page.page}>
                        <Link href={`/${page.link}`}>{page.page}</Link>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Links;
