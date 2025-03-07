'use client';

import Activity from '@/components/application/activity';
import Sidebar from '@/features/side-bar';

const App = () => {
    return (
        <div className='flex h-screen w-screen'>
            {process.env.NODE_ENV === 'development' && <div className='absolute top-0 left-0 w-full py-1 bg-black/50 text-white text-center text-sm'>Development Environment</div>}
            <Sidebar />
            <Activity />
        </div>
    );
};

export default App;
