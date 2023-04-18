import React from 'react';
import Dashboard from './Dashboard';
import Make from './Make';
import Save from './Save';
import Spend from './Spend';
import Settings from './Settings';

const Activity = ({ screen }: { screen: string }) => {
    if (screen === 'Dashboard') return <Dashboard />;
    else if (screen === 'Make') return <Make />;
    else if (screen === 'Save') return <Save />;
    else if (screen === 'Spend') return <Spend />;
    else if (screen === 'Settings') return <Settings />;

    return <div>Error</div>;
};

export default Activity;
