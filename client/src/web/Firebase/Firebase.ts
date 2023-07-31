// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, deleteObject, ref, uploadBytes, getDownloadURL  } from "firebase/storage"
import { getDatabase } from 'firebase/database';
import { getFirestore } from '@firebase/firestore'
import { v4 } from 'uuid'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app)

export function createFileName(file: File) {
    return `notes/${file.name + v4()}`
}

export async function uploadPDFAndGetURL(file: File, fileName: string): Promise<string> {
    const fileRef = ref(storage, fileName)
    try {
      const snapshot = await uploadBytes(fileRef, file) // Upload the PDF to Firebase Cloud Storage
      const downloadURL = await getDownloadURL(snapshot.ref) // Get the download URL of the uploaded PDF
      return downloadURL as string
    } catch (error) {
      throw error;
    }
}

export async function cleanStorage(fileName: string) {
    const fileRef = ref(storage, fileName)
    deleteObject(fileRef).then((res) => {
        console.log("Deleted File")
    }).catch((err) => {
        console.log("Error Occured")
    })
}