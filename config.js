import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyCziZN106WaEm-vWlcQ8vxI6Y-TZcGZFBQ",
    authDomain: "hackathon-6995d.firebaseapp.com",
    projectId: "hackathon-6995d",
    storageBucket: "hackathon-6995d.appspot.com",
    messagingSenderId: "531344828576",
    appId: "1:531344828576:web:0b833fb08d45412d5f81c5",
    measurementId: "G-RQDR1CD823"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
  