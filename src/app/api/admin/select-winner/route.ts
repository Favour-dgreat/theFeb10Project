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

            <p>You are required to join the FEB10 Project Undergraduate Scholarship 2026 Live Announcement.</p>

            <div class="info-box">
                <p style="margin-bottom: 5px;"><strong>📅 Date:</strong> Sunday, 1st March 2026</p>
                <p style="margin-bottom: 5px;"><strong>⏰ Time:</strong> 6:30 PM (WAT)</p>
                <p style="margin-bottom: 15px;"><strong>📍 Where:</strong> Live on <a href="https://web.facebook.com/sunnywillz01">Sunny Willz's Facebook page</a> — hosted by the Founder of the FEB10 Project.</p>

                <div class="note-box">
                    <p style="margin: 0; font-weight: bold;">📌 Important:</p>
                    <p style="margin: 5px 0 0; font-size: 14px;">
                        The scholarship <strong>winners will be announced live</strong> during this session. <strong>Attendance is mandatory</strong> — this is the only way to know the results as they happen.
                    </p>
                </div>
            </div>

            <p>For transparency, the live session will also be made available on the official FEB10 Project platforms after the broadcast.</p>
            
            <p>To stay connected and gain additional value, you can follow Sunny Willz for leadership insights, personal development tips, and updates on future FEB10 opportunities: Follow <a href="https://web.facebook.com/sunnywillz01"> Sunny Willz</a></p>

            <p>We expect <strong>all shortlisted applicants</strong> to join the live session — do not miss it.</p>
            
            <p><strong>Join the live session now:</strong> <a href="https://web.facebook.com/sunnywillz01">Sunny Willz's Facebook page</a></p>

            <p style="margin-top: 30px;">
                Warm regards,<br>
                <strong>The FEB10 Project Scholarship Team.</strong>
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
            subject: "FEB10 Project Scholarship Live Announcement – 1st March 2026",
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
