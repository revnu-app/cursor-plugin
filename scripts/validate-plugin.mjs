import assert from "node:assert/strict";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(path, "utf8");
const json = (path) => JSON.parse(read(path));
const inside = (base, path) => {
  assert.equal(typeof path, "string", "component path must be a string");
  assert(!isAbsolute(path), `absolute component path: ${path}`);
  const target = resolve(base, path);
  const fromRoot = relative(root, target);
  assert(!fromRoot.startsWith("..") && !isAbsolute(fromRoot), `path escapes plugin: ${path}`);
  assert(existsSync(target), `missing file: ${path}`);
  assert(!lstatSync(target).isSymbolicLink(), `symlink in plugin: ${path}`);
  return target;
};

const manifest = json(join(root, ".cursor-plugin/plugin.json"));
assert.match(manifest.name, /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert(manifest.description?.trim(), "missing plugin description");
assert(manifest.author?.name?.trim(), "missing author");
assert.equal(manifest.license, "MIT");
for (const field of ["homepage", "repository"]) {
  assert.equal(new URL(manifest[field]).protocol, "https:", `invalid ${field}`);
}
const logo = inside(root, manifest.logo);
assert(read(logo).includes("<svg"), "logo must be an SVG");
const config = json(inside(root, manifest.mcpServers));
assert.deepEqual(Object.keys(config.mcpServers), ["revnu"]);
assert.deepEqual(config.mcpServers.revnu, {
  type: "http",
  url: "https://revnu.com/api/mcp",
});

const skillsPath = inside(root, manifest.skills);
const skillNames = new Set();
for (const entry of readdirSync(skillsPath, { withFileTypes: true })) {
  assert(entry.isDirectory(), `unexpected skill entry: ${entry.name}`);
  const skill = inside(skillsPath, `${entry.name}/SKILL.md`);
  const text = read(skill);
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text)?.[1];
  assert(frontmatter, `missing skill frontmatter: ${entry.name}`);
  const name = /^name: (.+)$/m.exec(frontmatter)?.[1];
  const description = /^description: (.+)$/m.exec(frontmatter)?.[1];
  assert.equal(name, entry.name, `skill name must match its folder: ${entry.name}`);
  assert(description?.trim(), `missing skill description: ${entry.name}`);
  assert(!skillNames.has(name), `duplicate skill: ${name}`);
  skillNames.add(name);
}
assert(skillNames.size > 0, "no skills found");

let files = 0;
function checkFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const path = inside(directory, entry.name);
    assert(
      !/^(?:\.env(?:\..*)?|node_modules|\.dev|\.next)$/.test(entry.name),
      `private/build file: ${path}`,
    );
    if (entry.isDirectory()) {
      checkFiles(path);
      continue;
    }
    files++;
    if (!entry.name.endsWith(".md")) continue;
    for (const match of read(path).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const link = match[1].split("#")[0];
      if (link && !/^[a-z]+:/i.test(link)) inside(dirname(path), link);
    }
  }
}
checkFiles(root);
for (const name of ["README.md", "TESTING.md", "LICENSE"]) inside(root, name);
console.log(
  `Valid Revnu plugin: ${skillNames.size} skills, 1 hosted OAuth MCP, ${files} files; all local references resolve.`,
);
