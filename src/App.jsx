import { useEffect } from "react";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    // Dark mode restore
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    }

    // Theme color restore
    const color = localStorage.getItem("theme");
    if (color) {
      document.documentElement.style.setProperty("--primary", color);
    }
  }, []);

  return <Home />;
}
