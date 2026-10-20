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

        // Handle sending invitation email from admin dashboard
        if (body.action === 'send_invite' || body.type === 'invitation') {
            const { memberId, name, email } = body;

            if (!email) {
                return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
            }

            if (!TOKEN) {
                console.error("Mailtrap API Key is missing");
                return NextResponse.json({ error: 'Mail service configuration error (missing Mailtrap API key)' }, { status: 500 });
            }

            const firstName = name?.trim() ? name.trim().split(/\s+/)[0] : 'there';
            const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const whatsappLink = "https://chat.whatsapp.com/KnzTKRsau9vHd9EpzZ0pIq";

            const inviteHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FEB10 Scholarship: Your Growth Community invitation is here</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; color: #2d3748; margin: 0; padding: 0; background-color: #f7fafc; }
        .container { max-width: 600px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .header { background-color: #2e3b86; color: #ffffff; padding: 36px 32px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
        .header p { margin: 8px 0 0 0; color: #a3cc39; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 36px 32px; }
        .content p { font-size: 15px; margin-bottom: 20px; color: #374151; line-height: 1.7; }
        .highlight-box { background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 8px; margin: 28px 0; }
        .highlight-title { font-weight: 700; font-size: 16px; color: #15803d; margin-bottom: 8px; }
        .cta-container { text-align: center; margin: 32px 0 24px 0; }
        .cta-button { background-color: #25D366; color: #ffffff !important; padding: 16px 36px; text-decoration: none; border-radius: 50px; font-weight: 800; font-size: 15px; letter-spacing: 0.5px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35); }
        .footer { background-color: #f8fafc; padding: 24px 32px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Growth Community</h1>
        </div>
        <div class="content">
            <p style="font-size: 16px;">Hi ${formattedFirstName},</p>
            <p style="font-weight: 700; color: #1e293b; font-size: 17px; margin-bottom: 16px;">Remember the Growth Community?</p>
            <p>Earlier this year, you expressed interest in joining the Growth Community through The FEB10 Project Undergraduate Scholarship. Following the interest we received, you were selected to be part of the community. We’ve kept your place, and now that we’re ready to begin, we’re reaching out to welcome you in.</p>
            <p>Since then, we’ve taken the time to build and put the right things in place to make the Growth Community more than just another community. We wanted to build something solid, intentional, and valuable.</p>
            <p>That time is now over. We’re ready to kickstart the Growth Community.</p>
            <p>The Growth Community brings together ambitious people who are committed to becoming better, learning continuously, building meaningful connections, discovering new opportunities, and creating impact.</p>
            <p>You expressed interest in being part of this journey back in March. Now, it’s time to take the next step.</p>
            
            <div class="highlight-box">
                <div class="highlight-title">Join the Growth Community on WhatsApp</div>
                <div style="font-size: 14px; color: #166534; line-height: 1.6;">
                    This is where the community will begin to come together, receive updates, participate in activities, share ideas, and connect with one another.
                </div>
            </div>

            <div class="cta-container">
                <a href="${whatsappLink}" class="cta-button" target="_blank" rel="noopener noreferrer">
                    [JOIN THE GROWTH COMMUNITY]
                </a>
            </div>

            <p style="margin-top: 28px;">See you inside.</p>
            
            <p style="margin-bottom: 0;">
                Best regards,<br>
                <strong>The Growth Community Team</strong>
            </p>
        </div>
        <div class="footer">
            <p style="margin: 0 0 6px 0;">© ${new Date().getFullYear()} The FEB10 Project • Growth Community Initiative</p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">You received this email because you expressed interest during the scholarship application.</p>
        </div>
    </div>
</body>
</html>
            `;

            const inviteText = `Hi ${formattedFirstName},

Remember the Growth Community?

Earlier this year, you expressed interest in joining the Growth Community through The FEB10 Project Undergraduate Scholarship. Following the interest we received, you were selected to be part of the community. We’ve kept your place, and now that we’re ready to begin, we’re reaching out to welcome you in.

Since then, we’ve taken the time to build and put the right things in place to make the Growth Community more than just another community. We wanted to build something solid, intentional, and valuable.

That time is now over. We’re ready to kickstart the Growth Community.

The Growth Community brings together ambitious people who are committed to becoming better, learning continuously, building meaningful connections, discovering new opportunities, and creating impact.

You expressed interest in being part of this journey back in March. Now, it’s time to take the next step.

Join the Growth Community on WhatsApp
This is where the community will begin to come together, receive updates, participate in activities, share ideas, and connect with one another.

[JOIN THE GROWTH COMMUNITY]:
${whatsappLink}

See you inside.

Best regards,
The Growth Community Team`;

            await client.send({
                from: { email: SENDER_EMAIL, name: "The Growth Community" },
                to: [{ email }],
                subject: "FEB10 Scholarship: Your Growth Community invitation is here",
                text: inviteText,
                html: inviteHtml,
                category: "Growth Community Invitation",
            });

            if (memberId && adminDb) {
                try {
                    await adminDb.collection('growth_community_members').doc(memberId).set({
                        inviteSent: true,
                        inviteSentAt: new Date().toISOString(),
                    }, { merge: true });
                } catch (dbErr) {
                    console.error("Error updating member invite status in Firestore:", dbErr);
                }
            }

            return NextResponse.json({ success: true, message: 'Invitation email sent successfully' });
        }

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
