import Reveal from "../components/Reveal"
import { projectsHref } from "../router/useRoute"
import portraitSrc from "../assets/hero-photo.jpeg"

export default function Hero() {
  return (
    <section id="hero" className="px-6 pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,1fr)_16rem] lg:grid-cols-[minmax(0,1fr)_18rem] gap-12 md:gap-14 items-center">
        <div>
          <p className="section-label mb-4 animate-fade-up">Portfolio</p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-theme tracking-normal leading-[1.05] animate-fade-up animate-fade-up-delay-1">
            Riley <span className="gradient-heading">Drake</span>
          </h1>

          <p className="text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fade-up animate-fade-up-delay-2">
            I&apos;m a developer interested in game development, robotics, computer vision, and
            dependable software. I like building systems that feel clear, playful, and useful.
          </p>

          <div className="flex flex-wrap gap-3 mb-10 animate-fade-up animate-fade-up-delay-2">
            <span className="chip chip-subtle px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-semibold border-2 border-theme bg-surface-muted">
              Game systems
            </span>
            <span className="chip chip-subtle px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-semibold border-2 border-theme bg-surface-muted">
              Robotics focus
            </span>
            <span className="chip chip-subtle px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-semibold border-2 border-theme bg-surface-muted">
              Computer vision
            </span>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-3">
            <a
              href={projectsHref()}
              className="group btn-primary-fill rounded-[var(--radius-xl)] px-8 py-[0.9rem] inline-flex"
            >
              Selected work
              <span
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-x-1"
                aria-hidden
              >
                &rarr;
              </span>
            </a>

            <a
              href="#contact"
              className="btn-soft-outline rounded-[var(--radius-xl)] border px-8 py-[0.9rem] inline-flex"
            >
              Get in touch
            </a>
          </div>
        </div>

        <Reveal className="flex justify-center md:justify-end" delayMs={140}>
          <img
            src={portraitSrc}
            alt="Riley Drake"
            width={1621}
            height={2958}
            fetchPriority="high"
            decoding="async"
            className="block w-52 md:w-full h-auto rounded-[var(--radius-lg)] border-2 border-theme shadow-[0_12px_28px_color-mix(in_srgb,var(--shadow-ink)_22%,transparent)]"
          />
        </Reveal>
      </div>
    </section>
  )
}
