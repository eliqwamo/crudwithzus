import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAztSlmLwNeWjJJCgWkzo_QEoLaCV6Sew",
  authDomain: "crudtastic-eb53a.firebaseapp.com",
  projectId: "crudtastic-eb53a",
  storageBucket: "crudtastic-eb53a.appspot.com",
  messagingSenderId: "681543268351",
  appId: "1:681543268351:web:9d3cbd6fd903cbc8f4d9ca"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);