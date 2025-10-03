// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "nextjs-project-ea587.firebaseapp.com",
  projectId: "nextjs-project-ea587",
  storageBucket: "nextjs-project-ea587.firebasestorage.app",
  messagingSenderId: "321179758775",
  appId: "1:321179758775:web:e3b753741ccfbdd86ddd32",
  measurementId: "G-WNEN7X4RLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app , '(default)')
