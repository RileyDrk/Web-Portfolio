import { useEffect, useState } from "react"

function stripBase(pathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  if (!base || base === "/") return pathname
  if (pathname.startsWith(base)) {
    const rest = pathname.slice(base.length)
    return rest.startsWith("/") ? rest : `/${rest}`
  }
  return pathname
}

/** Hash routes: #/projects and #/projects/<slug>. Section anchors stay on the home page. */
export function readRoute() {
  const hash = window.location.hash
  const hashMatch = hash.match(/^#\/projects\/([^/?#]+)/)
  if (hashMatch) {
    return { page: "project", slug: decodeURIComponent(hashMatch[1]) }
  }

  if (/^#\/projects\/?$/.test(hash)) return { page: "projects" }

  if (/^\/projects\/?$/.test(stripBase(window.location.pathname))) return { page: "projects" }

  const pathMatch = stripBase(window.location.pathname).match(/^\/projects\/([^/?]+)\/?$/)
  if (pathMatch) {
    return { page: "project", slug: decodeURIComponent(pathMatch[1]) }
  }

  return { page: "home" }
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
