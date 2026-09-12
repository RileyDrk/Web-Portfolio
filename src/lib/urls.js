/** Base-relative path for Vite public/ assets (handles GitHub Pages base). */
export function publicAssetUrl(path) {
  const trimmed = String(path ?? "").replace(/^\//, "")
  const encoded = trimmed
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
  const base =
    typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
      ? String(import.meta.env.BASE_URL).replace(/\/?$/, "/")
      : "/"
  return `${base}${encoded}`
}

/** Default profile links — use in Navbar, footer, Contact. */
export const profileLinks = {
  github: "https://github.com/RileyDrk",
  linkedin: "https://linkedin.com/in/riley-drk",
}

/** RFC 6068–friendly mailto: encodeURIComponent avoids + for spaces breaking some clients. */
export function contactMailtoHref(opts = {}) {
  const to = opts.to ?? "rileydrk123@gmail.com"
  const cc = opts.cc ?? "radrake@mun.ca"
  const subject = opts.subject ?? "Portfolio contact"
  return `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}`
}

const PRIMARY = "rileydrk123@gmail.com"
const CC = "radrake@mun.ca"
export const CONTACT_COPY_LINE = `${PRIMARY}\n${CC}`

/** Works in any desktop/mobile browser tab (embedded previews, machines with no mailto handler). */
export function gmailComposeHref(opts = {}) {
  const subject = encodeURIComponent(opts.subject ?? "Portfolio contact")
  const to = encodeURIComponent(opts.to ?? PRIMARY)
  const cc = encodeURIComponent(opts.cc ?? CC)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&cc=${cc}&su=${subject}`
}
