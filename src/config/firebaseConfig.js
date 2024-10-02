import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 pass
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
