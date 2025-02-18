import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('pricing', {
    title: 'Pricing',
    description: 'Flexible pricing plans for every financial journey. Choose the perfect plan to achieve your money goals.',
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
