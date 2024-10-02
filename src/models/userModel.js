import {db} from '../config/firebaseConfig.js'

class UserModel {
    constructor(){}

    async createUser(data){
        db.collection('Users').add(data)
    }
   
}

export default UserModel