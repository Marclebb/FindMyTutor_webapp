// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDyLbpJSXAR2_xCz7XLIA_pjFvQGuw1qKI",
  authDomain: "findmytutor-4dbeb.firebaseapp.com",
  projectId: "findmytutor-4dbeb",
  storageBucket: "findmytutor-4dbeb.appspot.com",
  messagingSenderId: "130798461610",
  appId: "1:130798461610:web:f7c78a90dba755d7a1e6d3",
  measurementId: "G-MEYQWZK5W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);