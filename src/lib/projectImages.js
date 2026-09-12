import { publicAssetUrl } from "./urls"

const assetShots = {
  ...import.meta.glob("../assets/projects/**/*.{png,jpg,jpeg,webp,gif,svg}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assests/projects/**/*.{png,jpg,jpeg,webp,gif,svg}", {
    eager: true,
    import: "default",
  }),
}

function assetKeyFromGlob(path) {
  const match = path.match(/(?:assets|assests)\/projects\/(.+)$/i)
  return match ? match[1].replace(/\\/g, "/").toLowerCase() : null
}

const assetByKey = Object.fromEntries(
  Object.entries(assetShots)
    .map(([path, url]) => {
      const key = assetKeyFromGlob(path)
      return key ? [key, url] : null
    })
    .filter(Boolean),
)

function normalizeConfiguredSrc(src) {
  return String(src ?? "")
    .replace(/^\/+/, "")
    .replace(/^projects\//i, "")
    .toLowerCase()
}

/** Prefer bundled assets; fall back to files in public/ via site base URL. */
export function resolveScreenshotSrc(src) {
  const clean = String(src ?? "").replace(/^\/+/, "")
  const tail = normalizeConfiguredSrc(clean)

  if (assetByKey[tail]) return assetByKey[tail]

  const file = tail.split("/").pop()
  if (file) {
    const byFile = Object.entries(assetByKey).find(([key]) => key.endsWith(`/${file}`) || key === file)
    if (byFile) return byFile[1]
  }

  return publicAssetUrl(clean)
}

function titleFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
  return base.charAt(0).toUpperCase() + base.slice(1)
}

/** Any images under assets/projects/<slug>/ (or assests typo folder). */
export function discoverScreenshots(slug) {
  const prefix = `${String(slug).toLowerCase()}/`
  return Object.entries(assetByKey)
    .filter(([key]) => key.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, href]) => {
      const file = key.split("/").pop() ?? key
      return {
        key,
        href,
        alt: titleFromFilename(file),
        caption: "",
      }
    })
}

/** Configured shots first; fill in discovered assets; dedupe by resolved URL. */
export function buildScreenshotFigures(slug, configured = []) {
  const seen = new Set()
  const figures = []

  for (const shot of configured) {
    const href = resolveScreenshotSrc(shot.src)
    if (seen.has(href)) continue
    seen.add(href)
    figures.push({
      key: shot.src,
      href,
      alt: shot.alt ?? titleFromFilename(shot.src),
      caption: shot.caption ?? "",
    })
  }

  for (const shot of discoverScreenshots(slug)) {
    if (seen.has(shot.href)) continue
    seen.add(shot.href)
    figures.push(shot)
  }

  return figures
}
