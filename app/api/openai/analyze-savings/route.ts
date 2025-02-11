import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { saves, savingsAccounts, debtAccounts } = body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor analyzing savings and debt data. Provide clear, actionable recommendations based on the user's financial situation.`,
                },
                {
                    role: 'user',
                    content: `Please analyze these financial accounts and transactions and provide recommendations:
                    Savings Accounts: ${JSON.stringify(savingsAccounts)}
                    Debt Accounts: ${JSON.stringify(debtAccounts)}
                    Savings Transactions: ${JSON.stringify(saves)}`,
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
