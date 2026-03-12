import { projects } from "../data/projects"

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-theme">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (

            <div
              key={index}
              className="bg-surface border border-theme rounded-xl p-6 hover:shadow-lg transition"
            >

              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-muted mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-theme border border-theme rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm">

                <a href={project.github} className="accent hover:underline">
                  GitHub
                </a>

                <a href={project.demo} className="accent hover:underline">
                  Demo
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}