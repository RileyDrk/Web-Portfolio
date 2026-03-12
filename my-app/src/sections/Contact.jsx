export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">

      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-theme">
          Get In Touch
        </h2>

        <p className="text-muted mb-10">
          I'm always open to discussing new projects, opportunities,
          or collaborations.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">

          <a
            href="mailto:your-email@example.com"
            className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition"
          >
            Email Me
          </a>

          <a
            href="https://github.com/RileyDrk"
            className="px-6 py-3 border border-theme rounded-lg hover:bg-surface transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/riley-drk"
            className="px-6 py-3 border border-theme rounded-lg hover:bg-surface transition"
          >
            LinkedIn
          </a>

        </div>

      </div>

    </section>
  )
}