import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAOGikdo0E8mp9f7IzfijLbXOYmmKorb5U",
  authDomain: "miniblog-c3459.firebaseapp.com",
  projectId: "miniblog-c3459",
  storageBucket: "miniblog-c3459.appspot.com",
  messagingSenderId: "143677053519",
  appId: "1:143677053519:web:0a29243929fcc50812e83a",
  measurementId: "G-MQPRMQD44K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }