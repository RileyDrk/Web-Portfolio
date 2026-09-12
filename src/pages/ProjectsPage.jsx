import { ArrowLeft } from "lucide-react"
import ProjectCard from "../components/ProjectCard"
import Reveal from "../components/Reveal"
import { projects } from "../data/projects"
import { goHome } from "../router/useRoute"

export default function ProjectsPage() {
  return (
    <article className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl mb-12 md:mb-14">
          <button type="button" onClick={goHome} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-[var(--accent)] transition-colors mb-10 cursor-pointer">
            <ArrowLeft size={18} strokeWidth={1.85} aria-hidden /> Back to home
          </button>
          <p className="section-label mb-3">Project archive</p>
          <h1 className="text-4xl md:text-6xl font-bold text-theme tracking-normal mb-4">All projects</h1>
          <p className="text-muted text-lg leading-relaxed">Every project in one place. Select a card for its complete write-up, screenshots, code snippets, and links.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delayMs={Math.min(index * 55, 220)}><ProjectCard project={project} compact /></Reveal>
          ))}
        </div>
      </div>
    </article>
  )
}
