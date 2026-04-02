import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New message from Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result.messageId);

        return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error: any) {
        console.error("SMTP Error:", error);
        return res.status(500).json({ error: "Failed to send message.", details: error.message });
    }
}
