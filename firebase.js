import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd8cy3BQ3MpO8t2xKmOkmMWrUtjGxt_AU",
  authDomain: "signal-fd901.firebaseapp.com",
  projectId: "signal-fd901",
  storageBucket: "signal-fd901.appspot.com",
  messagingSenderId: "199441386270",
  appId: "1:199441386270:web:2bc8835449da4d0043170f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth()

export { db, auth }