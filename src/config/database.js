import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    deleteDoc, 
    collection, 
    addDoc, 
    where, 
    getDocs, 
    query } from 'firebase/firestore';

import { db } from './firebaseConfig.js';

class Database {

    async addUserDocument(user, docId = null) {
        const data = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };

        try {
            if (docId) {
                const documentRef = doc(db, 'user', docId);
                await setDoc(documentRef, data);
            } else { 
                const myCollection = collection(db, 'user');
                await addDoc(myCollection, data);
            }
        } catch (error) {  
            console.error("Erro ao adicionar documento:", error);
            throw error;
        }
    }

    async addCalendarDocument(data, docId = null){
        try {
            if (docId) {
                const documentRef = doc(db, 'agendamentos', docId);
                await setDoc(documentRef, data);
            } else { 
                const myCollection = collection(db, 'agendamentos');
                await addDoc(myCollection, data);
            }
        } catch (error) {
            console.error("Erro ao adicionar documento:", error);
            throw error;
        }
    }

    async getDocumentById(collectionName, id) {
        try {
            const docRef = doc(db, collectionName, id); 
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

    async listUserEvents(email){
        try {
            const myCollection = collection(db, "agendamentos");
            const queryData = query(myCollection, where("email", "==", email));

            const querySnapshot = await getDocs(queryData);
            const userEvents = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return userEvents;
        } catch (error) {
            console.error("Erro ao buscar enventos: ", error);
            return [];
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
        } catch (error) {
            console.error("Erro ao deletar documento: ", error);
            throw error;
        }
    }

}

export default Database;
