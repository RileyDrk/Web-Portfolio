import { projects } from '../data/projects'

export default function ProjectsPage() {
  return (
    <section className="page-section">
      <h1>Projects</h1>
      <p className="lead">A few things I have built and continue to improve.</p>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p className="project-stack">{project.stack.join(' • ')}</p>
            <a href={project.link} target="_blank" rel="noreferrer">
              View project
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
