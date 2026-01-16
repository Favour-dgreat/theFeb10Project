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
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Welcome to the Growth Community!</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background-color: #2e3b86; color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; color: #a3cc39; }
        .content { padding: 40px; }
        .data-box { background-color: #f8f9ff; padding: 25px; border-radius: 12px; border: 1px solid #eef0ff; margin-top: 30px; }
        .button { background-color: #a3cc39; color: #000000 !important; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; text-align: center; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; }
        
        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .header { background-color: #1a237e !important; }
            .header h1 { color: #a3cc39 !important; }
            .data-box { background-color: #2c2c2c !important; border-color: #444444 !important; color: #eeeeee !important; }
            .data-box h3 { color: #a3cc39 !important; }
            .data-box td { color: #bbbbbb !important; }
            .data-box td[style*="font-weight: bold"] { color: #a3cc39 !important; }
            .button { background-color: #a3cc39 !important; color: #000000 !important; }
            .footer { background-color: #121212 !important; color: #888888 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to the Growth Community!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">The journey begins here.</p>
        </div>
        <div class="content">
            <p style="font-size: 16px; margin-bottom: 24px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; margin-bottom: 24px;">You’re officially part of a community built to help you learn, grow, network, and unlock opportunities. We are thrilled to have you with us.</p>
            <p style="font-size: 16px; margin-bottom: 24px;">The Growth Community is your launchpad for discovering purpose and maximizing potential. Get ready for updates, resources, and opportunities designed to support your personal and professional growth.</p>
            
            <div class="data-box">
                <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Profile Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-size: 14px; width: 40%;">Email:</td>
                        <td style="padding: 8px 0; font-weight: bold;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 14px;">Phone:</td>
                        <td style="padding: 8px 0; font-weight: bold;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 14px;">Interests:</td>
                        <td style="padding: 8px 0; font-weight: bold;">${Array.isArray(interests) ? interests.join(', ') : interests || 'None'}</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <a href="https://growthcommunity.thefeb10project.org/" class="button" style="background-color: #a3cc39; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Visit Our Website</a>
            </div>
        </div>
        <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} The FEB10 Project. Growth Community Initiative.</p>
        </div>
    </div>
</body>
</html>
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
