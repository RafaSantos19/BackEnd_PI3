import express from "express";
import UserController from "../controller/userController.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser.bind(userController));
userRouter.post("/signin", userController.signIn.bind(userController));
userRouter.post("/logout", userController.singOut.bind(userController));
userRouter.post("/forgot-password", userController.forgotPassword.bind(userController));

export default userRouter;
