from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",# Substitua com o endereço do seu frontend
    "http://127.0.0.1:8000",# Adicione outros domínios conforme necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Modelo Pydantic
class TodoItem(BaseModel):
    id: int
    tarefa: str
    descricao: str
    completed: bool

# Simulação de banco de dados com uma lista
todos: List[TodoItem] = []

@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.post("/todos/", response_model=TodoItem)
async def create_todo(todo: TodoItem):
    # Verifica se o ID já existe (simulação de armazenamento em memória)
    if any(item.id == todo.id for item in todos):
        raise HTTPException(status_code=400, detail="Item com esse ID já existe")
    
    todos.append(todo)
    return todo

@app.get("/todos/", response_model=List[TodoItem])
def read_todos():
    return todos

@app.get("/todos/{todo_id}", response_model=TodoItem)
def read_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo: TodoItem):
    for index, t in enumerate(todos):
        if t.id == todo_id:
            todos[index] = todo
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index, t in enumerate(todos):
        if t.id == todo_id:
            todos.pop(index)
            return {"detail": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")
