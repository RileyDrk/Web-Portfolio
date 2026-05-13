import { Download } from "lucide-react"
import Reveal from "../components/Reveal"
import { about } from "../data/about"
import { publicAssetUrl } from "../lib/urls"

function resumeHref(href) {
  if (!href) return null
  if (/^https?:\/\//i.test(href)) return href
  return publicAssetUrl(href.replace(/^\//, ""))
}

export default function About() {
  const resumeLink = resumeHref(about.resume?.href)
  const showResume = Boolean(resumeLink && about.resume?.label)

  return (
    <section id="about" className="px-6 py-24 md:py-28 border-t-2 border-[var(--border-section)]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-12 md:mb-14">
          <p className="section-label mb-3">About</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-tight">
            A bit about me
          </h2>
          <p className="text-lg text-[var(--accent)] font-medium">{about.tagline}</p>
        </Reveal>

        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-14 items-start">
          <Reveal delayMs={60}>
            <div className="rounded-[var(--radius-xl)] border-2 border-theme bg-[color-mix(in_oklch,var(--surface)_92%,transparent)] dark:bg-[color-mix(in_oklch,var(--surface-muted)_94%,transparent)] p-8 md:p-10 shadow-[var(--shadow-card)]">
              <div className="space-y-5 text-muted text-lg leading-relaxed">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {about.highlights?.length > 0 && (
                <ul className="mt-8 space-y-3 text-muted border-t border-theme pt-8">
                  {about.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 before:content-[''] before:mt-2 before:w-2 before:h-2 before:rounded-none before:bg-[var(--accent)] before:opacity-90 before:shrink-0 before:border before:border-theme"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {showResume && (
                <a
                  href={resumeLink}
                  {...(/^https?:\/\//i.test(resumeLink) ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                  className="btn-soft-outline mt-8 inline-flex items-center gap-2 rounded-[var(--radius-xl)] border px-6 py-3 font-semibold"
                >
                  <Download size={18} strokeWidth={1.85} aria-hidden />
                  {about.resume.label}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="rounded-[var(--radius-xl)] border-2 border-theme bg-[color-mix(in_oklch,var(--surface-muted)_88%,transparent)] p-8 md:p-9 space-y-6">
              {about.facts.map(({ label, value }) => (
                <div key={label}>
                  <p className="section-label mb-2 normal-case tracking-[0.18em] text-[0.68rem]">
                    {label}
                  </p>
                  <p className="text-theme font-medium leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
