import React, { useState } from 'react';
import Sidebar from '../components/Application/Sidebar';
import client from '../mongoClient';
import Activity from '../components/Application/Activity';
import { useAppDispatch } from '@/redux/hooks';
import { setMaking } from '@/redux/slices/makeSlice';
import { setSaving } from '@/redux/slices/saveSlice';
import { setSpending } from '@/redux/slices/spendSlice';

const App = ({ makes, saves, spends }: any) => {
    const dispatch = useAppDispatch();
    dispatch(setMaking(makes));
    dispatch(setSaving(saves));
    dispatch(setSpending(spends));

    return (
        <div className='flex h-screen w-screen bg-slate-50 dark:bg-slate-900'>
            <Sidebar />
            <Activity />
        </div>
    );
};

export async function getServerSideProps(context: any) {
    await client.connect();
    const db = client.db('lunaria');

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
