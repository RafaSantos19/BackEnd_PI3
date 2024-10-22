import DoAuth from "../config/auth.js";

class UserRepository {
    constructor() {
        this.doAuth = new DoAuth();
    }

    async createUser(user) {
        this.doAuth.doCreateUserWithEmailAndPassword(user.email, user.password).then((userCredential) => {
            const user = userCredential.user;
            // const { uid } = userCredential.user;
            return userCredential;
        }).catch((err) => {
            console.error(err);
        });

        /*
        FIXME: ERRO --> collection não é uma function
        Possível solução -- Incapsular os métodos de manipulação de dados do firestore em uma classe

        await dataBase.collection('Users').doc(uid).set({
            iud
             name,
             email,
             phone,
             createdAt: new Date(),
         });
        */
    };

    async signInUser(user) {
        this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
            const user = userCredential.user
        }).catch((err) => {
            console.error(err);
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

    async sendPasswordResetEmail(email){
        return this.doAuth.sendPasswordResetEmail(email).then( result => {
            console.log("Teste de email: ", result);
        }).catch( err => {
            console.error("Erro de email: ", err);
        });
    }

}

export default UserRepository;