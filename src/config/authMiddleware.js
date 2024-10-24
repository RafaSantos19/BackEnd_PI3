import { auth } from "./firebaseAdminConfig.js";

const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).json({ message: "Token de autenticação não fornecido" });
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.uid = decodedToken.uid; // Adiciona o UID ao objeto req
        next(); // Se tudo estiver ok, continue para o próximo middleware ou controlador
    } catch (error) {
        res.status(403).json({ message: "Token inválido" });
    }
};

export default verifyToken;
