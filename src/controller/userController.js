import User from '../models/userModel.js'
import UserRepository from '../repository/userRepository.js';

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req, res) {

    /*
    FIXME: essas informações só são uteis caso consiga guarda-las no banco.

    Erro ao usar o método "dataBase" -- collection()
  
    const {name, email, password, phone} = req.body;

    if(!name || !email || !password || !phone){
    console.log("Informações invalidas");
    res.status(400).json({message: "Informações invalidas"});
    };

    const user = new User(name, email, password, phone)
    */

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Informações invalidas");
      res.status(400).json({ message: "Informações invalidas" });
    };

    const user = new User(email, password)

    this.userRepository.createUser(user).then(() => {
      res.status(201).json({ message: "Usuário criado com sucesso" })
    }).catch(err => {
      res.status(500).json(err)
    });
  }

  async signIn(req, res) {
    //TODO: Pode criar um método de validação e chamalo novamente para reaproveitar código
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Informações invalidas");
      res.status(400).json({ message: "Informações invalidas" });
    };

    const user = new User(email, password)

    this.userRepository.signInUser(user).then(() => {
      res.status(200).json({ message: "Login Bem sucedido" });
    }).catch(err => {
      res.status(500).json(err);
    });
  }

  async singOut(req, res) {
    this.userRepository.signOutUser().then(() => {
      res.status(200).json({ message: "Usuário deslogado com sucesso" })
    }).catch((err) => {
      res.status(500).json({ message: "Erro ao deslogar usuário", error: err })
    });
  }

  async sendPasswordResetEmail(req, res) {
    const { email } = req.body;

    this.userRepository.sendPasswordResetEmail(email).then((link) => {
       res.status(200).json({ message: 'Email de recuperação enviado com sucesso!' });
    }).catch((error) => {
      return res.status(500).json({ error: 'Erro ao enviar email de recuperação', details: error.message });
    });
  }

}

export default UserController;