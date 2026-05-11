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
    <section id="skills" className="px-6 py-24 md:py-28 border-t border-theme">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14">
          <p className="section-label mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-tight">
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
                <div className="skill-panel rounded-[var(--radius-xl)] border border-theme bg-[color-mix(in_oklch,var(--surface)_92%,transparent)] dark:bg-[color-mix(in_oklch,var(--surface-muted)_94%,transparent)] backdrop-blur-sm p-8 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="skill-icon-ring flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shadow-inner ring-1 ring-[var(--accent-soft)]">
                      <Icon size={22} strokeWidth={1.72} />
                    </span>
                    <h3 className="text-lg font-bold text-theme">{title}</h3>
                  </div>

                  <ul className="space-y-3 text-muted">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent)] before:opacity-75 before:shrink-0 before:shadow-[0_0_12px_-2px_var(--glow)]"
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
