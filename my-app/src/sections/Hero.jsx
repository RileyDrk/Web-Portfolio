import { useState, useMemo } from "react"
import Reveal from "../components/Reveal"

const RASTER_NAMES = ["profile.jpg", "profile.jpeg", "profile.webp", "profile.png"]

function bundledPortraitUrl() {
  const files = {
    ...import.meta.glob("../assets/**/*.{jpg,jpeg,jfif,png,webp}", {
      eager: true,
      import: "default",
    }),
    ...import.meta.glob("../assests/**/*.{jpg,jpeg,jfif,png,webp}", {
      eager: true,
      import: "default",
    }),
  }
  const entries = Object.entries(files)
  if (entries.length === 0) return null

  const base = (p) => (p.includes("/") ? p.split("/").pop() : p) ?? ""

  const preferred = entries.filter(([path]) =>
    /\bprofile\./i.test(base(path)),
  )
  const pool = preferred.length > 0 ? preferred : [...entries]

  pool.sort(([a], [b]) => base(a).localeCompare(base(b), undefined, { sensitivity: "base" }))
  const url = pool[0]?.[1]
  return typeof url === "string" ? url : null
}

export default function Hero() {
  const base = import.meta.env.BASE_URL
  const svgFallback = `${base}profile.svg`

  const fromAssets = useMemo(() => bundledPortraitUrl(), [])
  const [assetFailed, setAssetFailed] = useState(false)
  const [rasterTier, setRasterTier] = useState(0)

  const tier = Math.min(rasterTier, RASTER_NAMES.length)
  const publicRaster =
    tier < RASTER_NAMES.length ? `${base}${RASTER_NAMES[tier]}` : svgFallback

  const useBundled = Boolean(fromAssets) && !assetFailed
  const portraitSrc = useBundled ? fromAssets : publicRaster

  function handlePortraitError() {
    if (useBundled) {
      setAssetFailed(true)
      return
    }
    setRasterTier((t) => (t < RASTER_NAMES.length ? t + 1 : Math.min(RASTER_NAMES.length, t)))
  }

  return (
    <section id="hero" className="px-6 pt-28 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-16 items-center">
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
            <span className="chip chip-subtle chip-tone px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-semibold">
              Robotics focus
            </span>
            <span className="chip chip-accent px-4 py-1.5 rounded-[var(--radius-lg)] text-sm font-semibold border-2 border-theme bg-[var(--accent-soft)] text-theme shadow-[var(--retro-shadow-sm)]">
              Computer vision
            </span>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-3">
            <a
              href="#projects"
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
          <div className="relative w-full max-w-[20rem] md:max-w-none flex justify-center md:justify-end">
            <div
              className="hero-photo-halo absolute inset-0 m-auto max-w-[16rem] max-h-[16rem] w-[72vw] h-[72vw] md:w-80 md:h-80 rounded-[var(--radius-xl)]"
              aria-hidden
            />

            <div className="relative portrait-shell rounded-[var(--radius-xl)] border-2 border-theme shadow-[var(--shadow-card)]">
              <div className="hero-portrait-glow absolute -inset-[3px] rounded-[var(--radius-xl)] opacity-90 dark:opacity-65" />
              <img
                src={portraitSrc}
                alt="Riley Drake"
                width={384}
                height={384}
                fetchPriority="high"
                decoding="async"
                onError={
                  (fromAssets && !assetFailed) || rasterTier < RASTER_NAMES.length
                    ? handlePortraitError
                    : undefined
                }
                className="relative portrait-photo z-[1] w-64 md:w-80 rounded-[var(--radius-xl)] object-cover aspect-square bg-surface"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
