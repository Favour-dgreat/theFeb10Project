import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";
const ADMIN_EMAIL = "admin@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, gender, phone, interests } = body;

        if (!name || !email || !gender || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!TOKEN) {
            console.error("Mailtrap API Key is missing");
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 });
        }

        const htmlContent = `
            <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #2e3b86; color: white; padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #a3cc39;">Welcome to the Growth Community!</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">The journey begins here.</p>
                </div>
                <div style="padding: 40px; background-color: #ffffff;">
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        Hello <strong>${name}</strong>,
                    </p>
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        You’re officially part of a community built to help you learn, grow, network, and unlock opportunities. We are thrilled to have you with us.
                    </p>
                    <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                        The Growth Community is your launchpad for discovering purpose and maximizing potential. Get ready for updates, resources, and opportunities designed to support your personal and professional growth.
                    </p>
                    
                    <div style="background-color: #f8f9ff; padding: 25px; border-radius: 12px; border: 1px solid #eef0ff; margin-top: 30px;">
                        <h3 style="color: #2e3b86; margin-top: 0; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Profile Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">Email:</td>
                                <td style="padding: 8px 0; color: #2e3b86; font-weight: bold;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
                                <td style="padding: 8px 0; color: #2e3b86; font-weight: bold;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-size: 14px;">Interests:</td>
                                <td style="padding: 8px 0; color: #2e3b86; font-weight: bold;">${Array.isArray(interests) ? interests.join(', ') : interests || 'None'}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="margin-top: 40px; text-align: center;">
                        <a href="https://growthcommunity.thefeb10project.org/" style="background-color: #a3cc39; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Visit Our Website</a>
                    </div>
                </div>
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
                    <p style="margin: 0;">© ${new Date().getFullYear()} The FEB10 Project. Growth Community Initiative.</p>
                </div>
            </div>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Growth Community" },
            to: [{ email: email }], // Send to user
            bcc: [{ email: ADMIN_EMAIL }], // BCC Admin
            subject: `Welcome to the Growth Community, ${name}!`,
            html: htmlContent,
            category: "Growth Community Welcome",
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Growth Community API Error:", error);
        return NextResponse.json({ error: 'Failed to process membership' }, { status: 500 });
    }
}
