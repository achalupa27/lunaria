import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { savingsData } = body;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a financial advisor specializing in savings and debt management. Analyze the provided data and deliver actionable insights in these areas:
                    1. Savings growth and patterns
                    2. Debt management strategy
                    3. Net worth optimization
                    4. Top 2-3 specific recommendations
                    
                    Focus on practical advice that can be implemented immediately. Format your response with clear headings and bullet points where appropriate.`,
                },
                {
                    role: 'user',
                    content: `Here is my savings and debt data in CSV format. Please analyze it and provide personalized financial advice:
                    
                    ${savingsData}`,
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
