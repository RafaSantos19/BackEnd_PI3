import admin from 'firebase-admin';
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

//TODO: Guardar a chave de acesso em um servidor

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.APP_STORAGE_BUCKET
});

const auth = getAuth(firebaseApp);
const db = admin.firestore();

export {admin, auth, db, firebaseApp};