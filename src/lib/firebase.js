// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaXvv4BNC-_W_fhOrHilPdCNmUPuDlfCc",
  authDomain: "virtuos-lab.firebaseapp.com",
  projectId: "virtuos-lab",
  storageBucket: "virtuos-lab.firebasestorage.app",
  messagingSenderId: "499100431808",
  appId: "1:499100431808:web:c12579308bc16e13354425",
  measurementId: "G-WB8MLLM5Z6",
};

// Initialize Firebase (singleton — safe for Next.js hot reload)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics only runs in the browser (not during SSR)
let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
export default app;
