import { motion } from "framer-motion";
import { useState } from "react";

export default function TodoItem({ todo, setTodos }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo.text);

  const toggle = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
    );
  };

  const remove = () => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  const save = () => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, text: value } : t))
    );
    setEdit(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center gap-3 p-4 rounded-xl shadow"
      style={{ backgroundColor: "var(--card)" }}
    >
      {/* ✅ Checkbox */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={toggle}
        className="w-5 h-5 accent-\[var(--primary)] cursor-pointer"
      />

      {/* Text */}
      {edit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setEdit(false);
          }}
          className="flex-1 bg-transparent border-b outline-none"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${todo.done ? "line-through opacity-60" : ""}`}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex gap-2 text-sm">
        {!edit && <button onClick={() => setEdit(true)}>✏️</button>}
        <button onClick={remove}>🗑</button>
      </div>
    </motion.div>
  );
}
