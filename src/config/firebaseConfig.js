import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//TODO:
/*
arrumar o .env 
*/

const firebaseConfig = {
    apiKey: "AIzaSyDocNy8YG81a1AlBgyHX0A5uUKH_iEl-Rc",
    authDomain: "studio-tailine.firebaseapp.com",
    projectId: "studio-tailine",
    storageBucket: "studio-tailine.appspot.com",
    messagingSenderId: "210313211648",
    appId: "1:210313211648:web:925d32851e79b9e7718de5",
    measurementId: "G-15SQ2CS9C4",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);