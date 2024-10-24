import User from '../models/userModel.js'
import UserRepository from '../repository/userRepository.js';
import { getAuth } from "firebase-admin/auth";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req, res) {
    const { name, lastName, email, phone, password } = req.body;

    if (!name || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const user = { name, lastName, email, phone, password };

    try {
      await this.userRepository.createUser(user);
      res.status(201).json({ message: "Usuário criado e salvo com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar o usuário", error: err });
    }
  }

  async getUserProfile(req, res) {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extrai o token JWT do cabeçalho

    if (!idToken) {
      return res.status(401).json({ message: "Token de autenticação não fornecido" });
    }

    try {
      // Verifica o token JWT
      const decodedToken = await auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      // Busque os dados do usuário no Firestore ou outro banco de dados
      const userDoc = await this.userRepository.getUserProfile(uid);
      if (!userDoc.exists()) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json(userDoc.data());
    } catch (err) {
      console.error("Erro ao verificar o token ou buscar o perfil do usuário: ", err);
      res.status(500).json({ message: "Erro ao buscar perfil do usuário" });
    }
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

  async forgotPassword(req, res) {
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