import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, addDoc, doc, serverTimestamp } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });

const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { school, phone, matricNumber: rawMatric, department, level, cgpa, essay, firstName: rawFirstName, surname: rawSurname, email: rawEmail, applicationId } = body;

        const matricNumber = rawMatric?.trim().toUpperCase();
        const firstName = rawFirstName?.trim();
        const surname = rawSurname?.trim();
        const email = rawEmail?.trim().toLowerCase();

        if (!school || !phone || !matricNumber || !department || !level || !cgpa || !essay || !firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const applicationsRef = collection(db, 'applications');

        // 1. Check for Duplicate Submissions (Name, Email, or Matric)
        // Check Email
        const qEmail = query(applicationsRef,
            where('email', '==', email),
            where('status', '==', 'STAGE_1_SUBMITTED')
        );
        const emailSnap = await getDocs(qEmail);

        // Check Matric
        const qMatric = query(applicationsRef,
            where('stage1.matricNumber', '==', matricNumber),
            where('status', '==', 'STAGE_1_SUBMITTED')
        );
        const matricSnap = await getDocs(qMatric);

        let duplicateToUpdate = null;

        if (!emailSnap.empty) {
            const doc = emailSnap.docs[0];
            const data = doc.data();
            const storedPhone = data.stage1?.phone || data.stage0?.phone || data['stage0.phone'];

            // Allow update if phone is missing or invalid
            if (!storedPhone || storedPhone === 'N/A' || String(storedPhone).trim() === '') {
                duplicateToUpdate = doc;
            } else {
                return NextResponse.json({
                    error: 'Your record already exists. Multiple submissions are not allowed.'
                }, { status: 409 });
            }
        }

        if (!matricSnap.empty) {
            const doc = matricSnap.docs[0];
            if (duplicateToUpdate) {
                if (doc.id !== duplicateToUpdate.id) {
                    return NextResponse.json({ error: 'This matric number is already in use.' }, { status: 409 });
                }
            } else {
                const data = doc.data();
                const storedPhone = data.stage1?.phone || data.stage0?.phone || data['stage0.phone'];
                if (!storedPhone || storedPhone === 'N/A' || String(storedPhone).trim() === '') {
                    duplicateToUpdate = doc;
                } else {
                    return NextResponse.json({
                        error: 'Your record already exists (Matric Number).'
                    }, { status: 409 });
                }
            }
        }

        // 2. Prepare Database Update
        let finalDocId = null;
        const updateData = {
            'stage0.phone': phone, // Back-fill missing Stage 0 data
            stage1: {
                matricNumber,
                school,
                department,
                phone, // Record in Stage 1 as well
                level,
                cgpa,
                essay,
                submittedAt: new Date().toISOString()
            },
            currentStage: 1,
            status: 'STAGE_1_SUBMITTED',
            emailStatus: 'PENDING'
        };

        // If duplicate found and allowed, update it
        if (duplicateToUpdate) {
            await updateDoc(duplicateToUpdate.ref, updateData);
            finalDocId = duplicateToUpdate.id;
        }

        if (applicationId) {
            const q = query(applicationsRef, where('applicationId', '==', applicationId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                // Avoid double update if it's the same doc
                if (docRef.id !== finalDocId) {
                    await updateDoc(docRef, updateData);
                    finalDocId = docRef.id;
                }
            }
        }

        if (!finalDocId) {
            const newDoc = await addDoc(applicationsRef, {
                ...updateData,
                'stage0.phone': phone,
                applicationId: applicationId || `GEN-${Date.now()}`,
                firstName,
                surname,
                email,
                createdAt: new Date().toISOString()
            });
            finalDocId = newDoc.id;
        }

        // 3. IMMEDIATELY return success to the user
        const response = NextResponse.json({ success: true });

        // 4. Background Email Sending
        (async () => {
            try {
                const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>New Stage 1 Application</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eeeeee; }
        .content { padding: 30px; }
        .data-box { background-color: #f0f2ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .essay-box { background-color: #f9f9f9; padding: 20px; border-left: 5px solid #ccc; font-style: italic; }
        h2 { color: #1a237e; margin-top: 0; }
        h3 { color: #1a237e; margin-bottom: 15px; }
        .footer { padding: 20px; background-color: #f8f9fa; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .data-box { background-color: #2c2c2c !important; color: #eeeeee !important; }
            .essay-box { background-color: #2c2c2c !important; color: #dddddd !important; border-left-color: #FFD700 !important; }
            h2, h3 { color: #FFD700 !important; }
            .footer { background-color: #121212 !important; border-top-color: #333333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>New Stage 1 Application Submitted</h2>
            <div class="data-box">
                <h3 style="margin-top:0;">Applicant Details</h3>
                <p><strong>Name:</strong> ${firstName} ${surname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Application ID:</strong> ${applicationId || 'N/A'}</p>
            </div>
            
            <h3>Academic Information</h3>
            <p><strong>Matric Number:</strong> ${matricNumber}</p>
            <p><strong>School/Faculty:</strong> ${school}</p>
            <p><strong>Department:</strong> ${department}</p>
            <p><strong>Level:</strong> ${level}</p>
            <p><strong>CGPA:</strong> ${cgpa}</p>
            
            <h3>Essay</h3>
            <div class="essay-box">
                ${essay.replace(/\n/g, '<br>')}
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
                    from: { email: SENDER_EMAIL, name: "Stage 1 System" },
                    to: [{ email: "applications@thefeb10project.org" }],
                    cc: [{ email: "admin@thefeb10project.org" }],
                    subject: `Stage 1 Submission: ${firstName} ${surname} (${matricNumber})`,
                    text: `New Stage 1 Application: ${firstName} ${surname}`,
                    html: htmlContent,
                    category: "Stage 1 Submission",
                });

                // Update status to SENT
                const docRef = doc(db, 'applications', finalDocId!);
                await updateDoc(docRef, { emailStatus: 'SENT' });
            } catch (emailError) {
                console.error("Async Email Error:", emailError);
                const docRef = doc(db, 'applications', finalDocId!);
                await updateDoc(docRef, { emailStatus: 'FAILED' });
            }
        })();

        return response;

    } catch (error: any) {
        console.error("Stage 1 Critical Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
