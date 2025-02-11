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
        const { makes } = req.body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor analyzing income data. Provide clear, actionable recommendations based on the user's income sources and patterns.`,
                },
                {
                    role: 'user',
                    content: `Please analyze these income transactions and provide recommendations for income growth and diversification:
                    Income Transactions: ${JSON.stringify(makes)}`,
                },
            ],
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;
        return res.status(200).json({ analysis: response });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error analyzing income' });
    }
}
