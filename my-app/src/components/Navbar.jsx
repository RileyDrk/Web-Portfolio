import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <nav className="bg-surface border-b border-theme backdrop-blur sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          <a href="#hero" className="text-xl font-bold accent">
            Riley Drake
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm">

            <a href="#projects" className="text-muted hover:accent transition">
              Projects
            </a>

            <a href="#skills" className="text-muted hover:accent transition">
              Skills
            </a>

            <a href="#contact" className="text-muted hover:accent transition">
              Contact
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-6 relative w-14 h-7 flex items-center bg-zinc-300 dark:bg-zinc-700 rounded-full p-1 transition"
            >

              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              />

              <Sun size={14} className="absolute left-1.5 text-yellow-500" />
              <Moon size={14} className="absolute right-1.5 text-indigo-300" />

            </button>

          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </div>

    </nav>
  )
}