import { Code2, Layers, Sparkles, Users } from "lucide-react"
import Reveal from "../components/Reveal"
import { skillGroups } from "../data/skills"

const icons = {
  code: Code2,
  layers: Layers,
  sparkles: Sparkles,
  professional: Users,
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 md:py-28 border-t-2 border-[var(--border-section)]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14">
          <p className="section-label mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-normal">
            Reliable craft, room to grow
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Technical foundations alongside the everyday strengths that help teams ship on
            time—communication, collaboration, and dependable follow-through.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map(({ title, icon, items }, index) => {
            const Icon = icons[icon] ?? Sparkles
            return (
              <Reveal key={title} delayMs={index * 70}>
                <div className="skill-panel rounded-[var(--radius-xl)] border-2 border-theme bg-[color-mix(in_oklch,var(--surface)_92%,transparent)] dark:bg-[color-mix(in_oklch,var(--surface-muted)_94%,transparent)] p-8 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="skill-icon-ring flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] border-2 border-[color-mix(in_oklch,var(--accent)_35%,var(--border))] bg-[var(--accent-soft)] text-[var(--accent)] shadow-[var(--retro-shadow-sm)]">
                      <Icon size={22} strokeWidth={1.72} />
                    </span>
                    <h3 className="text-lg font-bold text-theme">{title}</h3>
                  </div>

                  <ul className="space-y-3 text-muted">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:rounded-[var(--radius-sm)] before:bg-[var(--accent)] before:opacity-90 before:shrink-0 before:border before:border-theme"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
