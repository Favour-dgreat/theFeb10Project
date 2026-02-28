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
            // Handle private key formatting
            let formattedKey = privateKey;

            // Clean up common copy-paste errors (newlines, quotes, commas)
            formattedKey = formattedKey.trim();
            if (formattedKey.startsWith('"') || formattedKey.startsWith("'")) {
                formattedKey = formattedKey.slice(1);
            }
            if (formattedKey.endsWith(',') || formattedKey.endsWith(';')) {
                formattedKey = formattedKey.slice(0, -1);
            }
            if (formattedKey.endsWith('"') || formattedKey.endsWith("'")) {
                formattedKey = formattedKey.slice(0, -1);
            }

            // Re-apply newline replacement for escaped newlines
            formattedKey = formattedKey.replace(/\\n/g, '\n');

            console.log("[Firebase Admin] Key Debug:", {
                length: formattedKey.length,
                startsWith: formattedKey.substring(0, 20),
                endsWith: formattedKey.substring(formattedKey.length - 20),
                hasNewlines: formattedKey.includes('\n'),
                newlineCount: formattedKey.split('\n').length
            });

            initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey: formattedKey,
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

let adminDb: FirebaseFirestore.Firestore;
let adminAuth: import('firebase-admin/auth').Auth;

try {
    adminDb = getFirestore();
    adminAuth = getAuth();
} catch (e) {
    console.warn("[Firebase Admin] Failed to get Firestore/Auth instance (likely due to missing app init). Using mocks for build.");
    // Mock for build environment to prevent crash
    adminDb = {
        collection: () => ({
            orderBy: () => ({
                get: async () => ({ docs: [] })
            }),
            add: async () => ({})
        })
    } as any;
    adminAuth = {} as any;
}

export { adminDb, adminAuth };

