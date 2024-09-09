import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onUpdate}) {
  return (
    <ul className="mt-5 space-y-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate}/>
      ))}
    </ul>
  );
}

export default TodoList;