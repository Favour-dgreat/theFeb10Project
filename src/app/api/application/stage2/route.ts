import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Extract Identity
        const applicationId = formData.get('applicationId')?.toString();
        const firstName = formData.get('firstName')?.toString();
        const surname = formData.get('surname')?.toString();
        const email = formData.get('email')?.toString();

        if (!applicationId || !firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing identity information' }, { status: 400 });
        }

        // Upload Files to Cloudinary
        const uploadedFiles: Record<string, string> = {};
        const fileUploadPromises = [];

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                const promise = uploadToCloudinary(value, `feb10_scholarship/${applicationId}`)
                    // @ts-ignore
                    .then((result: any) => {
                        uploadedFiles[key] = result.secure_url;
                    })
                    .catch(err => {
                        console.error(`Failed to upload ${key}:`, err);
                    });
                fileUploadPromises.push(promise);
            }
        }

        await Promise.all(fileUploadPromises);

        // Save to Firebase (Update existing application or create new stage2 entry)
        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, where('applicationId', '==', applicationId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, {
                stage2: {
                    submittedAt: new Date().toISOString(),
                    files: uploadedFiles,
                    status: 'UNDER_REVIEW'
                },
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
                    files: uploadedFiles,
                    status: 'UNDER_REVIEW'
                },
                currentStage: 2,
                createdAt: new Date().toISOString()
            });
        }

        // Email Notification
        const recipients = [{ email: "applications@thefeb10project.org" }];
        const cc = [{ email: "adeshinafavour4@gmail.com" }];

        const fileLinksHtml = Object.entries(uploadedFiles)
            .map(([key, url]) => `<li><strong>${key}:</strong> <a href="${url}" target="_blank">View Document</a></li>`)
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
            
            <p><strong>Status:</strong> Saved to Database & Cloudinary.</p>
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
        console.error("Stage 2 Submission Error:", error);
        return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
    }
}
