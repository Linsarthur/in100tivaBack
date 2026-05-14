# 🔧 Backend - Documentação

**Stack:** Node.js + Express + Mongoose + MongoDB  
**Deploy:** Render  
**URL:** `https://in100tivaback.onrender.com`

---

## 📁 Estrutura

```
src/
├── index.js
└── schemas/
    └── Tarefa.js
```

---

## 📊 Schema

```javascript
// src/schemas/Tarefa.js

const TarefaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    status: { type: String, default: "a fazer" }
}, { timestamps: true })
```

**Campos:**
- `titulo` - Obrigatório
- `descricao` - Opcional
- `status` - "a fazer", "em progresso", "concluído"
- `createdAt` - Automático
- `updatedAt` - Automático

---

## 🔌 Endpoints

### GET /tarefas
```
Retorna todas as tarefas
Response: [{ titulo, descricao, status, createdAt, ... }]
```

### POST /tarefas
```
Cria nova tarefa
Body: { titulo, descricao, status }
Response: { _id, titulo, descricao, ... }
```

### PUT /tarefas/:id
```
Atualiza tarefa
Body: { titulo?, descricao?, status? }
Response: { _id, titulo, ... }
```

### DELETE /tarefas/:id
```
Deleta tarefa
Response: { mensagem: "Tarefa deletada com sucesso" }
```

---

## 🚀 Instalação Local

```bash
npm install
npm start
# http://localhost:3000
```

---

## 🔐 Variáveis

**.env**
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/banco
NODE_ENV=development
PORT=3000
```

**Render:**
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/banco
NODE_ENV=production
```

---

## 🛠️ Implementação Básica

```javascript
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Tarefa from "./schemas/Tarefa.js";

const app = express();
app.use(express.json());
app.use(cors());

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI);

// GET
app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// POST
app.post("/tarefas", async (req, res) => {
  try {
    const nova = await Tarefa.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// PUT
app.put("/tarefas/:id", async (req, res) => {
  try {
    const atualizada = await Tarefa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(atualizada);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// DELETE
app.delete("/tarefas/:id", async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(process.env.PORT || 3000);
```

---

## 📦 package.json

```json
{
  "name": "back-end",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^5.x",
    "mongoose": "^9.x",
    "cors": "^2.x",
    "dotenv": "^17.x"
  }
}
```

---

## 🚀 Deploy Render

1. Push no GitHub
2. Render → New Web Service
3. Selecione repositório
4. Build: `npm install`
5. Start: `npm start`
6. Environment:
   - `MONGODB_URI=...`
   - `NODE_ENV=production`
7. Deploy

---

## 🔗 CORS

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://seu-frontend.vercel.app'
  ]
}));
```

---

## 🧪 Testar

```bash
# GET
curl http://localhost:3000/tarefas

# POST
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Teste"}'

# PUT
curl -X PUT http://localhost:3000/tarefas/ID \
  -H "Content-Type: application/json" \
  -d '{"status":"concluído"}'

# DELETE
curl -X DELETE http://localhost:3000/tarefas/ID
```

---

## ⚠️ Problemas

**MongoDB não conecta:**
- Verifique URL em `.env`
- Adicione IP whitelist: `0.0.0.0/0`

**CORS error:**
- Verifique origem no CORS
- Adicione frontend URL

**Port em uso:**
- Mude em `.env`: `PORT=3001`

---

**Versão:** 1.0.0 | **Status:** Produção ✅