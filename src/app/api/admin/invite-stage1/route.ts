import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const { applicationId } = await req.json();

        if (!applicationId) return NextResponse.json({ error: 'Application ID required' }, { status: 400 });

        // Fetch User params
        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, where('applicationId', '==', applicationId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

        const docSnapshot = querySnapshot.docs[0];
        const { firstName, surname, email } = docSnapshot.data();

        // Construct Stage 1 Link
        const stage1Url = new URL("https://www.thefeb10project.org/application/stage1");
        stage1Url.searchParams.append("applicationId", applicationId);
        stage1Url.searchParams.append("email", email);
        stage1Url.searchParams.append("firstName", firstName);
        stage1Url.searchParams.append("surname", surname);

        const stage1Link = stage1Url.toString();

        // Email Content
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Ready to Begin Your FEB10 Journey?</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; }
        .content { padding: 40px 30px; }
        .cta-box { margin: 30px 0; padding: 25px; background-color: #f0f2ff; border-left: 5px solid #1a237e; border-radius: 0 8px 8px 0; }
        .button { display: inline-block; padding: 16px 32px; background-color: #1a237e; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; text-align: center; }
        .footer { padding: 20px; background-color: #f8f9fa; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }
        h2 { color: #1a237e; margin-top: 0; }
        h3 { color: #1a237e; margin-top: 0; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .cta-box { background-color: #2c2c2c !important; border-left-color: #FFD700 !important; }
            .button { background-color: #FFD700 !important; color: #000000 !important; }
            h2, h3 { color: #FFD700 !important; }
            .footer { background-color: #121212 !important; border-top-color: #333333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>Ready to Begin Your FEB10 Journey?</h2>
            <p>Dear ${firstName},</p>
            <p>You recently enrolled for The FEB10 Project Scholarship, but it looks like you haven't started your Stage 1 application yet.</p>
            <p>Stage 1 is the most critical part of the selection process. It includes your personal details, academic information, and your scholarship essay.</p>
            
            <div class="cta-box">
                <h3>Your Next Step:</h3>
                <p>Click the button below to watch the orientation video and access the Stage 1 form.</p>
                <a href="${stage1Link}" class="button" style="display: inline-block; padding: 16px 32px; background-color: #1a237e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; text-align: center;">
                    START STAGE 1 APPLICATION
                </a>
            </div>

            <p>If you have any questions, feel free to reply to this email or contact support@thefeb10project.org.</p>
            <p>Best regards,<br>The FEB10 Team</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} The FEB10 Project. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        // Send Email
        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Project" },
            to: [{ email }],
            subject: "Take the Next Step: Your FEB10 Stage 1 Application",
            html: htmlContent,
            category: "Stage 1 Invitation",
        });

        // Update DB Status or track invitation
        await updateDoc(docSnapshot.ref, {
            status: "STAGE_1_INVITED", // Update status to reflect invitation
            stage1InvitedAt: new Date().toISOString()
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to invite user to Stage 1' }, { status: 500 });
    }
}
