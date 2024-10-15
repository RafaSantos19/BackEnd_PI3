import User from '../models/userModel.js'
import UserRepository from '../repository/userRepository.js';

class UserController{
    constructor(){
      this.userRepository = new UserRepository();
    }

    async createUser(req, res){
          const {name, email, password, phone} = req.body;

          if(!name || !email || !password || !phone){
            console.log("Informações invalidas");
            res.status(400).json({message: "Informações invalidas"});
          };

          const user = new User(name, email, password, phone)

          console.log(user)

          this.userRepository.createUser(user).then(() => {
            res.status(200).json({message: "Usuário criado com sucesso"})
          }).catch( err => {
            res.status(500).json(err)
          })
    };
};

export default UserController;