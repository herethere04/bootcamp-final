import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Permite acesso de outros domínios
app.use(express.json()); // Permite ler JSON no body

const PORT = process.env.PORT || 3000;

// Nosso "banco de dados" em memória
let tasks = [{ id: 1, text: "Configurar o backend!" }];

// Endpoints
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ error: 'O texto da tarefa é obrigatório' });
  }
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));