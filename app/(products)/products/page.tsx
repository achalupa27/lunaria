import DashboardSection from '@/components/website/products/dashboard-section';
import MakeSection from '@/components/website/products/make-section';
import ProductsHero from '@/components/website/products/products-hero';
import SaveSection from '@/components/website/products/save-section';
import SpendSection from '@/components/website/products/spend-section';

const Features = () => {
    const user = false;

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
