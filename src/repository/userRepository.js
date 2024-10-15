import { dataBase } from "../config/firebaseConfig.js";
import DoAuth from "../config/auth.js";

class UserRepository{
    constructor(){
        this.doAuth = new DoAuth();
    }

    async createUser(user){
        const { name, email, password, phone } = user;

        try {
            // Criando usuário com email e senha
            const userCredential = await this.doAuth.doCreateUserWithEmailAndPassword(email, password);
            const { uid } = userCredential.user;

            // Salvando informações adicionais do usuário no Firestore
            await dataBase.collection('Users').doc(uid).set({
                name,
                email,
                phone,
                createdAt: new Date(),
            });

            return userCredential;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    };
}

export default UserRepository;