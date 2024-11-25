import User from '../models/userModel.js'
import UserRepository from '../repository/userRepository.js';
import Database from '../config/database.js';

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.database = new Database()
  }
  //TODO: Crie um método de validação de campos para deixar o código mais limpo

  async createUser(req, res) {
    const { name, lastName, email, password, phone } = req.body;

    if (!name || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: "Informações inválidas" });
    }

    const user = new User(name, lastName, email, password, phone);

    try {
      // Cria o usuário e obtém as credenciais do usuário
      const userCredential = await this.userRepository.createUser(user);

      // Envia o e-mail de verificação
      await this.userRepository.sendEmailVerification(userCredential.user);

      res.status(201).json({ message: "Usuário criado com sucesso. Verifique seu e-mail para ativar a conta." });
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).json({ message: "Erro ao criar usuário", error: err.message });
    }
  }

  //TODO: Otimizar esse método
  async signIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Informações inválidas" });
    }

    try {
      const user = await this.userRepository.signInUser({ email, password });
     
      // Verifique se o e-mail foi verificado
      if (!user.emailVerified) {
        return res.status(403).json({ message: "E-mail não verificado. Verifique seu e-mail para ativar a conta." });
      }

      const userData = await this.database.getDocumentById('user', user.uid);
      // Gera o token apenas se o e-mail for verificado
      const idToken = await user.getIdToken();
      res.status(200).json({
        message: "Login realizado com sucesso",
        token: idToken,
        userEmail: userData.email,
        userPhone: userData.phone,
        userName: `${userData.name} ${userData.lastName}`
      });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).json({ message: "Erro ao fazer login", error: err.message });
    }
  }

  async getUserProfile(req, res) {
    try {
      const uid = req.uid;

      const userData = await this.userRepository.getUserById(uid);
      if (!userData) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
      res.status(500).json({ message: "Erro ao buscar perfil do usuário" });
    }
  }

  async updateUserProfile(req, res) {
    try {
      const uid = req.uid;
      const userData = req.body;

      await this.userRepository.updateUser(uid, userData);

      res.status(200).json({ message: "Dados atualizados com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar perfil do usuário:", error);
      res.status(500).json({ message: "Erro ao atualizar perfil do usuário" });
    }
  }

  //TODO: Otimizar esse método
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

  async deleteUser(req, res) {
    try {
      const uid = req.uid;

      await this.userRepository.deleteUser(uid);

      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }

  async singOut(req, res) {
    this.userRepository.signOutUser().then(() => {
      res.status(200).json({ message: "Usuário deslogado com sucesso" })
    }).catch((err) => {
      res.status(500).json({ message: "Erro ao deslogar usuário", error: err })
    });
  }

}

export default UserController;