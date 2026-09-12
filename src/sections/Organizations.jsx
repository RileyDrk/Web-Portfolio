import { Code2, Users } from "lucide-react"
import Reveal from "../components/Reveal"
import { organizations } from "../data/experience"

const icons = {
  community: Users,
  software: Code2,
}

export default function Organizations() {
  return (
    <section id="organizations" className="px-6 py-24 md:py-28 border-t-2 border-[var(--border-section)]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14">
          <p className="section-label mb-3">Beyond the classroom</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-normal">Clubs &amp; organizations</h2>
          <p className="text-muted text-lg leading-relaxed">
            Communities where I contribute to software, collaborate with peers, and keep learning.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {organizations.map((organization, index) => {
            const Icon = icons[organization.icon] ?? Users
            return (
              <Reveal key={organization.name} delayMs={index * 70}>
                <article className="skill-panel rounded-[var(--radius-xl)] border-2 border-theme bg-surface dark:bg-surface-muted p-8 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="skill-icon-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border-2 border-[color-mix(in_oklch,var(--accent)_35%,var(--border))] bg-[var(--accent-soft)] text-[var(--accent)] shadow-[var(--retro-shadow-sm)]">
                      <Icon size={22} strokeWidth={1.72} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-theme leading-snug">{organization.name}</h3>
                      <p className="font-semibold accent text-sm mt-1">{organization.role}</p>
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed">{organization.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
