import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { applicationId, firstName, surname, email, files } = body;

        if (!applicationId || !firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing identity information' }, { status: 400 });
        }

        // Save to Firebase (Update existing application or create new stage2 entry)
        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, where('applicationId', '==', applicationId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                stage2: {
                    submittedAt: new Date().toISOString(),
                    files: files,
                    status: 'UNDER_REVIEW'
                },
                status: 'UNDER_REVIEW',
                currentStage: 2
            });
        } else {
            // Fallback if stage 1 wasn't saved (e.g. legacy data)
            await addDoc(applicationsRef, {
                applicationId,
                firstName,
                surname,
                email,
                stage2: {
                    submittedAt: new Date().toISOString(),
                    files: files,
                    status: 'UNDER_REVIEW'
                },
                currentStage: 2,
                createdAt: new Date().toISOString()
            });
        }

        // Email Notification
        const recipients = [{ email: "applications@thefeb10project.org" }];
        const cc = [{ email: "admin@thefeb10project.org" }];

        const fileLinksHtml = Object.entries(files || {})
            .map(([key, url]: [string, any]) => `<li><strong>${key}:</strong> <a href="${url}" target="_blank">View Document</a></li>`)
            .join('');

        const htmlContent = `
            <h2>New Stage 2 Submission Completed</h2>
            <div style="background: #eef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top:0;">Applicant Details</h3>
                <p><strong>Name:</strong> ${firstName} ${surname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Application ID:</strong> ${applicationId}</p>
            </div>
            
            <h3>Uploaded Documents</h3>
            <ul>
                ${fileLinksHtml}
            </ul>
            
            <p><strong>Status:</strong> Saved to Database & Firebase Storage.</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thefeb10project.org'}/admin/dashboard" style="display:inline-block; padding:10px 20px; background:#1a237e; color:white; text-decoration:none; border-radius:5px; margin-top:20px;">
                Review in Admin Dashboard
            </a>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Stage 2 System" },
            to: recipients,
            cc: cc,
            subject: `Stage 2 COMPLETE: ${firstName} ${surname}`,
            text: `New Stage 2 Submission from ${firstName} ${surname}. Check admin dashboard for files.`,
            html: htmlContent,
            category: "Stage 2 Submission",
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Stage 2 Submission Error Details:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({
            error: error.message || 'Failed to process submission',
            details: error.toString()
        }, { status: 500 });
    }
}
