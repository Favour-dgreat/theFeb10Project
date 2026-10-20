import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

function getOrInitAdminApp() {
    if (getApps().length > 0) {
        return getApp();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
        try {
            // Clean up formatted private key
            let formattedKey = privateKey.trim();
            if (formattedKey.startsWith('"') || formattedKey.startsWith("'")) {
                formattedKey = formattedKey.slice(1);
            }
            if (formattedKey.endsWith('"') || formattedKey.endsWith("'")) {
                formattedKey = formattedKey.slice(0, -1);
            }
            formattedKey = formattedKey.replace(/\\n/g, '\n');

            return initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey: formattedKey,
                }),
            });
        } catch (e: any) {
            console.error("[Firebase Admin] Initialization error:", e.message);
        }
    } else {
        console.warn("[Firebase Admin] Missing environment variables. Initialization skipped.");
    }
    return null;
}

function getAdminDb(): Firestore {
    if (getApps().length === 0) {
        const app = getOrInitAdminApp();
        if (!app) {
            // Return safe mock to prevent build failures when env vars are absent during static analysis
            return {
                collection: () => ({
                    orderBy: () => ({
                        get: async () => ({ docs: [] })
                    }),
                    add: async () => ({}),
                    doc: () => ({
                        set: async () => ({}),
                        update: async () => ({}),
                        get: async () => ({ exists: false, data: () => ({}) })
                    })
                })
            } as any;
        }
    }
    try {
        return getFirestore();
    } catch {
        return {
            collection: () => ({
                orderBy: () => ({
                    get: async () => ({ docs: [] })
                }),
                add: async () => ({}),
                doc: () => ({
                    set: async () => ({}),
                    update: async () => ({}),
                    get: async () => ({ exists: false, data: () => ({}) })
                })
            })
        } as any;
    }
}

function getAdminAuth(): Auth {
    if (getApps().length === 0) {
        getOrInitAdminApp();
    }
    try {
        return getAuth();
    } catch {
        return {} as any;
    }
}

export const adminDb = new Proxy({} as Firestore, {
    get(_target, prop) {
        const db = getAdminDb();
        const value = (db as any)[prop];
        return typeof value === 'function' ? value.bind(db) : value;
    }
});

export const adminAuth = new Proxy({} as Auth, {
    get(_target, prop) {
        const auth = getAdminAuth();
        const value = (auth as any)[prop];
        return typeof value === 'function' ? value.bind(auth) : value;
    }
});
