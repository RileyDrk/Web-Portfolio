import assert from "node:assert/strict"
import test from "node:test"
import { parseRoute } from "../src/router/routes.js"

test("home anchors leave legacy project pages", () => {
  for (const hash of ["#hero", "#about", "#skills", "#organizations", "#contact"]) {
    assert.deepEqual(parseRoute({ hash, pathname: "/projects/blokus" }), { page: "home" })
  }
})

test("hash navigation wins over the current pathname", () => {
  assert.deepEqual(parseRoute({ hash: "#/projects", pathname: "/projects/blokus" }), { page: "projects" })
  assert.deepEqual(parseRoute({ hash: "#/projects/weather-dashboard", pathname: "/projects/blokus" }), {
    page: "project", slug: "weather-dashboard",
  })
})

test("legacy URLs and subdirectory hosting still resolve", () => {
  assert.deepEqual(parseRoute({ pathname: "/projects/" }), { page: "projects" })
  assert.deepEqual(parseRoute({ pathname: "/portfolio/projects/blokus/", base: "/portfolio/" }), {
    page: "project", slug: "blokus",
  })
  assert.deepEqual(parseRoute({ pathname: "/portfolio-other/projects/blokus", base: "/portfolio/" }), { page: "home" })
})

test("encoded slugs resolve without crashing on malformed URLs", () => {
  assert.deepEqual(parseRoute({ hash: "#/projects/my%20project" }), { page: "project", slug: "my project" })
  for (const hash of ["#/projects/%", "#/projects/%E0%A4%A", "#/projects/blokus/extra", "#/unknown"]) {
    assert.deepEqual(parseRoute({ hash }), { page: "home" })
  }
})
