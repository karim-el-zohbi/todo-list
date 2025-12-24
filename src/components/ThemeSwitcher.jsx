const colors = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b"];

export default function ThemeSwitcher() {
  const apply = (color) => {
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("theme", color);
  };

  return (
    <div className="flex gap-2">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => apply(c)}
          style={{ backgroundColor: c }}
          className="w-8 h-8 rounded-full"
        />
      ))}
    </div>
  );
}
