import client from '@/mongoClient';
import { DeleteResult, ObjectId } from 'mongodb'; // Import the DeleteResult type
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await client.connect();

        const collection = client.db('lunaria').collection('save');

        const { id }: { id: string } = req.body;

        const result: DeleteResult = await collection.deleteOne(
            { _id: new ObjectId(id) } // Identify the document by its _id field
        );

        if (result.deletedCount === 1) {
            console.log(`Save with _id ${id} deleted`);
            res.status(200).json({ message: 'Save deleted' });
        } else {
            res.status(404).json({ message: 'Save not found or not deleted' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    } finally {
        await client.close();
    }
}
