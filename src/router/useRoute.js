import { useEffect, useState } from "react"
import { parseRoute } from "./routes"

/** Hash routes: #/projects and #/projects/<slug>. Section anchors stay on the home page. */
export function readRoute() {
  return parseRoute({
    hash: window.location.hash,
    pathname: window.location.pathname,
    base: import.meta.env.BASE_URL,
  })
}

export function projectHref(slug) {
  return `#/projects/${encodeURIComponent(slug)}`
}

export function projectsHref() {
  return "#/projects"
}

export function goProjects() {
  window.location.hash = "/projects"
}

export function goHome() {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/")
  window.history.pushState(null, "", base)
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const sync = () => setRoute(readRoute())
    window.addEventListener("hashchange", sync)
    window.addEventListener("popstate", sync)
    return () => {
      window.removeEventListener("hashchange", sync)
      window.removeEventListener("popstate", sync)
    }
  }, [])

  return route
}
