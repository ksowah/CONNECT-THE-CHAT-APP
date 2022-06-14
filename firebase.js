// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBKYeBColkGBaVhH068Fbb5bAj5G3XvKz8",
  authDomain: "connect-bacc3.firebaseapp.com",
  projectId: "connect-bacc3",
  storageBucket: "connect-bacc3.appspot.com",
  messagingSenderId: "416147349063",
  appId: "1:416147349063:web:cdddd0d5bbe8c890e85b62",
  storageBucket: "connect-bacc3.appspot.com"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore() 
const auth = getAuth()
const storage = getStorage()

export { db, auth, storage }