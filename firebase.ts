// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpqG2GFQxQDmhz0rjib047gNBzqQcrK-I",
  authDomain: "netflix-clone-c6576.firebaseapp.com",
  projectId: "netflix-clone-c6576",
  storageBucket: "netflix-clone-c6576.appspot.com",
  messagingSenderId: "713713921694",
  appId: "1:713713921694:web:39d0d220d18e32a147558f"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }



