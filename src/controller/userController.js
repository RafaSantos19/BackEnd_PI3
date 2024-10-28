import User from '../models/userModel.js'
import UserRepository from '../repository/userRepository.js';

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req, res) {

    const {name, lastName, email, password, phone} = req.body;

    if(!name || !lastName || !email || !password || !phone){
      return  res.status(400).json({message: "Informações invalidas"});
    };

    const user = new User(name, lastName, email, password, phone);

    this.userRepository.createUser(user).then(() => {
      res.status(201).json({ message: "Usuário criado com sucesso" })
    }).catch(err => {
      res.status(500).json(err)
    });
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Informações inválidas" });
    }

    const user = { email, password };

    try {
        const { userInfo, idToken } = await this.userRepository.signInUser(user);
        res.status(200).json({
            message: "Login realizado com sucesso",
            userInfo,
            token: idToken
        });
    } catch (err) {
        console.error("Erro ao fazer login:", err); // Log detalhado para análise
        res.status(500).json({ message: "Erro ao fazer login", error: err.message });
    }
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

    if (!email) {
      return res.status(400).json({ message: "Email é necessário" });
    }

    try {
      await this.userRepository.sendPasswordResetEmail(email);
      res.status(200).json({ message: "Email de recuperação enviado" });
    } catch (error) {
      console.error("Erro ao enviar email de recuperação: ", error);
      res.status(500).json({ message: "Erro ao enviar email de recuperação" });
    }
  }

}

export default UserController;