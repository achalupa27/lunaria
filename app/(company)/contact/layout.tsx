import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('contact', {
    title: 'Contact Us',
    description: "Get in touch with the Lunaria team. We're here to help with any questions or concerns.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
