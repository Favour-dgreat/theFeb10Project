import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// Initialize Mailtrap client
const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });

const SENDER_EMAIL = "applications@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("[Enrollment API] Incoming Body:", body);
        const {
            firstName: rawFirstName,
            surname: rawSurname,
            email: rawEmail,
            middleName,
            phone,
            gender,
            stateOfResidence,
            isEnrolled,
            agreesToProcess,
            consentCommunication,
            consentInstructions
        } = body;

        // 1. Sanitization & Validation
        const firstName = rawFirstName?.trim();
        const surname = rawSurname?.trim();
        const email = rawEmail?.trim().toLowerCase();

        if (!firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const applicationsRef = collection(db, "applications");

        // Check by Email
        const qEmail = query(applicationsRef, where('email', '==', email));
        const emailSnap = await getDocs(qEmail);

        if (!emailSnap.empty) {
            return NextResponse.json({
                error: 'An application with this email already exists.'
            }, { status: 409 });
        }

        // 3. Generate unique Application ID
        const applicationId = `FEB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        // 4. Save to Firebase with Status tracking
        const docRef = await addDoc(applicationsRef, {
            applicationId,
            firstName,
            surname,
            email,
            stage0: {
                middleName: middleName || "",
                phone: phone || "",
                gender: gender || "",
                stateOfResidence: stateOfResidence || "",
                isEnrolled: isEnrolled || false,
                agreesToProcess: agreesToProcess || false,
                consentCommunication: consentCommunication || false,
                consentInstructions: consentInstructions || false
            },
            currentStage: 0,
            status: "ENROLLED",
            emailStatus: "PENDING", // Stage 0 Enrollment Email status
            createdAt: new Date().toISOString()
        });

        const finalDocId = docRef.id;

        // 5. Create the Stage 1 Link
        const stage1Url = new URL("https://www.thefeb10project.org/application/stage1");
        stage1Url.searchParams.append("applicationId", applicationId);
        stage1Url.searchParams.append("email", email);
        stage1Url.searchParams.append("firstName", firstName);
        stage1Url.searchParams.append("surname", surname);

        const stage1Link = stage1Url.toString();

        // 6. Send Applicant Email SYNCHRONOUSLY to ensure delivery
        // This prevents the serverless function from terminating before the email is sent
        try {
            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Scholarship Application Received</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a237e; padding: 40px 20px; text-align: center; }
        .header h1 { color: #FFD700; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
        .content { padding: 40px 30px; }
        .application-id { background-color: #fff9e6; border: 1px dashed #FFD700; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px; }
        .id-label { font-size: 14px; color: #666666; margin-bottom: 5px; display: block; }
        .id-value { font-size: 24px; font-weight: bold; color: #1a237e; letter-spacing: 1px; }
        .cta-box { background-color: #f0f2ff; border-left: 4px solid #1a237e; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
        .button { display: inline-block; padding: 16px 32px; background-color: #FFD700 !important; color: #000000 !important; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; text-align: center; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }
        .steps { margin: 25px 0; padding-left: 20px; }
        .steps li { margin-bottom: 12px; }
        h2 { color: #1a237e; font-size: 20px; border-bottom: 2px solid #FFD700; display: inline-block; padding-bottom: 5px; margin-top: 0; }
        .social-links { margin-top: 20px; }
        .social-links a { margin: 0 10px; color: #1a237e; text-decoration: none; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; }
            .content { color: #eeeeee !important; }
            .application-id { background-color: #2c2c2c !important; border-color: #FFD700 !important; }
            .id-label { color: #bbbbbb !important; }
            .id-value { color: #FFD700 !important; }
            .cta-box { background-color: #2c2c2c !important; border-left-color: #FFD700 !important; color: #eeeeee !important; }
            .button { background-color: #FFD700 !important; color: #000000 !important; }
            h2 { color: #FFD700 !important; border-bottom-color: #FFD700 !important; }
            .footer { background-color: #121212 !important; color: #888888 !important; border-top-color: #333333 !important; }
            .social-links a { color: #FFD700 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>The FEB10 Project</h1>
        </div>
        
        <div class="content">
            <h2>Application Received!</h2>
            <p>Dear <strong>${firstName} ${surname}</strong>,</p>
            
            <p>Congratulations on taking the first step towards the FEB10 Project 2026 Scholarship. We have successfully received your enrollment information.</p>
            
            <div class="application-id">
                <span class="id-label">YOUR UNIQUE APPLICATION ID</span>
                <div class="id-value">${applicationId}</div>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">Please keep this ID safe. You will need it for all future stages of your application.</p>
            </div>

            <h2>Next Step: Orientation</h2>
            <div class="cta-box">
                <p style="margin-top: 0;">To proceed, you must now watch <strong>Orientation Video 1</strong>. This is a compulsory part of your application process.</p>
                <a href="${stage1Link}" class="button" style="display: inline-block; padding: 16px 32px; background-color: #FFD700; color: #000000; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; text-align: center;">WATCH VIDEO & CONTINUE</a>
            </div>

            <h3>What's Next?</h3>
            <ul class="steps">
                <li>Watch the full Orientation Video 1.</li>
                <li>Gain access to the <strong>Stage 1 Application Form</strong>.</li>
                <li>Submit your detailed information for shortlisting.</li>
            </ul>

            <p style="font-style: italic; color: #666; font-size: 14px;">
                "The FEB10 Project is not just about financial support; it is about vision, discipline, and mindset."
            </p>
        </div>

        <div class="footer">
            <p>Questions? We're here to help.<br>
            Email us at: <a href="mailto:support@thefeb10project.org" style="color: #1a237e;">support@thefeb10project.org</a></p>
            <div class="social-links">
                <p>© 2025 The FEB10 Project. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
                `;

            await client.send({
                from: { email: SENDER_EMAIL, name: "The FEB10 Project Team" },
                to: [{ email: email }],
                subject: "Your FEB10 Project Scholarship Application – Next Step Required",
                text: `Dear ${firstName} ${surname},\n\nYour application has been received. Your ID is ${applicationId}.\n\nNext Step: Watch Orientation Video 1 here: ${stage1Link}`,
                html: htmlContent,
                category: "Scholarship Enrollment",
            });

            // Update status to SENT
            const applicationRef = doc(db, 'applications', finalDocId);
            await updateDoc(applicationRef, { emailStatus: 'SENT' });

            (async () => {
                try {
                    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>New Enrollment Notification</title>
    <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eeeeee; }
        .content { padding: 30px; }
        .data-box { background-color: #f0f2ff; padding: 20px; border-radius: 8px; }
        h2 { color: #1a237e; margin-top: 0; }
        .footer { padding: 20px; background-color: #f8f9fa; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }

        @media (prefers-color-scheme: dark) {
            body { background-color: #121212 !important; color: #eeeeee !important; }
            .container { background-color: #1e1e1e !important; border-color: #333333 !important; }
            .content { color: #eeeeee !important; }
            .data-box { background-color: #2c2c2c !important; color: #eeeeee !important; }
            h2 { color: #FFD700 !important; }
            .footer { background-color: #121212 !important; border-top-color: #333333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h2>New Scholarship Enrollment</h2>
            <div class="data-box">
                <p><strong>Name:</strong> ${firstName} ${surname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
                <p><strong>Application ID:</strong> ${applicationId}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
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
                        from: { email: SENDER_EMAIL, name: "Scholarship System" },
                        to: [{ email: "applications@thefeb10project.org" }],
                        cc: [{ email: "admin@thefeb10project.org" }],
                        subject: `New Enrollment: ${firstName} ${surname}`,
                        text: `New Enrollment\nName: ${firstName} ${surname}\nEmail: ${email}\nID: ${applicationId}`,
                        html: adminHtml,
                        category: "New Enrollment Notification",
                    });
                } catch (adminError) {
                    console.error("Admin Notification Background Error:", adminError);
                }
            })();

        } catch (emailError: any) {
            console.error("Enrollment Email Error:", emailError);
            // Update status to FAILED with error message
            const applicationRef = doc(db, 'applications', finalDocId);
            await updateDoc(applicationRef, {
                emailStatus: 'FAILED',
                emailError: emailError?.message || String(emailError)
            });
        }

        return NextResponse.json({
            success: true,
            applicationId
        });

    } catch (error: any) {
        console.error("Enrollment Critical Error:", error);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
