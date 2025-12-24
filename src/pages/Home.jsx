import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import DarkModeToggle from "../components/DarkModeToggle";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { AnimatePresence, Reorder } from "framer-motion";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

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

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

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
        <div className="flex gap-2 mb-4">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                filter === f ? "text-white" : "opacity-70"
              }`}
              style={{
                backgroundColor:
                  filter === f ? "var(--primary)" : "var(--card)",
                color: filter === f ? "var(--text)" : "inherit",
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add task..."
            className="flex-1 px-4 py-3 rounded-lg border bg-transparent"
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
        <Reorder.Group
          axis="y"
          values={todos}
          onReorder={setTodos}
          className="space-y-3"
        >
          {filteredTodos.map((t) => (
            <Reorder.Item
              key={t.id}
              value={t}
              className="cursor-grab active:cursor-grabbing"
            >
              <TodoItem todo={t} setTodos={setTodos} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
