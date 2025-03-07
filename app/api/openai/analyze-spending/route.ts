import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { spendingData } = body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor analyzing spending data. The data is provided in a CSV-like format with three sections:
                    1. SPENDING TRANSACTIONS: Individual purchases with date, cost, category, item, store, and necessity
                    2. BUDGETS: Category budgets with amount and period
                    3. RECURRING EXPENSES: Regular expenses with category, amount, name, and period
                    
                    Provide a comprehensive analysis focusing on:
                    - Spending patterns and trends
                    - Budget adherence and category overruns
                    - Impact of recurring expenses
                    - Recommendations for optimization
                    - Potential savings opportunities
                    
                    Keep the analysis concise but actionable.`,
                },
                {
                    role: 'user',
                    content: `Please analyze this financial data and provide recommendations:\n${spendingData}`,
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
