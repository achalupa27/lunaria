import { InsertOneResult } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await client.connect();

        const collection = client.db('lunaria').collection('save');

        const document: Save = req.body;
        const result: InsertOneResult<Save> = await collection.insertOne(document as any);

        console.log(`Save inserted with _id: ${result.insertedId}`);
        res.status(200).json({ message: 'Save inserted', insertedId: result.insertedId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    } finally {
        await client.close();
    }
}
