'use client';

import Link from 'next/link';

type Props = {
    requiredRole: 'free' | 'pro' | 'premium';
    userRole: 'premium' | 'pro' | 'free' | undefined;
    children: React.ReactNode;
};

export default function ProtectedFeature({ requiredRole, userRole, children }: Props) {
    const roles = {
        free: 0,
        pro: 1,
        premium: 2,
    };

    if (!userRole || roles[userRole as keyof typeof roles] < roles[requiredRole]) {
        return (
            <div className='p-4 text-center'>
                <p>This feature requires a {requiredRole} subscription</p>
                <Link href='/pricing'>Upgrade your plan</Link>
            </div>
        );
    }

    return <>{children}</>;
}
