import { useState, useEffect, useRef } from "react"
import { Sun, Moon, Menu, X, Download } from "lucide-react"
import { about } from "../data/about"
import { resumeHref, resumeLinkProps } from "../lib/resume"

const links = [
  { href: "#about", label: "About" },
  { href: "#/projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#organizations", label: "Organizations" },
  { href: "#contact", label: "Contact" },
]

function ThemeToggleInner({ darkMode, onToggle, compact }) {
  const knob = compact ? "size-[18px]" : "size-[19px]"
  const gutter = compact ? 3 : 4
  const darkInsetPx = compact ? 21 : 23
  const track =
    compact === true ? "h-[1.875rem] w-[3rem]" : "h-8 min-w-[3.625rem] w-[3.625rem]"
  const iconInset = compact ? "left-[6px] right-[6px]" : "left-[9px] right-[9px]"

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative shrink-0 ${track} rounded-[var(--radius-lg)] border-2 border-theme bg-surface-muted shadow-[var(--retro-shadow-sm)] transition-[background-color,box-shadow] duration-[var(--duration-theme)]`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
    >
      <span
        className={`pointer-events-none absolute ${iconInset} top-1/2 z-[1] flex -translate-y-1/2 items-center justify-between`}
      >
        <Sun
          size={compact ? 12 : 13}
          strokeWidth={2}
          className="shrink-0 text-[var(--highlight)]"
          aria-hidden
        />
        <Moon
          size={compact ? 12 : 13}
          strokeWidth={2}
          className="shrink-0 text-[var(--accent)] opacity-95"
          aria-hidden
        />
      </span>

      <span
        className={`pointer-events-none absolute top-1/2 z-[2] ${knob} -translate-y-1/2 rounded-[var(--radius-sm)] border-2 border-theme bg-[var(--surface)] shadow-[var(--retro-shadow-sm)] transition-[left] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 motion-reduce:transition-none`}
        style={{
          left: darkMode ? `calc(100% - ${darkInsetPx}px)` : `${gutter}px`,
        }}
      />
    </button>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const resumeLink = resumeHref()
  const showResume = Boolean(resumeLink && about.resume?.label)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light"
    } catch {
      return true
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", darkMode ? "#111214" : "#f1f8f5")
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light")
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [darkMode])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const handleChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    mq.addEventListener("change", handleChange)
    return () => mq.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", dismiss)
    return () => window.removeEventListener("keydown", dismiss)
  }, [menuOpen])

  return (
    <nav aria-label="Main navigation" className="glass-nav sticky top-0 z-50 transition-shadow duration-[var(--duration-theme)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[4.125rem]">
          <a
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-bold tracking-normal accent transition-opacity duration-300 hover:opacity-[0.92]"
          >
            Riley Drake
          </a>

          <div className="hidden lg:flex items-center text-[0.93rem] font-medium">
            <div className="flex items-center gap-6 xl:gap-10">
              {links.map(({ href, label }) => (
                <a key={href} href={href} className="nav-link-desktop text-muted">
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-6 pl-6 xl:ml-10 xl:pl-10 border-l border-theme/60">
              {showResume && (
                <a
                  {...resumeLinkProps(resumeLink)}
                  className="btn-soft-outline inline-flex items-center gap-2 rounded-[var(--radius-lg)] border px-4 py-2 text-[0.86rem] font-semibold"
                >
                  <Download size={16} strokeWidth={1.85} aria-hidden />
                  Resume
                </a>
              )}
              <ThemeToggleInner darkMode={darkMode} compact={false} onToggle={() => setDarkMode(!darkMode)} />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggleInner darkMode={darkMode} compact onToggle={() => setDarkMode(!darkMode)} />
            <button
              ref={menuButtonRef}
              type="button"
              className="p-2.5 rounded-[var(--radius-lg)] border-2 border-theme bg-surface-muted text-theme shadow-[var(--retro-shadow-sm)] transition-[transform,background-color] duration-200 hover:bg-surface-muted active:translate-x-[1px] active:translate-y-[1px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="lg:hidden mobile-menu-sheet border-t border-theme py-5 flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="py-3.5 px-3 rounded-[var(--radius-lg)] text-theme font-semibold border-l-2 border-transparent transition-[background-color,color] duration-200 hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-6 px-3 pt-4 mt-3 border-t border-theme text-sm font-semibold">
              {showResume && (
                <a
                  {...resumeLinkProps(resumeLink)}
                  className="inline-flex items-center gap-2 accent"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={18} aria-hidden /> Resume
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
