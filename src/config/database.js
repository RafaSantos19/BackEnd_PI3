import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

//TODO:Otimizar todos os métodos desta classe
class Database {

    /*
    TODO: Os métodos de adicionar documento precisam ser revisados quando as informações de 
    agendamento forem armazenadas. No momento este método cria somente usuários, mas tem a 
    possibilidade dele se tornar mais genérico
    */
    async addUserDocument(user, docId = null) {
        const data = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };

        console.log("Teste de DATA:", data);

        try {
            if (docId) {
                // Cria ou substitui o documento usando o ID fornecido
                const documentRef = doc(db, 'user', docId);
                await setDoc(documentRef, data);
            } else {
                // Adiciona um documento com ID automático
                const myCollection = collection(db, 'user');
                await addDoc(myCollection, data);
            }
        } catch (error) {
            console.error("Erro ao adicionar documento:", error);
            throw error;
        }
    }

    async getDocumentById(collectionName, id) {
        try {
            const docRef = doc(db, collectionName);
            const document = await getDoc(docRef);

            if(document.exists()){
                return document.data();
            } else {
                console.warn("Documento não encontrado");
                return null
            }
        } catch (error) {
            console.error("Erro ao buscar documento: ", error);
            throw error;
        }
    }

    async updateDocument(collectionName, id, data) {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, data);
            console.log("Documento atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar documento: ", error);
            throw error;
        }
    }

    async deleteDocument(collectionName, id) {
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
            console.log("Documento deletado");    
        } catch (error) {
            console.error("Erro ao deletar documento: ". error);
            throw error;
        }
    }

}

export default Database;
