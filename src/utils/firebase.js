// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "some_key",
  authDomain: "netflixgpt-4bf93.firebaseapp.com",
  projectId: "netflixgpt-4bf93",
  storageBucket: "netflixgpt-4bf93.appspot.com",
  messagingSenderId: "75916125892",
  appId: "1:75916125892:web:98c503a86c013ff59d4b91",
  measurementId: "G-M8B2VN84FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth()