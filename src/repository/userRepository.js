import DoAuth from "../config/auth.js";
import Database from "../config/database.js";

class UserRepository {
    constructor() {
        this.doAuth = new DoAuth();
        this.database = new Database();
    }

    async createUser(user) {
        return this.doAuth.doCreateUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
            const userUid = userCredential.user.uid;
            return this.database.addUserDocument(user, userUid).then(() => {
                return userCredential;
            });
        }).catch(err => {
            console.error("(Repository)Erro ao criar usuário: ", err);
            throw err;
        });
    };

    async signInUser(user) {
        return this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then(async userCredential => {
            const idToken = await userCredential.user.getIdToken()
            return idToken;
        }).catch((err) => {
            throw err;
        });
    }

    //TODO: Implementar o método de update Password e Email
    async updateUser(uid, userData) {
        return this.database.updateDocument("USER", uid, userData).then(() => {
            return true;
        }).catch(err => {
            console.error("Erro ao atualizar dados do usuário: ", err);
            throw err;
        });
    }

    async deleteUser(uid){
        return this.doAuth.doDeleteUser(uid).then( () => {
            return this.database.deleteDocument('user', uid).then( () => {
                return true;
            }).catch(err => {
                throw err;
            })
        }).catch(err => {
            throw err;
        })
    }

    async getUserById(uid) {
        return this.database.getDocumentById("USER", uid).then(userData => {
            if (userData) {
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

    async sendPasswordResetEmail(email) {
        return this.doAuth.doPasswordReset(email).then(() => {
            return true;
        }).catch(err => {
            console.error("Erro ao enviar e-mail de recuperação", err);
            throw err
        });
    }

    async signOutUser() {
        return this.doAuth.doSignOut().then(() => {
            return true;
        }).catch((err) => {
            console.error("Erro ao deslogar o usuário", err)
            throw err;
        });
    };

}

export default UserRepository;

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