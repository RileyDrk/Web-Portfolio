/** JARs are ZIP files and must start with "PK". */
export function bytesLookLikeJarZip(buf) {
  if (!buf || buf.byteLength < 4) return false
  const b = new Uint8Array(buf.slice(0, 4))
  return b[0] === 0x50 && b[1] === 0x4b
}

/**
 * Prefer same-origin fetch + Blob (binary-safe).
 * External URLs avoid fetch/CORS limits by opening in a new tab (GitHub releases, etc.).
 */
export async function downloadJarSmart(assetHref, suggestedName = "Blokus.jar") {
  const absoluteHref = /^https?:\/\//i.test(assetHref)
    ? assetHref
    : new URL(assetHref, window.location.origin).href

  if (!absoluteHref.startsWith(window.location.origin)) {
    window.open(absoluteHref, "_blank", "noopener,noreferrer")
    return
  }

  const res = await fetch(absoluteHref, {
    cache: "no-store",
    credentials: "same-origin",
  })

  if (!res.ok) {
    throw new Error(`Download failed (${res.status})`)
  }

  const buf = await res.arrayBuffer()

  if (!bytesLookLikeJarZip(buf)) {
    throw new Error(
      "Same-origin path did not return a JAR/ZIP (often SPA 404/HTML or Git line-ending corruption).",
    )
  }

  const blob = new Blob([buf], { type: "application/java-archive" })
  const objectUrl = URL.createObjectURL(blob)
  try {
    const a = document.createElement("a")
    a.href = objectUrl
    a.download = suggestedName
    a.rel = "noopener"
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000)
  }
}
