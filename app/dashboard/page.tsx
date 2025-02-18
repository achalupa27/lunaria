'use client';

import Activity from '@/components/application/activity';
import Sidebar from '@/features/side-bar';
import { getPageMetadata } from '@/app/metadata.config';

export const metadata = getPageMetadata('dashboard', {
    title: 'Dashboard',
    description: 'Personal Finance Dashboard',
});

const App = () => {
    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
