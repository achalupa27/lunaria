const Sidebar = ({ screen, setScreen }: any) => {
    return (
        <div className='flex h-screen w-14 flex-col items-center justify-center space-y-4 bg-gray-100 py-2 dark:border-secondary/20 dark:bg-secondary-dark'>
            <div className='flex flex-1 flex-grow flex-col space-y-3'>
                <nav className={`sidebar-button ${screen === 'Dashboard' ? 'bg-white/20' : null}`} onClick={() => setScreen('Dashboard')}>
                    <i className='fi fi-rr-home'></i>
                </nav>
                <div className={`sidebar-button text-green-300 ${screen === 'Make' ? 'bg-white/20' : null}`} onClick={() => setScreen('Make')}>
                    <i className='fi fi-rr-money-check-edit'></i>
                </div>
                <div className={`sidebar-button text-blue-300 ${screen === 'Save' ? 'bg-white/20' : null}`} onClick={() => setScreen('Save')}>
                    <i className='fi fi-rr-bank'></i>
                </div>
                <div className={`sidebar-button text-yellow-200 ${screen === 'Spend' ? 'bg-white/20' : null}`} onClick={() => setScreen('Spend')}>
                    <i className='fi fi-rr-credit-card'></i>
                </div>
            </div>
            <div className='flex-col items-center space-y-3'>
                <div className={`sidebar-button ${screen === 'Settings' ? 'text-primary dark:text-primary-dark' : null}`} onClick={() => setScreen('Settings')}>
                    <i className='fi fi-rr-settings'></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
