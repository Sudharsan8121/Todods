import React, { useState, useEffect } from "react";
import "./App.css";  // Make sure this file exists and is imported

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
          onKeyDown={e => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask} className="add-btn">
          Add
        </button>
      </div>

      {todos.length === 0 && <p className="no-tasks">No tasks yet! Add something.</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(todo.id)}
            title="Click to toggle complete"
          >
            <span>{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
              className="delete-btn"
              aria-label={`Delete task: ${todo.text}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
