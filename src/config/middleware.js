import { adminAuth } from "./firebaseAdmin.js"; // Seu admin SDK

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        req.uid = decodedToken.uid; // UID disponível para outras operações
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
};

export default verifyToken;
