import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

/*
TODO:
Melhorar o tratamento de erros -- then().catch
*/

class DoAuth {

    async doCreateUserWithEmailAndPassword(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Cadastro realizado com sucesso",)
            return userCredential.user;
        }).catch((err) => {
            console.error("Erro ao criar usuário: ", err);
            throw err;
        });
    };

    async doSignInWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Login realizado com sucesso: ", userCredential.user);
            return userCredential.user;
        }).catch((error) => {
            console.error("Erro ao fazer login: ", error);
            throw error;
        });
    };

    async doSignOut() {
        return auth.signOut().then(() => {
            console.log("Deslogado com sucesso");
            return true;
        }).catch(err => {
            console.error("Erro ao sair: ", err);
        });

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
