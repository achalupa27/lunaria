import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { incomeData } = body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a personal finance advisor specializing in income analysis and optimization. Analyze the provided income data and deliver actionable insights in these areas:
                    1. Income stability and diversification
                    2. Growth trends and seasonal patterns
                    3. Source optimization opportunities
                    4. Top 2-3 actionable recommendations
                    
                    Be concise, specific, and practical. Format your response with clear headings for each section.`,
                },
                {
                    role: 'user',
                    content: `Here is my income data in CSV format. Please analyze it and provide personalized financial advice:
                    
                    ${incomeData}`,
                },
            ],
            temperature: 0.5,
        });

        const response = completion.choices[0].message.content;
        return NextResponse.json({ analysis: response });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
