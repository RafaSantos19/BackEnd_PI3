import express from "express";
import UserController from "../controller/userController.js";
import verifyToken from "../config/middleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser.bind(userController));
userRouter.post("/signin", userController.signIn.bind(userController));
userRouter.post("/logout", userController.singOut.bind(userController));
userRouter.post("/forgot-password", userController.sendPasswordResetEmail.bind(userController));
userRouter.delete("/delete", verifyToken, userController.deleteUser.bind(userController));
userRouter.get("/get", verifyToken, userController.getUserProfile.bind(userController));
userRouter.put("/update", verifyToken, userController.updateUserProfile.bind(userController));

export default userRouter;