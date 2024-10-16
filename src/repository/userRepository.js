import { dataBase } from "../config/firebaseConfig.js";
import DoAuth from "../config/auth.js";

class UserRepository{
    constructor(){
        this.doAuth = new DoAuth();
    }

    async createUser(user){
            this.doAuth.doCreateUserWithEmailAndPassword(user.email, user.password).then( (userCredential) => {
                const user = userCredential.user;
             // const { uid } = userCredential.user;
                return userCredential;
            }).catch( (err) => {
                console.error(err);
            });

            /*
            FIXME: ERRO --> collection não é uma function
            Possível solução -- Incapsular os métodos de manipulação de dados do firestore em uma classe

            await dataBase.collection('Users').doc(uid).set({
                name,
                 email,
                 phone,
                 createdAt: new Date(),
             });
            */

    };

    async signInUser(user){
       return this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then( (userCredential) => {
            const user = userCredential.user
           return user;
        }).catch( (err) => {
            console.error(err);
           throw err;
        });
    }

    async signOutUser(){
        return this.doAuth.doSignOut().then( (result) => {
            console.log("Usuário deslogado", result)
            return result;
        }).catch( (err) => {
            console.error("Erro ao deslogar o usuário", err)
            throw err;
        });
    };


}

export default UserRepository;
