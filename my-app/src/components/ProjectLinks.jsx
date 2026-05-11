import { useState } from "react"
import { ExternalLink, Github, Download, Loader2 } from "lucide-react"
import { publicAssetUrl } from "../lib/urls"
import { downloadJarSmart } from "../lib/binaryDownload"

function resolveHref(href) {
  if (!href || href === "#") return null
  if (/^https?:\/\//i.test(href)) return href
  return publicAssetUrl(href.replace(/^\//, ""))
}

function JarDemoAnchor({ href, fileName, label }) {
  const [busy, setBusy] = useState(false)

  async function handleClick(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    try {
      await downloadJarSmart(href, fileName)
    } catch (err) {
      console.error(err)
      window.alert(
        err instanceof Error
          ? err.message
          : "Could not download the JAR. Check that the file is in public/ and committed as a binary.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-sm font-semibold accent cursor-pointer transition-[transform,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-95 group/link motion-reduce:transition-none ${
        busy ? "pointer-events-none opacity-70" : ""
      }`}
      onClick={(e) => void handleClick(e)}
      aria-busy={busy}
    >
      {busy ? (
        <Loader2
          size={16}
          className="animate-spin opacity-85 motion-reduce:animate-none shrink-0"
          aria-hidden
        />
      ) : (
        <Download
          size={16}
          className="opacity-80 shrink-0 transition-transform duration-300 motion-reduce:transition-none group-hover/link:-translate-y-px group-hover/link:translate-x-0.5"
          aria-hidden
        />
      )}
      {busy ? "Preparing download…" : label}
    </a>
  )
}

export default function ProjectLinks({ github, demo, demoLabel, className = "" }) {
  const gh = github && github !== "#" ? resolveHref(github) : null
  const dm = demo && demo !== "#" ? resolveHref(demo) : null
  const jarDownload = /\.jar$/i.test(demo ?? "")
  const jarFileName =
    jarDownload && demo
      ? (demo.includes("/") ? demo.split("/").pop() : demo.split("\\").pop()) ?? "Blokus.jar"
      : undefined

  if (!gh && !dm) return null

  return (
    <div className={`flex flex-wrap gap-3 ${className}`.trim()}>
      {gh && (
        <a
          href={gh}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold accent transition-[transform,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-95 group/link motion-reduce:transition-none"
        >
          <Github
            size={16}
            className="opacity-80 shrink-0 transition-transform duration-300 motion-reduce:transition-none group-hover/link:-translate-y-px group-hover/link:translate-x-0.5"
            aria-hidden
          />
          Source
        </a>
      )}
      {dm &&
        (jarDownload ? (
          <JarDemoAnchor href={dm} fileName={jarFileName} label={demoLabel ?? "Download JAR"} />
        ) : (
          <a
            href={dm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold accent transition-[transform,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-95 group/link motion-reduce:transition-none"
          >
            <ExternalLink
              size={16}
              className="opacity-80 shrink-0 transition-transform duration-300 motion-reduce:transition-none group-hover/link:-translate-y-px group-hover/link:translate-x-0.5"
              aria-hidden
            />
            {demoLabel ?? "Live demo"}
          </a>
        ))}
    </div>
  )
}
