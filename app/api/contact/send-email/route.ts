import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
    const { name, email, subject, message } = req.body;
    console.log('body: ', req.body);

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

    // Use the nodemailer transport object to send the email
    try {
        await transporter.sendMail(mailMessage);
        res.status(200).json({ success: true });
        console.log('email success');
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log('email fail: ', error.message);
    }
}
