import { useState, useEffect } from 'react';
import type { FormEvent } from 'react'; // <-- CORREÇÃO APLICADA AQUI
import './App.css'; 

// Define a "forma" de um objeto Task
interface Task {
  id: number;
  text: string;
}

// URL da nossa API que está rodando no Docker
// Usamos localhost:3000 porque o PWA está rodando no navegador do usuário
const API_URL = 'http://localhost:3000/api/tasks'; 

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

  // --- 1. Buscar Tarefas da API ---
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Roda a função fetchTasks() assim que o componente carregar
  useEffect(() => {
    fetchTasks();
  }, []);

  // --- 2. Adicionar Nova Tarefa ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (!newTaskText.trim()) return; // Não adiciona tarefa vazia

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTaskText }),
      });
      
      if (response.ok) {
        setNewTaskText(''); // Limpa o campo de texto
        fetchTasks(); // Atualiza a lista de tarefas
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // --- 3. Buscar Imagem de Gato (API Pública) ---
  const fetchCat = async () => {
    try {
      setCatImageUrl(''); // Limpa a imagem anterior (mostra "Carregando...")
      const response = await fetch('https://api.thecatapi.com/v1/images/search?size=small');
      const data = await response.json();
      setCatImageUrl(data[0].url);
    } catch (error) {
      console.error("Erro ao buscar gato:", error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Productivity Hub</h1>
      </header>

      <main>
        {/* Seção de Tarefas */}
        <section className="tasks-section">
          <h2>Minhas Tarefas Foco</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="O que precisa ser feito?"
            />
            <button type="submit">Adicionar</button>
          </form>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>{task.text}</li>
            ))}
          </ul>
        </section>

        {/* Seção da Pausa */}
        <section className="pause-section">
          <h2>Precisa de uma Pausa?</h2>
          <button onClick={fetchCat}>Buscar um Gato!</button>
          <div className="image-container">
            {catImageUrl ? (
              <img src={catImageUrl} alt="Um gato aleatório" />
            ) : (
              <p>Clique para uma pausa...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;