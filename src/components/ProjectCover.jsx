import { useState } from "react"
import { CloudSun, Gauge, LayoutGrid, Route, Server } from "lucide-react"
import { resolveScreenshotSrc } from "../lib/projectImages"

const themes = {
  blokus: { Icon: LayoutGrid, label: "Game systems" },
  weather: { Icon: CloudSun, label: "Weather & forecasts" },
  telemetry: { Icon: Gauge, label: "Vehicle telemetry" },
  search: { Icon: Route, label: "Search & discovery" },
  server: { Icon: Server, label: "Self-hosted systems" },
  portfolio: { label: "Design & development" },
}

/** Uses a configured cover or first screenshot, with an illustrated fallback. */
export default function ProjectCover({ project }) {
  const shot = project.cover ?? project.screenshots?.[0]
  const src = shot?.src ? resolveScreenshotSrc(shot.src) : null
  const [failedSrc, setFailedSrc] = useState(null)
  const theme = themes[project.icon] ?? themes.blokus
  const Icon = theme.Icon

  return (
    <div className="project-cover">
      {src && src !== failedSrc ? (
        <img
          src={src}
          alt={shot.alt ?? `${project.title} preview`}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(src)}
          className="project-cover__image"
        />
      ) : (
        <div className="project-cover__illustration" aria-hidden="true">
          <div className="project-cover__orbit" />
          <div className="project-cover__symbol">
            {Icon ? <Icon size={76} strokeWidth={1.4} /> : <span className="project-cover__initials">RD</span>}
          </div>
          <span className="project-cover__label">{theme.label}</span>
          <span className="project-cover__dots"><i /><i /><i /></span>
        </div>
      )}
    </div>
  )
}
