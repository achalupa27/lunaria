import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { spends } = req.body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor analyzing spending data. Provide clear, actionable recommendations based on the user's spending patterns, focusing on areas of improvement and potential savings opportunities.`,
                },
                {
                    role: 'user',
                    content: `Please analyze these spending transactions and provide recommendations for better financial management:
                    Spending Transactions: ${JSON.stringify(spends)}`,
                },
            ],
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;
        return res.status(200).json({ analysis: response });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error analyzing spending' });
    }
}
