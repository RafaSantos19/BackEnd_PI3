import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithPopup,
    updatePassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

/*
TODO:
Melhorar o tratamento de erros

*/

class DoAuth {

    async doCreateUserWithEmailAndPassword(email, password) {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            throw error; // Repropaga o erro para ser tratado posteriormente
        }
    };

    async doSignInWithEmailAndPassword(email, password) {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            throw error;
        }
    };

    async doSignInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // TODO: result.user --> Guardar informação do usuário no firestore
            return result;
        } catch (error) {
            console.error("Erro ao fazer login com Google: ", error);
            throw error;
        }
    };

    async doSignOut() {
        try {
            return await auth.signOut();
        } catch (error) {
            console.error("Erro ao sair: ", error);
            throw error;
        }
    };

    //TODO: Implemetar os métodos abaixo -- Testalos

    async doPasswordReset(email) {
        try {
            return await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Erro ao enviar e-mail de redefinição de senha: ", error);
            throw error;
        }
    };

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
