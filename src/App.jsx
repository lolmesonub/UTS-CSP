import { useState, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) setTodos(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          id="todo-input"
          name="todo-input"
          className="flex-1 border p-2 rounded"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-2 py-1 rounded ${filter === "all" ? "bg-rose-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-2 py-1 rounded ${filter === "active" ? "bg-blue-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-2 py-1 rounded ${filter === "completed" ? "bg-green-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
}