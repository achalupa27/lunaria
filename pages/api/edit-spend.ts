import { ObjectId, UpdateResult } from 'mongodb'; // Import the UpdateResult type
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongoClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await client.connect();

        const collection = client.db('lunaria').collection('spend');

        const { id, updatedTransaction }: { id: string; updatedTransaction: Spend } = req.body;

        const result: UpdateResult = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedTransaction } // Use $set to specify the fields to update
        );

        if (result.modifiedCount === 1) {
            console.log(`Spend updated with _id: ${id}`);
            res.status(200).json({ message: 'Spend updated' });
        } else {
            res.status(404).json({ message: 'Spend not found or not updated' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    } finally {
        await client.close();
    }
}
