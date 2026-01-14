import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    console.log("[Firebase Admin] Initialization check:", {
        projectId: !!projectId,
        clientEmail: !!clientEmail,
        privateKey: !!privateKey
    });

    if (projectId && clientEmail && privateKey) {
        try {
            initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log("[Firebase Admin] Initialized successfully.");
        } catch (e: any) {
            console.error("[Firebase Admin] Initialization error:", e.message);
        }
    } else {
        console.warn("[Firebase Admin] Missing environment variables. Initialization skipped.");
    }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
