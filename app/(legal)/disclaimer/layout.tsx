import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('disclaimer', {
    title: 'Disclaimer',
    description: "Important disclaimers and legal information about using Lunaria's services.",
});

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
