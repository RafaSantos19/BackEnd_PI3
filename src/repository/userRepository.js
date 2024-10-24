import { doc, setDoc } from "firebase/firestore";
import DoAuth from "../config/auth.js";
import { dataBase } from "../config/firebaseConfig.js";


class UserRepository {
    constructor() {
        this.doAuth = new DoAuth();
    }

    async createUser(user) {
        try {
            const userCredential = await this.doAuth.doCreateUserWithEmailAndPassword(user.email, user.password);
            const uid = userCredential.uid;

            console.log('Usuário criado no Firebase Auth, UID:', uid);

            // Usando doc() e setDoc() explicitamente
            await setDoc(doc(dataBase, 'USER', uid), {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                createdAt: new Date(),
            });

            console.log("Usuário e dados salvos com sucesso no Firestore");
            return userCredential;
        } catch (err) {
            console.error("Erro ao criar usuário ou salvar dados: ", err);
            throw err;
        }
    }

    async getUserProfile(uid) {
        try {
            const userDocRef = doc(dataBase, 'USER', uid);
            const userDoc = await getDoc(userDocRef);
            return userDoc;
        } catch (err) {
            console.error("Erro ao buscar dados do Firestore: ", err);
            throw err;
        }
    }

    async signInUser(user) {
        return this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
            const user = userCredential.user
            return user;
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    }

    async signOutUser() {
        return this.doAuth.doSignOut().then((result) => {
            console.log("Usuário deslogado", result)
            return result;
        }).catch((err) => {
            console.error("Erro ao deslogar o usuário", err)
            throw err;
        });
    };

    async sendPasswordResetEmail(email) {
        return this.doAuth.doPasswordReset(email)
            .then(() => {
                console.log("Email de recuperação enviado");
            }).catch((err) => {
                console.error("Erro ao enviar email de recuperação: ", err);
                throw err;
            });
    }
}

export default UserRepository;
