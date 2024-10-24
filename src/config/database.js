import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';

class Database {

    async addDocument(collection, data) {
        return db.collection(collection).add(data).then(docRef => {
            console.log("Documento adicionado com ID: ", docRef.id);
            return docRef.id;
        }).catch(err => {
            console.error("Erro ao adicionar documento: ", err);
            throw err;
        });
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
