import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { adminDb } from '@/lib/firebase-admin';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "thegrowthcommunity@thefeb10project.org";

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
        }

        if (!TOKEN) {
            console.error("Mailtrap API Key is missing");
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 });
        }

        const welcomeHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to the Growth Community!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2e3b86; color: #fff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #a3cc39;">Welcome to the Growth Community!</h1>
        </div>
        <div style="padding: 30px;">
            <p>Hello <strong>${name}</strong>,</p>
            <p>We’re excited to officially welcome you to the Growth Community — a space created to help you learn, grow, connect, and unlock life-changing opportunities.</p>
        </div>
    </div>
</body>
</html>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Growth Community" },
            to: [{ email: email }],
            subject: `Welcome to the Growth Community, ${name}!`,
            html: welcomeHtml,
            category: "Growth Community Welcome",
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Growth Community API Error:", error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
