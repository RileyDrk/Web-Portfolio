import { useEffect } from "react"
import Navbar from "./components/Navbar"
import BackgroundDecals from "./components/BackgroundDecals"
import HomePage from "./pages/HomePage"
import ProjectPage from "./pages/ProjectPage"
import ProjectsPage from "./pages/ProjectsPage"
import { getProjectBySlug } from "./data/projects"
import { goHome, useRoute } from "./router/useRoute"

export default function App() {
  const route = useRoute()
  const project = route.page === "project" ? getProjectBySlug(route.slug) : null

  useEffect(() => {
    document.title = project
      ? `${project.title} | Riley Drake`
      : route.page === "projects" ? "Projects | Riley Drake" : "Riley Drake | Portfolio"
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    if (route.page === "project") {
      if (!project) {
        goHome()
        return
      }
      window.scrollTo({ top: 0, behavior })
      return
    }

    const hash = window.location.hash
    if (!hash || hash.startsWith("#/projects")) {
      window.scrollTo({ top: 0, behavior })
      return
    }

    const id = hash.replace(/^#/, "")
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" })
  }, [route, project])

  return (
    <div className="bg-theme text-theme min-h-screen transition-[background-color,color] duration-500 ease-out relative">
      <BackgroundDecals />
      <a href="#main-content" className="skip-link" onClick={(event) => {
        event.preventDefault()
        document.getElementById("main-content")?.focus()
      }}>Skip to content</a>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative z-10">
        {route.page === "project" && project ? (
          <ProjectPage key={project.slug} project={project} />
        ) : route.page === "projects" ? (
          <ProjectsPage />
        ) : (
          <HomePage />
        )}
      </main>
    </div>
  )
}
