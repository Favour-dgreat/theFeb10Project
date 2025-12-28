import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });

const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { matricNumber, department, level, cgpa, essay, firstName, surname, email, applicationId } = body;

        if (!matricNumber || !department || !level || !cgpa || !essay) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save to Firebase (Update existing application)
        const applicationsRef = collection(db, 'applications');
        let docSaved = false;

        if (applicationId) {
            const q = query(applicationsRef, where('applicationId', '==', applicationId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, {
                    stage1: {
                        matricNumber,
                        department,
                        level,
                        cgpa,
                        essay,
                        submittedAt: new Date().toISOString()
                    },
                    currentStage: 1,
                    status: 'STAGE_1_SUBMITTED'
                });
                docSaved = true;
            }
        }

        if (!docSaved) {
            // Fallback: Create new doc if ID not found or missing
            await addDoc(applicationsRef, {
                applicationId: applicationId || `UNKNOWN-${Date.now()}`,
                firstName,
                surname,
                email,
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
                createdAt: new Date().toISOString()
            });
        }

        const recipients = [
            { email: "applications@thefeb10project.org" }
        ];

        const cc = [
            { email: "adeshinafavour4@gmail.com" }
        ];

        const htmlContent = `
            <h2>New Stage 1 Application Submitted</h2>
            <div style="background: #eef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top:0;">Applicant Details</h3>
                <p><strong>Name:</strong> ${firstName} ${surname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Application ID:</strong> ${applicationId}</p>
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

            <p><strong>Status:</strong> Saved to Database.</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thefeb10project.org'}/admin/dashboard" style="display:inline-block; padding:10px 20px; background:#1a237e; color:white; text-decoration:none; border-radius:5px; margin-top:20px;">
                Review in Admin Dashboard
            </a>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Stage 1 System" },
            to: recipients,
            cc: cc,
            subject: `Stage 1 Submission: ${firstName} ${surname} (${matricNumber})`,
            text: `New Stage 1 Application\n\nName: ${firstName} ${surname}\nID: ${applicationId}\nEmail: ${email}\n\nMatric: ${matricNumber}\nDept: ${department}\nLevel: ${level}\nCGPA: ${cgpa}\n\nEssay:\n${essay}`,
            html: htmlContent,
            category: "Stage 1 Submission",
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Stage 1 Submission Error:", error);
        return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
    }
}
