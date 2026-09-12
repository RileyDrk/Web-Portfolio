import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Organizations from "./sections/Organizations"
import Contact from "./sections/Contact"
import ProjectPage from "./pages/ProjectPage"
import ProjectsPage from "./pages/ProjectsPage"
import { getProjectBySlug } from "./data/projects"
import { goHome, useRoute } from "./router/useRoute"

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Organizations />
      <Contact />
    </>
  )
}

export default function App() {
  const route = useRoute()
  const project = route.page === "project" ? getProjectBySlug(route.slug) : null

  useEffect(() => {
    if (route.page === "project") {
      if (!project) {
        goHome()
        return
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const hash = window.location.hash
    if (!hash || hash.startsWith("#/projects")) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const id = hash.replace(/^#/, "")
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [route, project])

  return (
    <div className="bg-theme text-theme min-h-screen transition-[background-color,color] duration-500 ease-out relative">
      <div className="page-backdrop" aria-hidden="true">
        <div className="page-backdrop__blob page-backdrop__blob--1" />
        <div className="page-backdrop__blob page-backdrop__blob--2" />
        <div className="page-backdrop__blob page-backdrop__blob--3" />
        <div className="page-backdrop__mesh" />
        <div className="page-backdrop__vignette" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-20">
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
