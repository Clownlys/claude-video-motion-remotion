import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
const repo = process.argv[2];
assert.match(repo ?? "", /^[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/);
const gh = (args) => execFileSync("gh", args, { encoding: "utf8" }).trim();
const info = JSON.parse(gh(["api", `repos/${repo}`]));
assert.equal(info.private, false, "Repository must be public");
const local = execFileSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const remote = JSON.parse(
  gh(["api", `repos/${repo}/commits/${info.default_branch}`]),
).sha;
assert.equal(local, remote, "Remote commit must match local HEAD");
for (const path of [
  "src/Video.tsx",
  "package-lock.json",
  "README.md",
  "scripts/selftest.sh",
])
  gh(["api", `repos/${repo}/contents/${path}`]);
const result = {
  status: "passed",
  github_url: info.html_url,
  visibility: "public",
  branch: info.default_branch,
  local_commit: local,
  remote_commit: remote,
  verified_at: new Date().toISOString(),
};
mkdirSync("out", { recursive: true });
writeFileSync("out/publication.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
