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

    async signIn(user){
        this.doAuth.doSignInWithEmailAndPassword(user.email, user.password).then( (userCredential) => {
            const user = userCredential.user
        }).catch( (err) => {
            console.error(err);
        });
    }


}

export default UserRepository;