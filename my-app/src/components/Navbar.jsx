export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-900 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold">
          Riley Drake
        </h1>

        <div className="space-x-6 text-sm">
          <a href="#projects" className="hover:text-blue-400">Projects</a>
          <a href="#skills" className="hover:text-blue-400">Skills</a>
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
        </div>

      </div>
    </nav>
  )
}