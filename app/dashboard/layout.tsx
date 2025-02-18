import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('dashboard', {
    title: 'Dashboard',
    description: 'Personal Finance Dashboard',
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return children;
}
