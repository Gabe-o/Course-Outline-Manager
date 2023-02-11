// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdL05Y5FHCJhSha3LvZ-urtSttLhQNzCM",
    authDomain: "se3350-7172b.firebaseapp.com",
    projectId: "se3350-7172b",
    storageBucket: "se3350-7172b.appspot.com",
    messagingSenderId: "391588091227",
    appId: "1:391588091227:web:b5a8c45344ac9221eff67e",
    measurementId: "G-2VRKYG5ETT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);