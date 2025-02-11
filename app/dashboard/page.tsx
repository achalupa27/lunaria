'use client';

import Activity from '@/components/application/activity';
import Sidebar from '@/features/side-bar';

const App = () => {
    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
