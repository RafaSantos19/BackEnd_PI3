import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { adminAuth } from "./firebaseAdmin.js"

class DoAuth {

    async doCreateUserWithEmailAndPassword(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            return userCredential;
        }).catch(err => {
            console.error("(Auth) Erro ao criar usuário: ", err);
            throw err;
        });
    };

    async doSignInWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return userCredential;
        }).catch((error) => {
            console.error("Erro ao fazer login: ", error);
            throw error;
        });
    };

    async doSignOut() {
        return signOut(auth).then(() => {
            return true;
        }).catch(err => {
            console.error("Erro ao sair: ", err);
        });

    };

    async doPasswordReset(email) {
        return sendPasswordResetEmail(auth, email).then(() => {
            return true;
        }).catch(error => {
            console.error("Erro ao enviar e-mail de redefinição de senha: ", error);
            throw error;
        });
    }

    async doDeleteUser(uid) {
        try {
            await adminAuth.deleteUser(uid);
            return true;
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error);
            throw error;
        }
    }

    async doSendEmailVerification(user) {
        try {
          return await sendEmailVerification(user, {
            url: 'http://localhost:5173/login'
          });
        } catch (error) {
          console.error("Erro ao enviar e-mail de verificação: ", error);
          throw error;
        }
      }

};

export default DoAuth;
