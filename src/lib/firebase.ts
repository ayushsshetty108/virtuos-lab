import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaXvv4BNC-_W_fhOrHilPdCNmUPuDlfCc",
  authDomain: "virtuos-lab.firebaseapp.com",
  projectId: "virtuos-lab",
  storageBucket: "virtuos-lab.firebasestorage.app",
  messagingSenderId: "499100431808",
  appId: "1:499100431808:web:c12579308bc16e13354425",
  measurementId: "G-WB8MLLM5Z6",
};

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
export default app;
