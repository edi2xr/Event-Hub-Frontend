// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9pQGjkTWJsv3b1I2VWoVePtVca7N8Qf4",
  authDomain: "eventhub-4b919.firebaseapp.com",
  projectId: "eventhub-4b919",
  storageBucket: "eventhub-4b919.firebasestorage.app",
  messagingSenderId: "750860177269",
  appId: "1:750860177269:web:0b0a5ca0e8533cb5a14d3c",
  measurementId: "G-D0X5VEE68C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => signInWithPopup(auth, provider);