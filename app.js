//Libs
import express from "express";
//Modules


const app = express();
const PORT = 8080;

app.use(express.json());

app.post('/user', (req, res) => {
    const data = req.body
    const userRef = db.collection('User').add
})

app.listen(PORT, err => {
    if(err){
        console.log("Erro ao iniciar o servidor")
        return err
    }else{
        console.log(`Servido rodando na porta ${PORT}`);
    }
});