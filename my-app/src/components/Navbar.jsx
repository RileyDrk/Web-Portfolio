import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X, Github, Linkedin, Download } from "lucide-react"
import { about } from "../data/about"
import { resumeHref, resumeLinkProps } from "../lib/resume"
import { profileLinks } from "../lib/urls"

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
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

function SocialIcons({ compact = false }) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-lg)] border-2 border-theme bg-surface-muted text-muted transition-[color,background-color,transform,border-color] duration-200 hover:bg-[var(--accent-soft)] hover:border-[color-mix(in_oklch,var(--accent)_35%,var(--border))] hover:text-[var(--accent)] active:translate-x-[1px] active:translate-y-[1px] shadow-[var(--retro-shadow-sm)] hover:shadow-[var(--retro-shadow)]"
  const size = compact ? "size-11" : "size-10"
  const iconSz = compact ? 20 : 19
  return (
    <span className="flex items-center gap-2 shrink-0">
      <a
        href={profileLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${size}`}
        aria-label="GitHub profile"
      >
        <Github size={iconSz} strokeWidth={1.9} aria-hidden />
      </a>
      <a
        href={profileLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${size}`}
        aria-label="LinkedIn profile"
      >
        <Linkedin size={iconSz} strokeWidth={1.9} aria-hidden />
      </a>
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const resumeLink = resumeHref()
  const showResume = Boolean(resumeLink && about.resume?.label)
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false,
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const close = () => setMenuOpen(false)
    mq.addEventListener("change", (e) => {
      if (e.matches) close()
    })
    return () => mq.removeEventListener("change", close)
  }, [])

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-shadow duration-[var(--duration-theme)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[4.125rem]">
          <a
            href="#hero"
            className="text-lg font-bold tracking-normal accent transition-opacity duration-300 hover:opacity-[0.92]"
          >
            Riley Drake
          </a>

          <div className="hidden md:flex items-center text-[0.93rem] font-medium">
            <div className="flex items-center gap-10">
              {links.map(({ href, label }) => (
                <a key={href} href={href} className="nav-link-desktop text-muted">
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-10 pl-10 border-l border-theme/60">
              {showResume && (
                <a
                  {...resumeLinkProps(resumeLink)}
                  className="btn-soft-outline inline-flex items-center gap-2 rounded-[var(--radius-lg)] border px-4 py-2 text-[0.86rem] font-semibold"
                >
                  <Download size={16} strokeWidth={1.85} aria-hidden />
                  Resume
                </a>
              )}
              <SocialIcons compact={false} />
              <ThemeToggleInner darkMode={darkMode} compact={false} onToggle={() => setDarkMode(!darkMode)} />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <SocialIcons compact />
            <ThemeToggleInner darkMode={darkMode} compact onToggle={() => setDarkMode(!darkMode)} />
            <button
              type="button"
              className="p-2.5 rounded-[var(--radius-lg)] border-2 border-theme bg-surface-muted text-theme shadow-[var(--retro-shadow-sm)] transition-[transform,background-color] duration-200 hover:bg-surface-muted active:translate-x-[1px] active:translate-y-[1px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mobile-menu-sheet border-t border-theme py-5 flex flex-col gap-1">
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
              <a
                href={profileLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 accent"
              >
                <Github size={18} aria-hidden /> GitHub
              </a>
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 accent"
              >
                <Linkedin size={18} aria-hidden /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
