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
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #1a237e;">Ready to Begin Your FEB10 Journey?</h2>
                <p>Dear ${firstName},</p>
                <p>You recently enrolled for The FEB10 Project Scholarship, but it looks like you haven't started your Stage 1 application yet.</p>
                <p>Stage 1 is the most critical part of the selection process. It includes your personal details, academic information, and your scholarship essay.</p>
                
                <div style="margin: 30px 0; padding: 20px; background-color: #f0f2ff; border-left: 5px solid #1a237e;">
                    <h3 style="margin-top:0;">Your Next Step:</h3>
                    <p>Click the button below to watch the orientation video and access the Stage 1 form.</p>
                    <a href="${stage1Link}" style="display: inline-block; padding: 15px 30px; background-color: #1a237e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
                        START STAGE 1 APPLICATION
                    </a>
                </div>

                <p>If you have any questions, feel free to reply to this email or contact support@thefeb10project.org.</p>
                <p>Best regards,<br>The FEB10 Team</p>
            </div>
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
