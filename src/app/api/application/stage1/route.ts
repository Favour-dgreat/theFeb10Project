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
        const { matricNumber: rawMatric, department, level, cgpa, essay, firstName: rawFirstName, surname: rawSurname, email: rawEmail, applicationId } = body;

        const matricNumber = rawMatric?.trim().toUpperCase();
        const firstName = rawFirstName?.trim();
        const surname = rawSurname?.trim();
        const email = rawEmail?.trim().toLowerCase();

        if (!matricNumber || !department || !level || !cgpa || !essay || !firstName || !surname || !email) {
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

        // Check Name
        const qName = query(applicationsRef,
            where('firstName', '==', firstName),
            where('surname', '==', surname),
            where('status', '==', 'STAGE_1_SUBMITTED')
        );
        const nameSnap = await getDocs(qName);

        // Check Matric
        const qMatric = query(applicationsRef,
            where('stage1.matricNumber', '==', matricNumber),
            where('status', '==', 'STAGE_1_SUBMITTED')
        );
        const matricSnap = await getDocs(qMatric);

        if (!emailSnap.empty || !nameSnap.empty || !matricSnap.empty) {
            return NextResponse.json({
                error: 'Your record already exists. Multiple submissions are not allowed.'
            }, { status: 409 });
        }

        // 2. Prepare Database Update
        let finalDocId = null;
        const updateData = {
            stage1: {
                matricNumber,
                department,
                level,
                cgpa,
                essay,
                submittedAt: new Date().toISOString()
            },
            currentStage: 1,
            status: 'STAGE_1_SUBMITTED',
            emailStatus: 'PENDING'
        };

        if (applicationId) {
            const q = query(applicationsRef, where('applicationId', '==', applicationId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, updateData);
                finalDocId = docRef.id;
            }
        }

        if (!finalDocId) {
            const newDoc = await addDoc(applicationsRef, {
                ...updateData,
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
                    <h2>New Stage 1 Application Submitted</h2>
                    <div style="background: #eef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="margin-top:0;">Applicant Details</h3>
                        <p><strong>Name:</strong> ${firstName} ${surname}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Application ID:</strong> ${applicationId || 'N/A'}</p>
                    </div>
                    
                    <h3>Academic Information</h3>
                    <p><strong>Matric Number:</strong> ${matricNumber}</p>
                    <p><strong>Department:</strong> ${department}</p>
                    <p><strong>Level:</strong> ${level}</p>
                    <p><strong>CGPA:</strong> ${cgpa}</p>
                    
                    <h3>Essay</h3>
                    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                        ${essay.replace(/\n/g, '<br>')}
                    </blockquote>
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
