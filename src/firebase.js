// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- დაამატე ეს
const firebaseConfig = {
  apiKey: "AIzaSyA1UnpuJPTyFUHmFSu3jH-Prcr_pPxjpk4",
  authDomain: "travela-2b496.firebaseapp.com",
  projectId: "travela-2b496",
  storageBucket: "travela-2b496.firebasestorage.app",
  messagingSenderId: "771003805792",
  appId: "1:771003805792:web:13e969741c7494b575d305",
  measurementId: "G-XWVS5SD0J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // <--- ესეც ექსპორტზე გაიტანე