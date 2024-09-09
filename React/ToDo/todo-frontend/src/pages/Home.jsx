import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import { AiOutlinePython } from "react-icons/ai";
import { FaReact } from "react-icons/fa";

function Home() {
  const [todos, setTodos] = useState([]);
  const [tarefa, setTarefa] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/todos/")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTarefa = () => {
    const newTodo = {
      id: todos.length + 1, // Ou use uma estratégia melhor para gerar IDs
      tarefa,
      descricao,
      completed: false,
    };

    axios
      .post("http://localhost:8000/todos/", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setTarefa("");
        setDescricao("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const updateTodo = (id, updatedTodo) => {
    axios.put(`http://localhost:8000/todos/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  return (
    <div className="border-x-2 shadow-lg shadow-indigo-100 p-2 border-indigo-700 max-w-md mx-auto mt-10">
      <FaReact className="text-blue-400" />{" "}
      <AiOutlinePython className="text-yellow-400" />
      <h1 className="ml-2 text-3xl align-center text-late-400 font-bold text-left mb-5">
        Lista de Fazeres
      </h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Tarefa"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTarefa}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Adicionar tarefa
        </button>
      </div>
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo}/>
    </div>
  );
}

export default Home;
