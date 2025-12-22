import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "regium-innovations.firebaseapp.com",
  projectId: "regium-innovations",
  storageBucket: "regium-innovations.firebasestorage.app",
  messagingSenderId: "451217899518",
  appId: "1:451217899518:web:ae5a7d43d2ca1f46184aaf",
  measurementId: "G-5W08WSP2M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider()
export {auth,authProvider}