import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Initialize Mailtrap client
const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });

const SENDER_EMAIL = "applications@thefeb10project.org"; // Use a verified sender in Mailtrap or placeholder

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, surname, email } = body;

        if (!firstName || !surname || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate unique Application ID
        const applicationId = `FEB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        // Save to Firebase
        await addDoc(collection(db, "applications"), {
            applicationId,
            firstName,
            surname,
            email,
            currentStage: 0,
            status: "ENROLLED",
            createdAt: new Date().toISOString()
        });

        // Send Email via Mailtrap
        const sender = {
            email: SENDER_EMAIL,
            name: "The FEB10 Project Team",
        };
        const recipients = [
            {
                email: email,
            }
        ];

        // Create the Stage 1 Link with query parameters to carry over user context
        const stage1Url = new URL("https://www.thefeb10project.org/application/stage1");
        stage1Url.searchParams.append("applicationId", applicationId);
        stage1Url.searchParams.append("email", email);
        stage1Url.searchParams.append("firstName", firstName);
        stage1Url.searchParams.append("surname", surname);

        const stage1Link = stage1Url.toString();

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scholarship Application Received</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #1a237e; padding: 40px 20px; text-align: center; }
        .header h1 { color: #FFD700; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
        .content { padding: 40px 30px; }
        .application-id { background-color: #fff9e6; border: 1px dashed #FFD700; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px; }
        .id-label { font-size: 14px; color: #666666; margin-bottom: 5px; display: block; }
        .id-value { font-size: 24px; font-weight: bold; color: #1a237e; letter-spacing: 1px; }
        .cta-box { background-color: #f0f2ff; border-left: 4px solid #1a237e; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
        .button { display: inline-block; padding: 16px 32px; background-color: #FFD700; color: #1a237e !important; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; transition: background-color 0.3s ease; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; font-size: 13px; color: #777777; border-top: 1px solid #eeeeee; }
        .steps { margin: 25px 0; padding-left: 20px; }
        .steps li { margin-bottom: 12px; }
        h2 { color: #1a237e; font-size: 20px; border-bottom: 2px solid #FFD700; display: inline-block; padding-bottom: 5px; margin-top: 0; }
        .social-links { margin-top: 20px; }
        .social-links a { margin: 0 10px; color: #1a237e; text-decoration: none; }
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
                <a href="${stage1Link}" class="button">WATCH VIDEO & CONTINUE</a>
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

        // Send confirmation to Applicant
        await client.send({
            from: sender,
            to: recipients,
            subject: "Your FEB10 Project Scholarship Application – Next Step Required",
            text: `Dear ${firstName} ${surname},\n\nYour application has been received. Your ID is ${applicationId}.\n\nNext Step: Watch Orientation Video 1 here: ${stage1Link}`,
            html: htmlContent,
            category: "Scholarship Enrollment",
        });

        // Send Notification to Admins
        const adminHtml = `
            <h2>New Scholarship Enrollment</h2>
            <p><strong>Name:</strong> ${firstName} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "Scholarship System" },
            to: [{ email: "applications@thefeb10project.org" }],
            cc: [{ email: "adeshinafavour4@gmail.com" }],
            subject: `New Enrollment: ${firstName} ${surname}`,
            text: `New Enrollment\nName: ${firstName} ${surname}\nEmail: ${email}\nID: ${applicationId}`,
            html: adminHtml,
            category: "New Enrollment Notification",
        });

        return NextResponse.json({
            success: true,
            applicationId
        });

    } catch (error: any) {
        console.error("Mailtrap Error:", error);
        return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
    }
}
