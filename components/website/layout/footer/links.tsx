import Link from 'next/link';
import { COMPANY_NAME, companyPages, legalPages, productPages } from '@/constants';
import { Button } from '@/components/ui/button';

const Links = () => {
    return (
        <div className='flex justify-center w-full items-center max-w-xl'>
            <div className='grid grid-cols-3 gap-3 lg:gap-12 mt-12 w-full'>
                <div className='flex flex-col space-y-1 text-sm items-center max-w-32'>
                    <Link href='/products' className='mb-1 text-base font-medium'>
                        Products
                    </Link>
                    {productPages.map((page) => (
                        <Button className='w-fit px-0' size='sm' variant='link' asChild key={page.page}>
                            <Link href={page.link}>{page.page}</Link>
                        </Button>
                    ))}
                </div>
                <div className='flex flex-col space-y-1 text-sm items-center'>
                    <Link href='/company' className='mb-1 text-base font-medium'>
                        Company
                    </Link>
                    {companyPages.map((page) => (
                        <Button className='w-fit px-0' size='sm' variant='link' asChild key={page.page}>
                            <Link href={page.link}>{page.page}</Link>
                        </Button>
                    ))}
                </div>
                <div className='flex flex-col space-y-1 text-sm items-center'>
                    <Link href='/legal' className='mb-1 text-base font-medium'>
                        Legal
                    </Link>
                    {legalPages.map((page) => (
                        <Button className='w-fit px-0' size='sm' variant='link' asChild key={page.page}>
                            <Link href={page.link}>{page.page}</Link>
                        </Button>
                    ))}
                </div>
                <div className='pl-3 pt-12 text-sm w-full text-center col-span-3'>
                    &copy; {new Date().getFullYear()} {COMPANY_NAME}
                </div>
            </div>
        </div>
    );
};

export default Links;
