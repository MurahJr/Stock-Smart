import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApldvGY1uEabDSSj8WmR-2YSN8foH0NPI",
  authDomain: "pantry-tracker-55d63.firebaseapp.com",
  projectId: "pantry-tracker-55d63",
  storageBucket: "pantry-tracker-55d63.appspot.com",
  messagingSenderId: "884632155579",
  appId: "1:884632155579:web:fb9a049af6996caba5c09e",
  measurementId: "G-4VBR3LTTNE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);