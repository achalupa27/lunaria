import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('products', {
    title: 'Products',
    description: 'Explore our suite of financial management tools.',
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
