import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_cJA4pV5wnOTbByj6tooCnl7CazaQhAQ",
  authDomain: "team-project-b50a9.firebaseapp.com",
  projectId: "team-project-b50a9",
  storageBucket: "team-project-b50a9.firebasestorage.app",
  messagingSenderId: "260770492334",
  appId: "1:260770492334:web:4c9ffb2f7310a6141a223f",
  measurementId: "G-5DN4SVMB4P"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
