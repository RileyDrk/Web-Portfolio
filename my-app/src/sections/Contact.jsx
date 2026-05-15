import { useCallback, useState } from "react"
import Reveal from "../components/Reveal"
import {
  contactMailtoHref,
  gmailComposeHref,
  CONTACT_COPY_LINE,
  profileLinks,
} from "../lib/urls"

export default function Contact() {
  const mailtoHref = contactMailtoHref({
    to: "rileydrk123@gmail.com",
    cc: "radrake@mun.ca",
    subject: "Portfolio contact",
  })
  const gmailHref = gmailComposeHref({
    subject: "Portfolio contact",
  })

  const [copyState, setCopyState] = useState("idle")

  const handleCopyEmails = useCallback(async () => {
    const text = CONTACT_COPY_LINE
    try {
      await navigator.clipboard.writeText(text)
      setCopyState("copied")
      window.setTimeout(() => setCopyState("idle"), 2200)
    } catch {
      window.prompt("Copy these addresses:", text)
      setCopyState("idle")
    }
  }, [])

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <Reveal delayMs={40}>
          <div className="contact-panel contact-panel-surface relative rounded-[var(--radius-xl)] border-2 border-theme overflow-hidden p-11 md:p-16 text-center">
            <div
              className="contact-panel-deco absolute -top-24 left-1/2 -translate-x-1/2 w-[min(92vw,26rem)] h-40 pointer-events-none"
              aria-hidden
            />

            <div className="relative max-w-xl mx-auto">
              <p className="section-label mb-4">Contact</p>
              <h2 className="text-3xl md:text-5xl font-bold text-theme mb-5 tracking-normal">
                Available for thoughtful opportunities
              </h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Roles, internships, collaborations, or a simple introduction—feel free to reach
                out and I&apos;ll reply when I can.
              </p>

              <div className="flex flex-col items-stretch gap-4 max-w-sm mx-auto w-full">
                <a
                  href={mailtoHref}
                  className="btn-primary-fill inline-flex justify-center rounded-[var(--radius-xl)] px-10 py-[1rem] cursor-pointer text-[1.025rem]"
                  title="Opens your default mail program (To + CC prefilled)"
                >
                  Email me
                </a>
                <a
                  href={gmailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-soft-outline inline-flex justify-center items-center rounded-[var(--radius-xl)] border px-8 py-[0.85rem] text-[0.95rem] font-semibold"
                  title="Compose in Gmail inside the browser if mailto does nothing"
                >
                  Compose in Gmail
                </a>
                <button
                  type="button"
                  onClick={() => void handleCopyEmails()}
                  className="text-sm font-semibold accent hover:underline underline-offset-4 py-1"
                >
                  {copyState === "copied" ? "Copied to clipboard!" : "Copy both email addresses"}
                </button>
              </div>

              <p className="text-muted text-[0.8125rem] mt-10 leading-snug px-2">
                <span className="font-mono tracking-normal text-muted/95 text-[0.78rem] sm:text-[0.8125rem] break-all">
                  rileydrk123@gmail.com
                </span>
                <span className="mx-2 text-muted">·</span>
                <span className="font-mono tracking-normal text-muted/95 text-[0.78rem] sm:text-[0.8125rem] break-all">
                  radrake@mun.ca
                </span>
                <span className="block mt-2 text-muted/90 normal-case tracking-normal font-sans text-[0.8rem]">
                  Gmail is prefilled as To · MUN on CC.
                </span>
              </p>
              <p className="sr-only">Email contact with mailto Gmail and copy options.</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-5 text-muted text-sm">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={profileLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold accent hover:underline underline-offset-4 transition-opacity hover:opacity-90"
            >
              GitHub
            </a>
            <span className="opacity-35 select-none hidden sm:inline" aria-hidden>
              ·
            </span>
            <a
              href={profileLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold accent hover:underline underline-offset-4 transition-opacity hover:opacity-90"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-center tracking-wide">© {new Date().getFullYear()} Riley Drake</p>
        </div>
      </div>
    </section>
  )
}
