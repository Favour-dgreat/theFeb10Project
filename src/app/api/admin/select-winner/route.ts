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
        const streamInfo = liveStreamDetails || {
            date: "February 10th, 2026",
            time: "10:00 AM WAT",
            link: "https://www.youtube.com/@TheFeb10Project",
            platform: "YouTube Live"
        };

        const htmlContent = `
            <div style="text-align: center;">
                <h1 style="color: #1a237e;">CONGRATULATIONS!</h1>
                <h2 style="color: #f06436;">You are a FEB10 Scholar Finalist</h2>
            </div>
            
            <p>Dear ${firstName} ${surname},</p>
            
            <p>We are absolutely thrilled to inform you that after a rigorous review process, you have been selected as a final recipient of the <strong>The FEB10 Project Scholarship</strong>.</p>
            
            <p>Your application stood out for its academic excellence, compelling story, and clear vision.</p>
            
            <div style="background-color: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="margin-top:0; color: #92400e;">🎉 GRAND ANNOUNCEMENT EVENT</h3>
                <p>The official winners' ceremony and fund disbursement details will be announced live.</p>
                <p><strong>Date:</strong> ${streamInfo.date}</p>
                <p><strong>Time:</strong> ${streamInfo.time}</p>
                <p><strong>Platform:</strong> ${streamInfo.platform}</p>
                
                <a href="${streamInfo.link}" style="display: block; width: fit-content; margin: 20px auto; padding: 15px 30px; background-color: #d946ef; color: white; text-decoration: none; border-radius: 30px; font-weight: bold; text-align: center;">
                    SET REMINDER FOR LIVE STREAM
                </a>
            </div>

            <p>Please ensure you are available and have a stable internet connection. We may call you live on air!</p>
            
            <p>Once again, congratulations. You represent the future.</p>
            
            <p>Warm Regards,<br>The FEB10 Project Team</p>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Project" },
            to: [{ email }],
            subject: "OFFICIAL: You have been Selected!",
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
