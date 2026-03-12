import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"

export default function App() {
  return (
    <div className="bg-theme text-theme min-h-screen transition-colors duration-300">

      <Navbar />

      <main className="pt-20">

        <Hero />
        <Projects />
        <Skills />
        <Contact />

      </main>

    </div>
  )
}