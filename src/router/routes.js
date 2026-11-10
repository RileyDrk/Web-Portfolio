/** Hash navigation takes precedence over legacy path-based project links. */
export function parseRoute({ hash = "", pathname = "/", base = "/" } = {}) {
  const basePath = base.replace(/\/$/, "")
  const path = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
    ? pathname.slice(basePath.length) || "/"
    : pathname
  const routePath = hash ? hash.slice(1) : path

  if (/^\/projects\/?$/.test(routePath)) return { page: "projects" }

  const match = routePath.match(/^\/projects\/([^/?#]+)\/?$/)
  if (match) {
    try {
      return { page: "project", slug: decodeURIComponent(match[1]) }
    } catch {
      // A malformed shared URL should never prevent the portfolio from loading.
    }
  }

  return { page: "home" }
}
