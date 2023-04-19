import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import client from '../mongoClient';
import Activity from '@/components/Activity';

const App = ({ receipts }: any) => {
    console.log(receipts);
    const [screen, setScreen] = useState('Dashboard');

    return (
        <div className='flex h-screen w-screen'>
            <Sidebar setScreen={setScreen} />
            <Activity screen={screen} receipts={receipts} />
        </div>
    );
};

export async function getServerSideProps(context: any) {
    await client.connect();
    const db = client.db('moneyshield');
    const collection = db.collection('receipts');
    const data = await collection.find({}).toArray();
    return {
        props: {
            receipts: JSON.parse(JSON.stringify(data)),
        },
    };
}
export default App;
