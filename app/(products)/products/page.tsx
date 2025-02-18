import DashboardSection from '@/components/website/products/dashboard-section';
import MakeSection from '@/components/website/products/make-section';
import ProductsHero from '@/components/website/products/products-hero';
import SaveSection from '@/components/website/products/save-section';
import SpendSection from '@/components/website/products/spend-section';
import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('products', {
    title: 'Our Products',
    description: "Explore Lunaria's suite of financial management tools designed to help you achieve your money goals.",
});

const Features = () => {
    return (
        <div className='mx-auto min-h-screen max-w-7xl space-y-20 pb-8 pt-32'>
            <ProductsHero />
            <DashboardSection />
            <MakeSection />
            <SaveSection />
            <SpendSection />
        </div>
    );
};

export default Features;
