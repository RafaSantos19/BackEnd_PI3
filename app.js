import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { firebaseApp } from "./src/config/firebaseConfig.js";
import userRouter from "./src/routes/userRouter.js";

//TODO: Criar uma classe de preFligtCheck

//FIXME:Campo de testes

import { createCalendarEvent } from "./src/services/googleCalendar.js";

const data = {
    "summary": "Reunião de Projeto",
    "location": "Sala de Conferências 1, Empresa XYZ, São Paulo, SP",
    "description": "Reunião para discutir o andamento do projeto e próximos passos.",
    "startDateTime": "2024-11-15T10:00:00-03:00",
    "endDateTime": "2024-11-15T11:00:00-03:00"
  }
  
//createCalendarEvent(data)

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