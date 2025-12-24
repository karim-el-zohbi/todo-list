export default function DarkModeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    localStorage.setItem(
      "mode",
      root.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggle}
      className="px-4 py-2 rounded-lg bordre text-white"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      🌙 Toggle
    </button>
  );
}
