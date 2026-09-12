import { ArrowRight, CloudSun, Gauge, LayoutGrid, Monitor, Search, Server } from "lucide-react"
import ProjectLinks from "./ProjectLinks"
import ProjectCover from "./ProjectCover"
import { projectHref } from "../router/useRoute"

const icons = {
  blokus: LayoutGrid,
  weather: CloudSun,
  portfolio: Monitor,
  server: Server,
  telemetry: Gauge,
  search: Search,
}

export default function ProjectCard({ project, compact = false }) {
  const Icon = icons[project.icon] ?? LayoutGrid

  return (
    <article className="project-card-hover group relative flex flex-col rounded-[var(--radius-xl)] border-2 border-theme bg-surface dark:bg-surface-muted overflow-hidden h-full">
      <a href={projectHref(project.slug)} aria-label={`View ${project.title}`} className="project-cover-link">
        <ProjectCover project={project} />
      </a>
      <div className="flex flex-col flex-1 p-7 md:p-8 min-w-0">
      <div className="relative flex justify-between items-start gap-4 mb-5">
        <div className="project-card-icon flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--accent-soft)] border-2 border-[color-mix(in_oklch,var(--accent)_35%,var(--border))] text-[var(--accent)] shadow-[var(--retro-shadow-sm)]">
          <Icon size={26} strokeWidth={1.65} aria-hidden />
        </div>
        {project.highlight && <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-[var(--radius-sm)] border-2 border-theme bg-surface-muted text-muted whitespace-nowrap">{project.highlight}</span>}
      </div>
      <h3 className="relative text-xl md:text-2xl font-bold text-theme mb-1">{project.title}</h3>
      <p className="relative text-sm font-semibold text-[var(--accent)] mb-4">{project.subtitle}</p>
      <p className={`relative text-muted leading-relaxed ${compact ? "text-sm" : ""}`}>{project.description}</p>
      <div className="relative flex flex-wrap gap-2 my-6">
        {project.tech.map((tech) => <span key={tech} className="px-3 py-1 text-xs font-semibold rounded-[var(--radius-sm)] border-2 border-theme bg-surface-muted text-theme transition-[background-color,border-color,box-shadow] duration-200 group-hover:bg-[var(--accent-soft)] group-hover:border-[color-mix(in_oklch,var(--accent)_45%,var(--border))]">{tech}</span>)}
      </div>
      <a href={projectHref(project.slug)} className="relative inline-flex items-center gap-2 text-sm font-semibold accent mb-4 group/detail transition-[gap] duration-300 hover:gap-2.5">
        View project page <ArrowRight size={16} className="transition-transform duration-300 group-hover/detail:translate-x-0.5" aria-hidden />
      </a>
      <ProjectLinks github={project.github} demo={project.demo} demoLabel={project.demoLabel} className="mt-auto pt-2" />
      </div>
    </article>
  )
}
