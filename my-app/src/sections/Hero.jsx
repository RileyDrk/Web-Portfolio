import profile from "../assets/profile.jpg"

export default function Hero() {
  return (
    <section id="hero" className="px-6 pt-32 pb-24 bg-theme">
        
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-theme">
            Riley <span className="accent">Drake</span>
          </h1>

          <p className="text-muted text-lg max-w-xl mb-8">
            Developer focused on building clean, practical software and
            constantly improving through real projects and experimentation.
          </p>

          <div className="flex gap-4">

            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-3 border border-theme rounded-lg hover:bg-surface transition"
            >
              Contact Me
            </a>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src={profile}
            alt="Riley Drake"
            className="w-64 md:w-80 rounded-xl border border-theme shadow-lg"
          />

        </div>

      </div>

    </section>
  )
}