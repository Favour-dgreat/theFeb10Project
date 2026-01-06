import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";
const ADMIN_EMAIL = "admin@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, gender, phone } = body;

        if (!name || !email || !gender || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!TOKEN) {
            console.error("Mailtrap API Key is missing");
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 });
        }

        const htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #2e3b86; color: white; padding: 30px; text-align: center;">
                    <h2 style="margin: 0; color: #a3cc39;">New Growth Community Member</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.8;">A new leader has joined the movement.</p>
                </div>
                <div style="padding: 40px;">
                    <div style="background-color: #f8f9ff; padding: 25px; border-radius: 12px; border: 1px solid #eef0ff;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px; width: 40%;">Full Name:</td>
                                <td style="padding: 10px 0; color: #2e3b86; font-weight: bold;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Email:</td>
                                <td style="padding: 10px 0; color: #2e3b86; font-weight: bold;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Gender:</td>
                                <td style="padding: 10px 0; color: #2e3b86; font-weight: bold;">${gender}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Phone Number:</td>
                                <td style="padding: 10px 0; color: #2e3b86; font-weight: bold;">${phone}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    <p>© ${new Date().getFullYear()} The FEB10 Project. Growth Community Initiative.</p>
                </div>
            </div>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Growth Community System" },
            to: [{ email: ADMIN_EMAIL }],
            subject: `New Membership Signup: ${name}`,
            html: htmlContent,
            category: "Growth Community Membership",
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Growth Community API Error:", error);
        return NextResponse.json({ error: 'Failed to process membership' }, { status: 500 });
    }
}
