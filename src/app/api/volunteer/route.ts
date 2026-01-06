import { NextRequest, NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MailtrapAPIkey || "";
const client = new MailtrapClient({ token: TOKEN });
const SENDER_EMAIL = "applications@thefeb10project.org";
const ADMIN_EMAIL = "admin@thefeb10project.org";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, location, areas, consent } = body;

        if (!name || !email || !phone || !location || !consent) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Email to Admin
        const adminHtmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2e3b86; color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0;">New Volunteer Signup</h2>
                </div>
                <div style="padding: 30px;">
                    <p>A new volunteer has just signed up through the website.</p>
                    <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Location:</strong> ${location}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Areas of Interest:</strong></p>
                        <ul style="margin: 0 0 10px 0;">
                            ${areas && areas.length > 0 ? areas.map((area: string) => `<li>${area}</li>`).join('') : '<li>None selected</li>'}
                        </ul>
                        <p style="margin: 0;"><strong>Consent Given:</strong> ${consent ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>© ${new Date().getFullYear()} The FEB10 Project. All rights reserved.</p>
                </div>
            </div>
        `;

        await client.send({
            from: { email: SENDER_EMAIL, name: "The FEB10 Volunteer System" },
            to: [{ email: ADMIN_EMAIL }],
            subject: `New Volunteer Application: ${name}`,
            html: adminHtmlContent,
            category: "Volunteer Signup Notification",
        });

        // Email to User (Confirmation)
        const userHtmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2e3b86; color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0;">Application Received!</h2>
                </div>
                <div style="padding: 30px;">
                    <p style="font-size: 16px; line-height: 1.5; color: #333;">
                        Thank you for your interest in volunteering with The FEB10 Project.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333;">
                        We appreciate your willingness to support a mission focused on creating access, opportunity, and impact. Your submission has been received and added to our volunteer pool. Our team will reach out via email or phone with further details.
                    </p>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #fff4f0; border-left: 4px solid #f06436; border-radius: 4px;">
                        <p style="margin: 0; color: #c2410c; font-weight: bold;">
                            📩 Please keep an eye on your inbox for updates.
                        </p>
                    </div>

                    <p style="margin-top: 30px; font-style: italic; color: #666; font-size: 14px;">
                        Thank you for choosing to serve with purpose. Together, we make impact.
                    </p>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>© ${new Date().getFullYear()} The FEB10 Project. All rights reserved.</p>
                </div>
            </div>
        `;

        // Send confirmation email to the user
        // Note: Using the same sender email as the admin notification
        try {
            await client.send({
                from: { email: SENDER_EMAIL, name: "The FEB10 Project" },
                to: [{ email: email }],
                subject: `Application Received - The FEB10 Project`,
                html: userHtmlContent,
                category: "Volunteer Application Confirmation",
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email to user:", emailError);
            // We don't fail the request if user email fails, but we log it. 
            // The admin notification is more critical? Or both? 
            // In a real app we might want to retry or alert. 
            // For now, proceeding as success if admin email sent or at least code execution reached here.
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Volunteer API Error:", error);
        return NextResponse.json({ error: 'Failed to process volunteer application' }, { status: 500 });
    }
}
