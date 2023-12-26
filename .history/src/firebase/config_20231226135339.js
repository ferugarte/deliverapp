// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfNqnGX9jnsCuIXugoWL9mR_E1YnLALCE",
  authDomain: "deliverapp-1fc04.firebaseapp.com",
  projectId: "deliverapp-1fc04",
  storageBucket: "deliverapp-1fc04.appspot.com",
  messagingSenderId: "341484835756",
  appId: "1:341484835756:web:c15c49beca6d51e581a009",
  measurementId: "G-FSL64LZYFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);