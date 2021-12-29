// Import the functions you need from the SDKs you need
import firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqzWhc59305dH75K0Cxl9TbyeEV3Qtsbc",
  authDomain: "pro-todo-firebase.firebaseapp.com",
  projectId: "pro-todo-firebase",
  storageBucket: "pro-todo-firebase.appspot.com",
  messagingSenderId: "976305992365",
  appId: "1:976305992365:web:ecc757fa381fbb49e88c24",
  measurementId: "G-37Q96D8TPW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = firebase.firebase();
export default firebase;
//npm install -g firebase-tools
//firebase login
//firebase init
//firebase deploy
