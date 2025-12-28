import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApCM0Fsa7SFe2rhW-We7N2N5cjVN22WIU",
  authDomain: "xprintlogistics.firebaseapp.com",
  projectId: "xprintlogistics",
  storageBucket: "xprintlogistics.firebasestorage.app",
  messagingSenderId: "184105229978",
  appId: "1:184105229978:web:3f253bae8db378a9eb4923"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
