import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import client from '../mongoClient';
import Activity from '../components/Activity';

const App = ({ makes, saves, spends }: any) => {
    const [screen, setScreen] = useState('Dashboard');

    return (
        <div className='flex h-screen w-screen dark:bg-secondary-dark'>
            <Sidebar screen={screen} setScreen={setScreen} />
            <Activity screen={screen} makes={makes} saves={saves} spends={spends} />
        </div>
    );
};

export async function getServerSideProps(context: any) {
    await client.connect();
    const db = client.db('moneyshield');

    const makeCollection = db.collection('make');
    const makeData = await makeCollection.find({}).toArray();

    const saveCollection = db.collection('save');
    const saveData = await saveCollection.find({}).toArray();

    const spendCollection = db.collection('spend');
    const spendData = await spendCollection.find({}).toArray();
    return {
        props: {
            makes: JSON.parse(JSON.stringify(makeData)),
            saves: JSON.parse(JSON.stringify(saveData)),
            spends: JSON.parse(JSON.stringify(spendData)),
        },
    };
}
export default App;
