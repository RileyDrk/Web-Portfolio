# Riley Drake — Portfolio

My personal portfolio, showcasing software projects, technical skills, and involvement with FormulaMUN and the MUN Computer Science Society.

[Visit the portfolio](https://rileydrake.ca)

## Features

- A home page with a scrollable carousel of up to 10 projects, an introduction, skills, clubs and organizations, and contact information.
- An all-projects page with visual cards and individual project pages for write-ups, screenshots, code snippets, and links.
- Screenshot covers with illustrated icon fallbacks.
- Light and dark themes, responsive layouts, and reduced-motion support.
- A downloadable résumé and custom RD favicon.

## Stack

React 19, JavaScript, Vite 8 beta, Tailwind CSS 4, and Lucide icons. Content lives in JavaScript data files; the site builds to static files that can be served by NGINX or another static host.

## Run locally

Use Node.js 22.12+ and npm. Run the following from the `Web-Portfolio` repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Serve the app through Vite instead of opening `index.html` directly.

On Windows, use `npm.cmd` in place of `npm` if PowerShell blocks the npm script.

### Commands

Run these from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Build the site into `dist/`. |
| `npm run preview` | Serve the existing build locally for inspection. |
| `npm run lint` | Run ESLint. |

## Update content

| Content | File |
| --- | --- |
| Projects, screenshots, code snippets, home carousel | [projects.js](src/data/projects.js) |
| Biography, education, résumé link | [about.js](src/data/about.js) |
| Skills | [skills.js](src/data/skills.js) |
| Clubs and organizations | [experience.js](src/data/experience.js) |
| Hero introduction | [Hero.jsx](src/sections/Hero.jsx) |
| Social links and email helpers | [urls.js](src/lib/urls.js) |
| Displayed email addresses | [Contact.jsx](src/sections/Contact.jsx) |
| Portrait | [hero-photo.jpeg](src/assets/hero-photo.jpeg) |
| Downloadable résumé | [Riley Drake Resume.pdf](<public/Riley Drake Resume.pdf>) |
| Favicon | [favicon.svg](public/favicon.svg) |

### Add a project

Add an object to the `projects` array in `src/data/projects.js`. Use a unique, URL-friendly `slug`:

```js
{
  slug: "new-project",
  title: "New Project",
  subtitle: "A short description of the project",
  description: "A brief summary for the project card.",
  overview: "A longer explanation of the work and my contribution.",
  tech: ["JavaScript", "React"],
  icon: "portfolio",
  screenshots: [
    {
      src: "projects/new-project/screenshot-1.png",
      alt: "Describe what the screenshot shows",
      caption: "Context for this screenshot.",
    },
  ],
}
```

Place the corresponding image at `public/projects/new-project/screenshot-1.png`. Asset paths are relative to `public/`, and filenames must match exactly, including capitalization.

Every entry appears on the all-projects page automatically. The home carousel displays the first 10 entries in the `projects` array, or all entries if there are fewer than 10. Reorder the array to choose which projects appear first; the `homeProjects` export applies the limit.

Optional fields include `github`, `demo`, `demoLabel`, `highlight`, and `snippets`. Each snippet accepts `title`, `language`, `caption`, and `code`.

### Card images

Cards use the first configured screenshot by default. Set `cover: { src, alt }` on a project to choose a separate card image. If no image is configured or the image fails to load, the card displays an illustrated icon.

The available fallback icon types are `blokus`, `weather`, `portfolio`, `server`, `telemetry`, and `search`. Cover artwork is defined in [ProjectCover.jsx](src/components/ProjectCover.jsx); card and detail-page icons are mapped in [ProjectCard.jsx](src/components/ProjectCard.jsx) and [ProjectPage.jsx](src/pages/ProjectPage.jsx).

## Navigation

The main links use hash routes, which work with static hosting:

- `#/projects` opens all projects.
- `#/projects/<slug>` opens a project's full page.
- Home section anchors include `#about`, `#skills`, `#organizations`, and `#contact`.

Routing is implemented in [useRoute.js](src/router/useRoute.js).

## Build and deployment

The public asset path is selected by [vite.config.js](vite.config.js), in this order:

1. `VITE_BASE`, when set.
2. The repository name from `GITHUB_REPOSITORY`, when set (for example, `/Web-Portfolio/`).
3. `/Web-Portfolio/` as the default.

For a site served at the root of a custom domain, such as `rileydrake.ca`, build with `VITE_BASE=/`.

**PowerShell**, from the repository root:

```powershell
$env:VITE_BASE = "/"
npm.cmd run build
```

**Bash**, from the repository root:

```sh
VITE_BASE=/ npm run build
```

For a GitHub Pages project site, set the base to the repository subpath instead. If deploying through GitHub Actions, `GITHUB_REPOSITORY` supplies that name automatically unless `VITE_BASE` overrides it.

Deploy the contents of `dist/` to the corresponding web root or subpath. The build also generates `404.html` from `index.html`. Building creates the files locally; publishing them to the hosting server is a separate step.
