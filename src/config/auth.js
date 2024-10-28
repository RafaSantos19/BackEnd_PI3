import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

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

    //TODO: Implemetar os métodos abaixo -- Testalos
    async doPasswordChange(password) {
        try {
            return await updatePassword(auth.currentUser, password);
        } catch (error) {
            console.error("Erro ao atualizar a senha: ", error);
            throw error;
        }
    };

    async doSendEmailVerification() {
        try {
            return await sendEmailVerification(auth.currentUser, { url: `${window.location.origin}/home` });
        } catch (error) {
            console.error("Erro ao enviar e-mail de verificação: ", error);
            throw error;
        }
    };

};

export default DoAuth;
