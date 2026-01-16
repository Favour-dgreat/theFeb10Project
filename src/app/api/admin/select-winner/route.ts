import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const { applicationId, liveStreamDetails } = await req.json();

        if (!applicationId) return NextResponse.json({ error: 'Application ID required' }, { status: 400 });

        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, where('applicationId', '==', applicationId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

        const docSnapshot = querySnapshot.docs[0];
        const { firstName, surname, email } = docSnapshot.data();

        // Default Live Stream Details if not provided
        // const streamInfo = liveStreamDetails || {
        //     date: "February 10th, 2026",
        //     time: "10:00 AM WAT",
        //     link: "https://www.youtube.com/@TheFeb10Project",
        //     platform: "YouTube Live"
        // };

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Final Stage Confirmation</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; }
        .content { padding: 40px 30px; }
        .info-box { background-color: #f8f9fa; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; margin: 25px 0; }
        .note-box { background-color: #fff3cd; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 0 4px 4px 0; margin-top: 15px; }
        .footer { padding: 20px; background-color: #f8f9fa; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }
        h3 { color: #2e3b86; margin-top: 0; }
        strong { color: #1a237e; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .info-box { background-color: #2c2c2c !important; border-color: #444444 !important; }
            .note-box { background-color: #3d2b00 !important; border-left-color: #FFD700 !important; color: #ffe0b2 !important; }
            h3 { color: #FFD700 !important; }
            strong { color: #FFD700 !important; }
            .social-section { border-top-color: #333333 !important; }
            .social-text { color: #FFD700 !important; }
            .footer { background-color: #121212 !important; border-top-color: #333333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <p>Dear ${firstName} ${surname},</p>

            <p>We are pleased to inform you that after a careful and rigorous review process, your application has been successfully shortlisted, and you have advanced to the final stage of The FEB10 Project Scholarship selection process.</p>

            <p>Your application stood out for your strong commitment to academics, clarity of purpose, and the effort reflected throughout your submission.</p>

            <div class="info-box">
                <h3 style="margin-top: 0;">🎉 FINAL WINNERS ANNOUNCEMENT (LIVE)</h3>
                <p>The official scholarship recipients will be announced live during The FEB10 Project announcement event.</p>
                
                <p style="margin-bottom: 5px;"><strong>Date:</strong> Sunday, 15th February 2026</p>
                <p style="margin-bottom: 5px;"><strong>Time:</strong> To be announced</p>
                <p style="margin-bottom: 15px;"><strong>Platform:</strong> Live stream (details coming soon)</p>

                <div class="note-box">
                    <p style="margin: 0; font-weight: bold;">📌 Important:</p>
                    <p style="margin: 5px 0 0; font-size: 14px;">
                        Specific details about the live stream — including the exact time and viewing links — will be shared across our official social media platforms: <br>
                        <strong>@TheFEB10Project</strong>
                    </p>
                </div>
            </div>

            <p>We encourage you to stay connected and watch out for updates as we approach the final announcement.</p>
            <p>Thank you for being part of this journey, and we wish you the very best as we move into the final stage.</p>

            <p style="margin-top: 30px;">
                Warm regards,<br>
                <strong>The FEB10 Project Team</strong>
            </p>
        </div>
        <div class="footer">
            <div class="social-section" style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-bottom: 20px; text-align: center;">
                <p class="social-text" style="margin-bottom: 15px; font-weight: bold; color: #1a237e;">Stay Connected & Don't Miss Updates:</p>
                <div style="display: block;">
                    <a href="https://www.facebook.com/share/1ay9naqt35/?mibextid=wwXIfr" style="text-decoration: none; margin: 0 10px; display: inline-block;">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" height="24" alt="Facebook">
                    </a>
                    <a href="https://www.linkedin.com/company/the-feb10-project/" style="text-decoration: none; margin: 0 10px; display: inline-block;">
                        <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="24" height="24" alt="LinkedIn">
                    </a>
                    <a href="https://www.instagram.com/thefeb10project?igsh=amEydWsxemU4NHI%3D&utm_source=qr" style="text-decoration: none; margin: 0 10px; display: inline-block;">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" height="24" alt="Instagram">
                    </a>
                    <a href="https://x.com/thefeb10project" style="text-decoration: none; margin: 0 10px; display: inline-block;">
                        <img src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png" width="24" height="24" alt="X">
                    </a>
                </div>
            </div>
            <p>© ${new Date().getFullYear()} The FEB10 Project. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Project" },
            to: [{ email }],
            subject: "Congratulations! You’ve Advanced to the Final Stage – FEB10 Project Scholarship",
            html: htmlContent,
            category: "Winner Selection",
        });

        await updateDoc(docSnapshot.ref, {
            status: "SELECTED_WINNER",
            selectedAt: new Date().toISOString()
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to notify winner' }, { status: 500 });
    }
}
