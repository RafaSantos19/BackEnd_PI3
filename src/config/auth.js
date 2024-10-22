import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword
} from "firebase/auth";

import { auth } from './firebaseConfig.js';

class DoAuth {

    async doCreateUserWithEmailAndPassword(email, password) {
        return  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Cadastro realizado com sucesso",)
            return userCredential.user;
        }).catch((err) => {
            console.error("Erro ao criar usuário: ", err);
            throw err;
        });

        /*
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            throw error; // Repropaga o erro para ser tratado posteriormente
        }
        */
    };


    async doSignInWithEmailAndPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("Login realizado com sucesso: ", userCredential.user);
            return userCredential.user;
        }).catch((error) => {
            console.error("Erro ao fazer login: ", error);
            throw error;
        });

        /*
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            throw error;
        }
        */
    };


    async doSignInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário cadastrado com Google: ", user);
            //TODO: Salvar as outras informações do usuário no firestore
            /*
             return setDoc(doc(dataBase, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }).then(() => {
                    console.log("Usuário salvo no Firestore");
                    return user;
                });
            */
            return user;
        }).catch((err) => {
            console.error("Erro ao cadastrar com Google: ", err);
            throw err;
        });
    };


    async doSignOut() {
        return auth.signOut().then(() => {
            console.log("Deslogado com sucesso");
            return true;
        }).catch(err => {
            console.error("Erro ao sair: ", err);
        });

        /*
        try {
            return await auth.signOut();
        } catch (error) {
            console.error("Erro ao sair: ", error);
            throw error;
        }
        */
    };


    async sendPasswordResetEmail(email){
        return sendPasswordResetEmail(email, actionCodeSettings);
    }

    //TODO: Implemetar os métodos abaixo -- Testalos

  /*
    doPasswordReset(email) {
        return sendPasswordResetEmail(auth, email).then(() => {
            console.log("E-mail de redefinição de senha enviado com sucesso.");
            return true;
        }).catch((error) => {
            console.error("Erro ao enviar e-mail de redefinição de senha: ", error);
            throw error;
        });
    }


    doPasswordChange(password) {
        return updatePassword(auth.currentUser, password).then(() => {
            console.log("Senha atualizada com sucesso.");
            return true;
        }).catch((error) => {
            console.error("Erro ao atualizar a senha: ", error);
            throw error;
        });
    }


    doSendEmailVerification() {
        return sendEmailVerification(auth.currentUser, { url: `${window.location.origin}/` }).then(() => {
            console.log("E-mail de verificação enviado com sucesso.");
            return true;
        }).catch((error) => {
            console.error("Erro ao enviar e-mail de verificação: ", error);
            throw error;
        });
    }
  */


};

export default DoAuth;
