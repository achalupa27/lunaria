import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import Make from './Make/Make';
import Save from './Save/Save';
import Spend from './Spend/Spend';
import Settings from './Settings';

type Props = {
    screen: string;
    makes: any;
    saves: any;
    spends: any;
};

const Activity = ({ screen, makes, saves, spends }: Props) => {
    if (screen === 'Dashboard') return <Dashboard makes={makes} saves={saves} spends={spends} />;
    else if (screen === 'Make') return <Make makes={makes} />;
    else if (screen === 'Save') return <Save saves={saves} />;
    else if (screen === 'Spend') return <Spend spends={spends} />;
    else if (screen === 'Settings') return <Settings />;

    return <div>Error</div>;
};

export default Activity;
