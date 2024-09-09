import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onUpdate }) {
  const [estaEditando, setEstaEditando] = useState(false);
  const [tarefa, setTarefa] = useState(todo.title);
  const [descricao, setDescricao] = useState(todo.description);

  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      tarefa,
      descricao,
    };
    onUpdate(todo.id, updatedTodo);
    setEstaEditando(false);
  };

  return (
    <li className="p-3 border border-gray-200 rounded shadow-sm">
      {estaEditando ? (
        <div>
          <input
            type="text"
            placeholder="Edite a tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Edite a descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">{todo.tarefa}</h2>
          <p className="text-gray-600">{todo.descricao}</p>
          <button
            onClick={() => setEstaEditando(true)}
            className="text-blue-500 hover:text-blue-800"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-2 text-red-500 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
