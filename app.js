import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { firebaseApp } from "./src/config/firebaseConfig.js";
import userRouter from "./src/routes/userRouter.js";

firebaseApp

dotenv.config();

const app = express();
const port = process.env.PORT;
//FIXME:const port = process.env.PORT;

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