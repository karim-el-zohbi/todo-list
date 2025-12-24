import { useState } from "react";

export default function TodoItem({ todo, setTodos }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(todo.text);

  const save = () => {
    setTodos((p) =>
      p.map((t) => (t.id === todo.id ? { ...t, text: value } : t))
    );
    setEdit(false);
  };

  return (
    <div
      className="flex justify-between items-center px-4 py-3 rounded-lg"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {edit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent border rounded px-2"
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <div className="flex gap-2 text-sm">
        {edit ? (
          <button
            onClick={save}
            style={{ color: "var(--primary)", backgroundColor: "var(--bg)" }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            style={{ backgroundColor: "var(--bg)" }}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => setTodos((p) => p.filter((t) => t.id !== todo.id))}
          className="text-red-500"
          style={{ backgroundColor: "var(--bg)" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
