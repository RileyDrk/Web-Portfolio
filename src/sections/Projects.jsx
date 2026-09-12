import { useEffect, useRef } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { homeProjects } from "../data/projects"
import Reveal from "../components/Reveal"
import ProjectCard from "../components/ProjectCard"
import { projectsHref } from "../router/useRoute"

export default function Projects() {
  const carouselRef = useRef(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return undefined
    function handleWheel(event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      if (maxScroll <= 1) return
      if (event.deltaY < 0 && carousel.scrollLeft <= 1) return
      if (event.deltaY > 0 && carousel.scrollLeft >= maxScroll - 1) return
      event.preventDefault()
      carousel.scrollBy({ left: event.deltaY, behavior: "auto" })
    }
    carousel.addEventListener("wheel", handleWheel, { passive: false })
    return () => carousel.removeEventListener("wheel", handleWheel)
  }, [])

  function scrollProjects(direction) {
    const carousel = carouselRef.current
    if (!carousel) return
    const card = carousel.firstElementChild
    const gap = Number.parseFloat(window.getComputedStyle(carousel).gap) || 0
    const projectWidth = card?.getBoundingClientRect().width || carousel.clientWidth
    carousel.scrollBy({ left: direction * (projectWidth + gap), behavior: "smooth" })
  }

  return (
    <section id="projects" className="px-6 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-10 md:mb-12">
          <p className="section-label mb-3">Projects</p>
          <h2 className="text-3xl md:text-5xl font-bold text-theme mb-4 tracking-normal">Highlights from recent builds</h2>
          <p className="text-muted text-lg leading-relaxed">Explore what I&apos;ve been building. Open a card for the full story, or browse the complete collection.</p>
        </Reveal>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted">Scroll to explore projects</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollProjects(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border-2 border-theme text-theme hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer" aria-label="Show previous featured projects"><ChevronLeft size={20} aria-hidden /></button>
              <button type="button" onClick={() => scrollProjects(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border-2 border-theme text-theme hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer" aria-label="Show next featured projects"><ChevronRight size={20} aria-hidden /></button>
            </div>
            <a href={projectsHref()} className="btn-soft-outline inline-flex items-center gap-2 rounded-[var(--radius-lg)] px-4 py-2 text-sm">All projects <ArrowRight size={16} aria-hidden /></a>
          </div>
        </div>

        <div ref={carouselRef} className="flex gap-6 lg:gap-8 overflow-x-auto overscroll-y-contain snap-x snap-mandatory scroll-smooth -mx-2 px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" aria-label="Featured project carousel">
          {homeProjects.map((project, index) => (
            <Reveal key={project.slug} delayMs={index * 80} className="w-[min(100%,30rem)] shrink-0 snap-start"><ProjectCard project={project} compact /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
