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
            <div style="font-family: Arial, sans-serif; color: #333;">
                <p>Dear ${firstName} ${surname},</p>

                <p>We are pleased to inform you that after a careful and rigorous review process, your application has been successfully shortlisted, and you have advanced to the final stage of The FEB10 Project Scholarship selection process.</p>

                <p>Your application stood out for your strong commitment to academics, clarity of purpose, and the effort reflected throughout your submission.</p>

                <div style="background-color: #f8f9fa; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 25px 0;">
                    <h3 style="color: #2e3b86; margin-top: 0;">🎉 FINAL WINNERS ANNOUNCEMENT (LIVE)</h3>
                    <p>The official scholarship recipients will be announced live during The FEB10 Project announcement event.</p>
                    
                    <p style="margin-bottom: 5px;"><strong>Date:</strong> Sunday, 15th February 2026</p>
                    <p style="margin-bottom: 5px;"><strong>Time:</strong> To be announced</p>
                    <p style="margin-bottom: 15px;"><strong>Platform:</strong> Live stream (details coming soon)</p>

                    <div style="background-color: #fff3cd; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px;">
                        <p style="margin: 0; font-weight: bold; color: #854d0e;">📌 Important:</p>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #854d0e;">
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
