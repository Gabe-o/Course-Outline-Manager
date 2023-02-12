// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtQdT_-8_R1KUo9T3DIoVNFLxVCa_qk_I",
    authDomain: "se3350-508c4.firebaseapp.com",
    projectId: "se3350-508c4",
    storageBucket: "se3350-508c4.appspot.com",
    messagingSenderId: "383673428382",
    appId: "1:383673428382:web:db2981609a6093b4b70e8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);