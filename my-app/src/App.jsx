import Navbar from "./components/Navbar"

function Section({ id, title }) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center border-b border-zinc-800"
    >
      <h2 className="text-4xl font-bold">{title}</h2>
    </section>
  )
}

export default function App() {
  return (
    <div className="bg-zinc-950 text-white">

      <Navbar />

      <main className="pt-20">

        <Section id="hero" title="Hero Section" />
        <Section id="projects" title="Projects" />
        <Section id="skills" title="Skills" />
        <Section id="about" title="About Me" />
        <Section id="contact" title="Contact" />

      </main>

    </div>
  )
}