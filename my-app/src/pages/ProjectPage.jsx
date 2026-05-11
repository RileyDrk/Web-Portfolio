import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, LayoutGrid, CloudSun } from "lucide-react"
import Reveal from "../components/Reveal"
import ProjectLinks from "../components/ProjectLinks"
import ProjectScreenshotGallery from "../components/ProjectScreenshotGallery"
import { buildScreenshotFigures } from "../lib/projectImages"
import { goHome } from "../router/useRoute"

const icons = {
  blokus: LayoutGrid,
  weather: CloudSun,
}

export default function ProjectPage({ project }) {
  const Icon = icons[project.icon] ?? LayoutGrid
  const figures = useMemo(
    () => buildScreenshotFigures(project.slug, project.screenshots ?? []),
    [project.slug, project.screenshots],
  )
  const [visibleCount, setVisibleCount] = useState(figures.length)
  const snippets = project.snippets ?? []

  useEffect(() => {
    setVisibleCount(figures.length)
  }, [figures.length, project.slug])

  return (
    <article className="px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-[var(--accent)] transition-colors mb-10 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={1.85} aria-hidden />
            Back to projects
          </button>

          <div className="flex flex-wrap items-start gap-4 mb-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] border border-[color-mix(in_oklch,var(--accent)_22%,transparent)] text-[var(--accent)] shadow-inner">
              <Icon size={28} strokeWidth={1.65} aria-hidden />
            </span>
            {project.highlight && (
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full border border-theme bg-[color-mix(in_oklch,var(--surface-muted)_94%,transparent)] text-muted">
                {project.highlight}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-theme tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-lg font-semibold text-[var(--accent)] mb-6">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-[color-mix(in_oklch,var(--surface-muted)_90%,transparent)] border border-theme text-theme"
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectLinks
            github={project.github}
            demo={project.demo}
            demoLabel={project.demoLabel}
            className="mb-10"
          />
        </Reveal>

        <Reveal delayMs={60}>
          <section className="mb-14 md:mb-16">
            <h2 className="section-label mb-4">Overview</h2>
            <p className="text-muted text-lg leading-relaxed">{project.overview ?? project.description}</p>
          </section>
        </Reveal>

        {figures.length > 0 ? (
          <Reveal delayMs={90}>
            <section className="mb-14 md:mb-16">
              <h2 className="section-label mb-6">Screenshots</h2>
              <ProjectScreenshotGallery
                key={project.slug}
                figures={figures}
                onVisibleChange={setVisibleCount}
              />
              {visibleCount === 0 ? (
                <p className="text-muted text-sm leading-relaxed rounded-[var(--radius-lg)] border border-dashed border-theme px-5 py-4 bg-[color-mix(in_oklch,var(--surface-muted)_70%,transparent)]">
                  Screenshots are listed in projects.js but the files are missing or the src path does not match the
                  filename. Check public/projects/{project.slug}/ and src/assets/projects/{project.slug}/, then restart
                  npm run dev.
                </p>
              ) : null}
            </section>
          </Reveal>
        ) : null}

        {snippets.length > 0 && (
          <Reveal delayMs={120}>
            <section>
              <h2 className="section-label mb-6">Code snippets</h2>
              <div className="space-y-8">
                {snippets.map((snippet) => (
                  <div key={snippet.title}>
                    <h3 className="text-lg font-bold text-theme mb-2">{snippet.title}</h3>
                    {snippet.caption && (
                      <p className="text-muted text-sm mb-3 leading-relaxed">{snippet.caption}</p>
                    )}
                    <pre className="code-snippet">
                      <code className={`language-${snippet.language ?? "text"}`}>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </article>
  )
}
