import express from "express";
import UserController from "../controller/userController.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/create", userController.createUser.bind(userController))

export default userRouter;
