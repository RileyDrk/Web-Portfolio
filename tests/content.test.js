import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import test from "node:test"
import { projects } from "../src/data/projects.js"
import { about } from "../src/data/about.js"

test("every project has a unique URL and its configured screenshots exist", () => {
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length)
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    for (const shot of project.screenshots ?? []) {
      assert.ok(existsSync(new URL(`../public/${shot.src}`, import.meta.url)), `Missing ${shot.src}`)
      assert.ok(shot.alt?.trim(), `Missing screenshot description for ${project.slug}`)
    }
  }
})

test("the resume and favicon are available to the built site", () => {
  for (const path of [about.resume.href, "favicon.svg"]) {
    assert.ok(existsSync(new URL(`../public/${path}`, import.meta.url)), `Missing ${path}`)
  }
})
