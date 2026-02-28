import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "thegrowthcommunity@thefeb10project.org";
const ADMIN_EMAIL = "thegrowthcommunity@thefeb10project.org";
import { adminDb } from '@/lib/firebase';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, gender, phone, interests } = body;

        if (!name || !email || !gender || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        try {
            await adminDb.collection('growth_community_members').add({
                name,
                email,
                gender,
                phone,
                interests: interests || [],
                createdAt: new Date().toISOString(),
            });
        } catch (dbError) {
            console.error("Error saving to Firestore:", dbError);
            // Continue to send email even if DB save fails, or maybe we should error? 
            // Ideally we want both. But if DB fails, we probably want to know.
            // For now, logging it is safer than blocking the user if email works.
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
            <p style="font-size: 16px; margin-bottom: 24px;">We’re excited to officially welcome you to the Growth Community — a space created to help you learn, grow, connect, and unlock life-changing opportunities.</p>
            <p style="font-size: 16px; margin-bottom: 24px;">You’re now part of a community designed to serve as your launchpad for purpose discovery and maximum potential. Expect timely updates, valuable resources, and opportunities focused on your personal, academic, and professional growth.</p>
            
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

            <div style="margin-top: 50px; border-top: 2px solid #eeeeee; padding-top: 30px;">
                <h3 style="color: #2e3b86; margin-top: 0; font-size: 20px; margin-bottom: 15px;">Stay Connected — Don’t Miss Out</h3>
                <p style="font-size: 15px; line-height: 1.7; color: #555555; margin-bottom: 25px;">
                    To ensure you never miss important updates, opportunities, or announcements, we encourage you to follow and engage with us on our official platforms. Our social media channels are where we share timely updates, affiliate scholarship opportunities within our network, and other initiatives designed to support your academic and personal growth. Following us on social media helps you stay connected and ensures you don’t miss out on important scholarship and growth opportunities.
                </p>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://www.instagram.com/growthcommunity.space/" style="display: inline-block; margin: 10px; text-align: center; text-decoration: none; color: #333333;">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="48" height="48" alt="Instagram" style="display: block; margin: 0 auto 8px;">
                        <span style="font-weight: bold; font-size: 14px;">Instagram</span>
                    </a>
                    
                    <a href="https://www.linkedin.com/company/growth-community-global/" style="display: inline-block; margin: 10px; text-align: center; text-decoration: none; color: #333333;">
                         <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="48" height="48" alt="LinkedIn" style="display: block; margin: 0 auto 8px;">
                        <span style="font-weight: bold; font-size: 14px;">LinkedIn</span>
                    </a>
                    
                    <a href="https://www.facebook.com/profile.php?id=61585987801344" style="display: inline-block; margin: 10px; text-align: center; text-decoration: none; color: #333333;">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="48" height="48" alt="Facebook" style="display: block; margin: 0 auto 8px;">
                        <span style="font-weight: bold; font-size: 14px;">Facebook</span>
                    </a>
                </div>
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
