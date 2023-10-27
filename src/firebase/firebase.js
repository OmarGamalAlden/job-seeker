import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "job-seeker-5ec5b.firebaseapp.com",
  projectId: "job-seeker-5ec5b",
  storageBucket: "job-seeker-5ec5b.appspot.com",
  messagingSenderId: "384333634012",
  appId: "1:384333634012:web:b546abdba9269befb3d719",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const ResumeStorage = getStorage(firebase);
const UsersDB = getDatabase(firebase);
export { ResumeStorage, UsersDB };
