import React, { useState } from 'react';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Sidebar from '@/components/Sidebar';
import Activity from '@/components/Activity';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI as string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const App = (props: any) => {
    const { data } = props;
    const [screen, setScreen] = useState('Dashboard');

    return (
        <div className='h-screen w-screen'>
            <Sidebar setScreen={setScreen} />
            <Activity screen={screen} />
            {data.map((item: any) => (
                <p key={item._id}>{item.title}</p>
            ))}
        </div>
    );
};

export async function getServerSideProps(context: any) {
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('my-collection');
    const data = await collection.find({}).toArray();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
}

export default App;
