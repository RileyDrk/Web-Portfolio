import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProjectScreenshotGallery({ figures, onVisibleChange }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(() => new Set())

  const slides = useMemo(
    () => figures.filter((shot) => !failed.has(shot.key)),
    [figures, failed],
  )

  useEffect(() => {
    setIndex(0)
    setFailed(new Set())
  }, [figures])

  useEffect(() => {
    onVisibleChange?.(slides.length)
  }, [slides.length, onVisibleChange])

  useEffect(() => {
    if (!slides.length) return
    setIndex((current) => Math.min(current, slides.length - 1))
  }, [slides.length])

  if (!slides.length) return null

  const current = slides[index]
  const hasMultiple = slides.length > 1

  function goTo(delta) {
    if (!hasMultiple) return
    setIndex((current) => (current + delta + slides.length) % slides.length)
  }

  function markMissing(key) {
    setFailed((prev) => {
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      tabIndex={0}
      onKeyDown={(event) => {
        if (!hasMultiple) return
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          goTo(-1)
        }
        if (event.key === "ArrowRight") {
          event.preventDefault()
          goTo(1)
        }
      }}
    >
      <figure className="rounded-[var(--radius-xl)] border-2 border-theme overflow-hidden bg-[color-mix(in_oklch,var(--surface)_92%,transparent)] shadow-[var(--shadow-card)]">
        <div className="relative bg-surface-muted">
          <img
            key={current.key}
            src={current.href}
            alt={current.alt}
            loading="lazy"
            decoding="async"
            onError={() => markMissing(current.key)}
            className="w-full h-auto object-contain max-h-[min(70vh,40rem)] mx-auto bg-surface-muted min-h-[12rem]"
          />

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-none border-2 border-theme bg-[var(--surface)] text-theme shadow-[var(--shadow-card)] transition-[transform,opacity] duration-150 hover:opacity-95 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={22} strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-none border-2 border-theme bg-[var(--surface)] text-theme shadow-[var(--shadow-card)] transition-[transform,opacity] duration-150 hover:opacity-95 active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight size={22} strokeWidth={2} aria-hidden />
              </button>
            </>
          ) : null}
        </div>

        <figcaption className="px-5 py-4 border-t-2 border-theme">
          {current.caption ? (
            <p className="text-sm text-muted leading-relaxed">{current.caption}</p>
          ) : null}
          {hasMultiple ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted mt-3">
              {index + 1} of {slides.length}
            </p>
          ) : null}
        </figcaption>
      </figure>
    </div>
  )
}
