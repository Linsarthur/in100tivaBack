import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import Tarefa from "./schemas/Tarefa.js";
import cors from "cors"

dotenv.config()

const app = express();
const port = 3000;
app.use(cors());


app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado ao mongo db");
    } catch (error) {
        console.log("Erro ao conectado com o banco de dados", error);

    }

};
connectDB();

app.post("/tarefas", async (req, res) => {
    try {
        const novaTarefa = await Tarefa.create(req.body)
        res.json(novaTarefa)
    } catch (error) {
        console.error(error); // Vê no console também
        res.status(500).json({
            erro: error.message,
            details: error
        })
    }
})

app.get("/tarefas", async (req, res) => {
    try {
        const tarefas = await Tarefa.find(req.body)
        res.json(tarefas)
    } catch (error) {
        res.send({ error: error })
    }
})

app.get("/tarefas/:id", async (req, res) => {

    try {
        const tarefa = await Tarefa.findById(req.params.id)
        if (!tarefa) {
            res.json({ message: "Tarefa não encontrada" })
        } else {
            res.json({ "Tarefa encontrada": tarefa })
        }
    } catch (error) {
        res.send({ error: error.message })
    }
})

app.put("/tarefas/:id", async (req, res) => {
    try {
        const novaTarefaAtualizada = await Tarefa.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!novaTarefaAtualizada) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        res.json(novaTarefaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/tarefas/:id", async (req, res) => {
    try {
        await Tarefa.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: "Tarefa excluída" })
    } catch (error) {
        res.send({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);

})

