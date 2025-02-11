'use client';

import Sidebar from '@/components/application/sidebar';
import Activity from '@/components/application/activity';

const App = () => {
    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
