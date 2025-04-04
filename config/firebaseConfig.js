import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjFzANtxlO23j74st1POES-ICrU8C8nc8",
  authDomain: "sem3-project-7fc4a.firebaseapp.com",
  projectId: "sem3-project-7fc4a",
  storageBucket: "sem3-project-7fc4a.firebasestorage.app",
  messagingSenderId: "905514675942",
  appId: "1:905514675942:web:97000d0113a6235bea1527"
};

const app = initializeApp(firebaseConfig);

// Persistent Auth Setup
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
