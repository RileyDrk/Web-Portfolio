export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-theme">
          Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-surface border border-theme rounded-xl p-6">

            <h3 className="text-xl font-semibold mb-4 accent">
              Languages
            </h3>

            <ul className="space-y-2 text-muted">
              <li>Python</li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>

          </div>

          <div className="bg-surface border border-theme rounded-xl p-6">

            <h3 className="text-xl font-semibold mb-4 accent">
              Frameworks
            </h3>

            <ul className="space-y-2 text-muted">
              <li>React</li>
              <li>Node.js</li>
              <li>Discord.py</li>
            </ul>

          </div>

          <div className="bg-surface border border-theme rounded-xl p-6">

            <h3 className="text-xl font-semibold mb-4 accent">
              Tools
            </h3>

            <ul className="space-y-2 text-muted">
              <li>Git</li>
              <li>Docker</li>
              <li>Linux</li>
            </ul>

          </div>

        </div>

      </div>

    </section>
  )
}