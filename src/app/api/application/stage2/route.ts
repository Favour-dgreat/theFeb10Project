import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, addDoc, doc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { applicationId, firstName: rawFirstName, surname: rawSurname, email: rawEmail, files } = body;

        const firstName = rawFirstName?.trim();
        const surname = rawSurname?.trim();
        const email = rawEmail?.trim().toLowerCase();

        if (!applicationId || !firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing identity information' }, { status: 400 });
        }

        const applicationsRef = collection(db, 'applications');

        // 1. Check for Duplicate Submissions (Already in UNDER_REVIEW status)
        const qDup = query(applicationsRef,
            where('applicationId', '==', applicationId),
            where('stage2.status', '==', 'UNDER_REVIEW')
        );
        const dupSnap = await getDocs(qDup);

        if (!dupSnap.empty) {
            return NextResponse.json({
                error: 'Your Stage 2 application has already been submitted and is under review.'
            }, { status: 409 });
        }

        // 2. Prepare Database Update
        let finalDocId = null;
        const stage2Data = {
            stage2: {
                submittedAt: new Date().toISOString(),
                files: files,
                status: 'UNDER_REVIEW',
                emailStatus: 'PENDING'
            },
            status: 'UNDER_REVIEW',
            currentStage: 2
        };

        const q = query(applicationsRef, where('applicationId', '==', applicationId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, stage2Data);
            finalDocId = docRef.id;
        } else {
            // Fallback if record not found
            const newDoc = await addDoc(applicationsRef, {
                applicationId,
                firstName,
                surname,
                email,
                ...stage2Data,
                createdAt: new Date().toISOString()
            });
            finalDocId = newDoc.id;
        }

        // 3. IMMEDIATELY return success to the user
        const response = NextResponse.json({ success: true });

        // 4. Background Email Sending
        (async () => {
            try {
                const fileLinksHtml = Object.entries(files || {})
                    .map(([key, url]: [string, any]) => `<li><strong>${key}:</strong> <a href="${url}" target="_blank">View Document</a></li>`)
                    .join('');

                const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Stage 2 Submission Completed</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eeeeee; }
        .content { padding: 30px; }
        .data-box { background-color: #f0f2ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .list-box { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
        h2 { color: #1a237e; margin-top: 0; }
        h3 { color: #1a237e; margin-bottom: 15px; }
        .footer { padding: 20px; background-color: #f8f9fa; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }
        a { color: #1a237e; text-decoration: none; font-weight: bold; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .data-box { background-color: #2c2c2c !important; color: #eeeeee !important; }
            .list-box { background-color: #2c2c2c !important; color: #dddddd !important; }
            h2, h3 { color: #FFD700 !important; }
            a { color: #FFD700 !important; }
            .footer { background-color: #121212 !important; border-top-color: #333333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>New Stage 2 Submission Completed</h2>
            <div class="data-box">
                <h3 style="margin-top:0;">Applicant Details</h3>
                <p><strong>Name:</strong> ${firstName} ${surname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Application ID:</strong> ${applicationId}</p>
            </div>
            
            <h3>Uploaded Documents</h3>
            <div class="list-box">
                <ul style="margin:0; padding-left: 20px;">
                    ${fileLinksHtml}
                </ul>
            </div>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} The FEB10 Project Admin System</p>
        </div>
    </div>
</body>
</html>
                `;

                await client.send({
                    from: { email: SENDER_EMAIL, name: "Stage 2 System" },
                    to: [{ email: "applications@thefeb10project.org" }],
                    subject: `Stage 2 COMPLETE: ${firstName} ${surname}`,
                    text: `New Stage 2 Submission from ${firstName} ${surname}.`,
                    html: htmlContent,
                    category: "Stage 2 Submission",
                });

                // Update status to SENT
                const docRef = doc(db, 'applications', finalDocId!);
                await updateDoc(docRef, { 'stage2.emailStatus': 'SENT' });
            } catch (emailError) {
                console.error("Async Stage 2 Email Error:", emailError);
                const docRef = doc(db, 'applications', finalDocId!);
                await updateDoc(docRef, { 'stage2.emailStatus': 'FAILED' });
            }
        })();

        return response;

    } catch (error: any) {
        console.error("Stage 2 Submission Error:", error);
        return NextResponse.json({
            error: error.message || 'Failed to process submission'
        }, { status: 500 });
    }
}
