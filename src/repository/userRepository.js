import DoAuth from "../config/auth.js";
import Database from "../config/database.js";

class UserRepository {
    constructor() {
        this.doAuth = new DoAuth();
        this.database = new Database();
    }

    async createUser(user) {
       return this.doAuth.doCreateUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
            const userInfo = userCredential.user;
            //const uid = userInfo.uid;
            /*
            const userData = {
                uid: uid,
                email: user.email,
                name: user.name,
                phone: user.phone,
                createAt: new Date(),
            }
            */

            return this.database.addDocument('USER', user).then(docId => {
                console.log("Usuário criado com sucesso e salvo no firestore", docId);
                return userCredential;
            });
        }).catch(err => {
            console.error("Erro ao criar usuário: ", err);
        });
    };

    async signInUser(user) {
        return this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then(userCredential => {
            //Pega os dados do Firestore
            /*
            const userInfo = userCredential.user;
            return this.database.getDocumentById('USER', userInfo.uid)
                .then((userData) => {
                    if (userData) {
                        console.log("Usuário logado com sucesso", userData);
                        return { ...userInfo, ...userData };
                    } else {
                        console.error("Usuário não encontrado no Firestore");
                        return null;
                    }
                });
            */
           return userCredential;
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    }

    async updateUser(uid, userData){
        return this.database.updateDocument("USER", uid, userData).then( () => {
            console.log("Dados do usuário atualizados com sucesso");
            return true;
        }).catch( err => {
            console.error("Erro ao atualizar dados do usuário: ", err);
            throw err;
        });
    }

    async getUserById(uid){
        return this.database.getDocumentById("USER", uid).then( userData => {
            if(userData) {
                console.log("Dados do usuário encontrados", userData);
                return userData;
            } else {
                console.error("Usuário não encontrado no Firestore");
                return null;
            }
        }).catch(err => {
            console.error("Erro ao buscar dados do usuário: ", err);
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

}

export default UserRepository;
