import User from "../models/userModel.js";
import { db } from "../config/firebaseConfig.js"

class UserController{
    constructor(){}

    async createUser(req, res){
        const user = new User(req.body);
        
    }
}

export default UserController;