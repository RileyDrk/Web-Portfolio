import { about } from "../data/about"
import { publicAssetUrl } from "./urls"

export function resumeHref(href = about.resume?.href) {
  if (!href) return null
  if (/^https?:\/\//i.test(href)) return href
  return publicAssetUrl(href.replace(/^\//, ""))
}

export function resumeLinkProps(href = resumeHref()) {
  if (!href) return {}
  return /^https?:\/\//i.test(href)
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href, download: true }
}
