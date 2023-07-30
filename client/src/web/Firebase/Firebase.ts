// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUVJVqlx_5VSQ9LPofvZXb1koFV-ShWWM",
    authDomain: "notesapp-bf7b2.firebaseapp.com",
    databaseURL: "https://notesapp-bf7b2-default-rtdb.firebaseio.com",
    projectId: "notesapp-bf7b2",
    storageBucket: "notesapp-bf7b2.appspot.com",
    messagingSenderId: "397140551026",
    appId: "1:397140551026:web:79a823b580315ceea9e9eb",
    measurementId: "G-2XCYK2QHG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
