import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

class Database {

    //TODO:Otimizar este método
    async addUserDocument(user, docId = null) {
        const data = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }

        console.log("Teste de DATA: ", data)

        if (docId) {
            // Cria ou substitui o documento usando o ID fornecido
            const documentRef = doc(db, 'user', docId);
            await setDoc(documentRef, data);
        } else {
            // Adiciona um documento com ID automático
            const myCollection = collection(db, 'user');
            await addDoc(myCollection, data);
        }
    }

    async getDocumentById(collection, id) {
        const docRef = db.collection(collection).doc(id);
        return docRef.get().then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log("Documento não encontrado");
                return null;
            }
        }).catch(err => {
            console.error("Erro ao buscar documento: ", err);
            throw err;
        });
    }

    async updateDocument(collection, id, data) {
        const docRef = db.collection(collection).doc(id);
        return docRef.update(data).then(() => {
            console.log("Documento atualizado com sucesso!!");
        }).catch(err => {
            console.error("Erro ao atualizar documento: ", err);
            throw err;
        });
    }

    async deleteDocument(collection, id) {
        const docRef = db.collection(collection).doc(id);
        return docRef.delete().then(() => {
            console.log("Documento deletado com sucesso!");
        }).catch(err => {
            console.error("Erro ao deletar documento: ", err);
            throw err;
        });
    }

}

export default Database;
