import { useEffect, useRef, useState } from "react"

export default function Reveal({ children, className = "", delayMs = 0, style, ...props }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const mergedStyle = {
    ...(delayMs ? { "--reveal-delay": `${delayMs}ms` } : {}),
    ...style,
  }

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${shown ? "is-visible" : ""} ${className}`.trim()}
      style={mergedStyle}
      {...props}
    >
      {children}
    </div>
  )
}
