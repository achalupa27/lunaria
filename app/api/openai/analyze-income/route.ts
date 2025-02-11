import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { incomes } = body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor analyzing income data. Provide clear, actionable recommendations based on the user's income patterns, focusing on opportunities for growth and optimization.`,
                },
                {
                    role: 'user',
                    content: `Please analyze these income transactions and provide recommendations for better financial management:
                    Income Transactions: ${JSON.stringify(incomes)}`,
                },
            ],
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;
        return NextResponse.json({ analysis: response });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
