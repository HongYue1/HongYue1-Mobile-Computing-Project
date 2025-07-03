// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "harvesthub-1cf29.firebaseapp.com",
  projectId: "harvesthub-1cf29",
  storageBucket: "harvesthub-1cf29.firebasestorage.app",
  messagingSenderId: "343971776849",
  appId: "1:343971776849:web:22abdfb2fab0b4aa986b70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use persistent auth for React Native
const auth =
  typeof window === "undefined"
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(app);

// Export Auth and Firestore
export { auth };
export const db = getFirestore(app);