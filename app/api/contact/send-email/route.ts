import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        // Get the request body
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Create a nodemailer transport object with your email service provider details
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'halupa27@gmail.com',
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });

        // Create a message object with the sender, recipient, subject, and body
        const mailMessage = {
            from: email,
            to: 'halupa27@gmail.com',
            subject: subject,
            text: `${message} --- ${email}, ${name}`,
        };

        // Send the email
        await transporter.sendMail(mailMessage);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
