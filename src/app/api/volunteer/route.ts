import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";
const ADMIN_EMAIL = "admin@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, gender } = body;

        if (!name || !email || !gender) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2e3b86; color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0;">New Volunteer Signup</h2>
                </div>
                <div style="padding: 30px;">
                    <p>A new volunteer has just signed up through the website.</p>
                    <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Gender:</strong> ${gender}</p>
                        <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
                    </div>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>© ${new Date().getFullYear()} The FEB10 Project. All rights reserved.</p>
                </div>
            </div>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Volunteer System" },
            to: [{ email: ADMIN_EMAIL }],
            subject: `New Volunteer Inquiry: ${name}`,
            html: htmlContent,
            category: "Volunteer Signup",
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Volunteer API Error:", error);
        return NextResponse.json({ error: 'Failed to process volunteer application' }, { status: 500 });
    }
}
