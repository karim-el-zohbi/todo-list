import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import DarkModeToggle from "../components/DarkModeToggle";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-3 sm:p-4">
      <div
        className="w-full max-w-2xl p-4 sm:p-6 rounded-2xl shadow transition-colors"
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            Todo
          </h1>

          <div className="flex gap-2 self-start sm:self-auto">
            <ThemeSwitcher />
            <DarkModeToggle />
          </div>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add task..."
            className="
              flex-1 px-4 py-3 rounded-lg border
              bg-transparent
              text-base
            "
          />

          <button
            onClick={add}
            className="
              w-full sm:w-auto
              px-6 py-3 rounded-lg
              font-medium
              transition-colors
            "
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-3 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto">
          {todos.map((t) => (
            <TodoItem key={t.id} todo={t} setTodos={setTodos} />
          ))}
        </div>
      </div>
    </div>
  );
}
