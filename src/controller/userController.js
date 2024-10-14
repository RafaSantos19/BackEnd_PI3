import User from '../models/userModel.js'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class UserController{

    async createUser(req, res){
          const {name, email, password, phone} = req.body;

          if(!name || !email || !password || !phone){
            console.log("Informações invalidas");
            res.status(400).json({message: "Informações invalidas"});
          };

          const user = new User(name, email, password, phone)

          try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            res.status(201).json(({message: "Usuário criado com sucesso"}))
          } catch (error) {
            console.error(error);
            res.status(500).json({error});
          };
    };
};

export default UserController;