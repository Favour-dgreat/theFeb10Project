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

        // Construct Stage 2 Link
        const stage2Url = new URL("https://www.thefeb10project.org/application/stage2");
        stage2Url.searchParams.append("applicationId", applicationId);
        stage2Url.searchParams.append("email", email);
        stage2Url.searchParams.append("firstName", firstName);
        stage2Url.searchParams.append("surname", surname);

        const stage2Link = stage2Url.toString();

        // Email Content
        const htmlContent = `
            <h2>Congratulations! You are Shortlisted for Stage 2.</h2>
            <p>Dear ${firstName},</p>
            <p>We are pleased to inform you that your application for The FEB10 Project Scholarship has passed the initial review.</p>
            <p>You have been selected to proceed to <strong>Stage 2: Document Verification</strong>.</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #e8eafe; border-left: 5px solid #1a237e;">
                <h3 style="margin-top:0;">Your Next Steps:</h3>
                <ol>
                    <li>Click the link below to access the Stage 2 Portal.</li>
                    <li>Watch the second mandatory orientation video.</li>
                    <li>Upload your verification documents (Transcript, ID, Admission Letter, etc.).</li>
                </ol>
                <a href="${stage2Link}" style="display: inline-block; padding: 15px 30px; background-color: #1a237e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
                    ACCESS STAGE 2 PORTAL
                </a>
            </div>

            <p><strong>Deadline:</strong> Please complete this stage within 48 hours.</p>
            <p>Good luck!</p>
            <p>The FEB10 Team</p>
        `;

        // Send Email
        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Project" },
            to: [{ email }],
            subject: "Congratulations! You've qualified for Stage 2",
            html: htmlContent,
            category: "Stage 2 Invitation",
        });

        // Update DB Status
        await updateDoc(docSnapshot.ref, {
            status: "STAGE_2_INVITED",
            stage2InvitedAt: new Date().toISOString()
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to invite user' }, { status: 500 });
    }
}
