import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "fake",
  authDomain: "fake",
  projectId: "fake",
  storageBucket: "fake",
  messagingSenderId: "fake",
  appId: "fake",
  measurementId: "fake"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
