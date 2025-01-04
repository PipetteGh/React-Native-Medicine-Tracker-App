// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmHTyjQvFVeT_tGhT4BUXSc4-xjWmlIWA",
  authDomain: "medicine-tracker-54475.firebaseapp.com",
  projectId: "medicine-tracker-54475",
  storageBucket: "medicine-tracker-54475.firebasestorage.app",
  messagingSenderId: "694230399148",
  appId: "1:694230399148:web:94a852cc3b2624620a8709",
  measurementId: "G-WYVCK9W4XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);