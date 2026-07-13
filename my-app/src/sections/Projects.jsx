import { useEffect, useRef } from "react"
import { LayoutGrid, CloudSun, Monitor, Server, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { projects } from "../data/projects"
import Reveal from "../components/Reveal"
import ProjectLinks from "../components/ProjectLinks"
import { projectHref } from "../router/useRoute"

const icons = {
  blokus: LayoutGrid,
  weather: CloudSun,
  portfolio: Monitor,
  server: Server,
}

export default function Projects() {
  const carouselRef = useRef(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return undefined

    function handleWheel(event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      event.preventDefault()
      carousel.scrollBy({ left: event.deltaY, behavior: "auto" })
    }

    carousel.addEventListener("wheel", handleWheel, { passive: false })
    return () => carousel.removeEventListener("wheel", handleWheel)
  }, [])

  function scrollProjects(direction) {
    const carousel = carouselRef.current
    if (!carousel) return

    const card = carousel.firstElementChild
    const gap = Number.parseFloat(window.getComputedStyle(carousel).gap) || 0
    const projectWidth = card?.getBoundingClientRect().width || carousel.clientWidth

    carousel.scrollBy({ left: direction * (projectWidth + gap), behavior: "smooth" })
  }

  return (
    <section id="projects" className="px-6 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14 md:mb-16">
          <p className="section-label mb-3">Work</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-normal">
            Highlights from recent builds
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            A snapshot of what I&apos;ve been building—open a project page for screenshots,
            snippets, and a deeper write-up.
          </p>
        </Reveal>

        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted">Scroll to explore projects</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollProjects(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border-2 border-theme text-theme hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Show previous projects"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollProjects(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border-2 border-theme text-theme hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Show next projects"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto overscroll-y-contain snap-x snap-mandatory scroll-smooth -mx-2 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Project carousel"
        >
          {projects.map((project, index) => {
            const Icon = icons[project.icon] ?? LayoutGrid
            return (
              <Reveal key={project.slug} delayMs={index * 80} className="w-[min(100%,32rem)] shrink-0 snap-start">
                <article className="project-card-hover group relative flex flex-col rounded-[var(--radius-xl)] border-2 border-theme bg-surface dark:bg-surface-muted p-8 md:p-9 overflow-hidden h-full">
                  <div
                    className="absolute top-0 right-0 w-32 h-20 rounded-bl-[var(--radius-xl)] opacity-30 translate-x-[20%] -translate-y-1/4 bg-[var(--accent-soft)] pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
                    aria-hidden
                  />

                  <div className="relative flex justify-between items-start gap-4 mb-6">
                    <div className="project-card-icon flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--accent-soft)] border-2 border-[color-mix(in_oklch,var(--accent)_35%,var(--border))] text-[var(--accent)] shadow-[var(--retro-shadow-sm)]">
                      <Icon size={28} strokeWidth={1.65} />
                    </div>
                    {project.highlight && (
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] px-2 py-1 rounded-[var(--radius-sm)] border-2 border-theme bg-surface-muted text-muted whitespace-nowrap">
                        {project.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="relative text-2xl md:text-[1.65rem] font-bold text-theme mb-1">
                    {project.title}
                  </h3>
                  <p className="relative text-sm font-semibold text-[var(--accent)] mb-4">
                    {project.subtitle}
                  </p>
                  <p className="relative text-muted leading-relaxed flex-grow">{project.description}</p>

                  <div className="relative flex flex-wrap gap-2 my-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold rounded-[var(--radius-sm)] border-2 border-theme bg-surface-muted text-theme transition-[background-color,border-color,box-shadow] duration-200 group-hover:bg-[var(--accent-soft)] group-hover:border-[color-mix(in_oklch,var(--accent)_45%,var(--border))]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={projectHref(project.slug)}
                    className="relative inline-flex items-center gap-2 text-sm font-semibold accent mb-4 group/detail transition-[gap] duration-300 hover:gap-2.5"
                  >
                    View project page
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/detail:translate-x-0.5"
                      aria-hidden
                    />
                  </a>

                  <ProjectLinks
                    github={project.github}
                    demo={project.demo}
                    demoLabel={project.demoLabel}
                    className="mt-auto pt-2"
                  />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
