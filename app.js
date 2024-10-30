import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { firebaseApp } from "./src/config/firebaseConfig.js";
import userRouter from "./src/routes/userRouter.js";

//TODO: Criar uma classe de preFligtCheck

//FIXME:Campo de testes

import Database from "./src/config/database.js";
import DoAuth from "./src/config/auth.js";

const doAuth = new DoAuth();
const database = new Database();
const uid = "2RIipQeCy1Z4A0MwiXH3UbCCc1N2"

//doAuth.doDeleteUser(uid)
database.deleteDocument('user', uid)

//FIXME:Campo de testes

firebaseApp

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter)

app.listen(port, err => {
    if(err){
        console.log("Erro ao iniciar o servidor")
        return err
    }else{
        console.log(`Servido rodando na porta ${port}`);
    }
});