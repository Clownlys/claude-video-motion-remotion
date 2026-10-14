import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";
const script = resolve("scripts/bind-repository.mjs");
const recordingId = "e3ee409a-50f7-4b4a-af27-288226e47a57";
const repository = "https://github.com/example/recreation";
const credential = "test-binding-credential";
const scenarios = [
  {
    name: "success",
    status: 200,
    body: { recording_id: recordingId, github_url: repository },
    exit: 0,
  },
  {
    name: "nested success",
    status: 201,
    body: { data: { recording_id: recordingId, github_url: repository } },
    exit: 0,
  },
  {
    name: "normalized success",
    status: 200,
    body: { recording_id: recordingId, github_url: repository + "/" },
    exit: 0,
  },
  {
    name: "wrong recording",
    status: 200,
    body: { recording_id: "different", github_url: repository },
    exit: 1,
  },
  {
    name: "wrong repository",
    status: 200,
    body: { recording_id: recordingId, github_url: repository + "-wrong" },
    exit: 1,
  },
  {
    name: "expired credential",
    status: 401,
    body: {},
    exit: 1,
    message: "401",
  },
  {
    name: "existing binding",
    status: 409,
    body: {},
    exit: 1,
    message: "No binding was removed",
  },
  { name: "server error", status: 500, body: {}, exit: 1, message: "500" },
];
for (const scenario of scenarios) {
  const cwd = mkdtempSync(join(tmpdir(), "motion-binding-test-"));
  try {
    const mock = `globalThis.fetch=async(url,options)=>{if(options.method!=='POST'||url!=='https://motionface.cc/api/recordings/${recordingId}/repository')throw new Error('Unexpected mutation');if(options.headers.Authorization!=='Bearer ${credential}'||JSON.parse(options.body).github_url!=='${repository}')throw new Error('Bad request');return new Response(${JSON.stringify(JSON.stringify(scenario.body))},{status:${scenario.status},headers:{'Content-Type':'application/json'}});};`;
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        `data:text/javascript,${encodeURIComponent(mock)}`,
        script,
        repository,
      ],
      { cwd, input: credential, encoding: "utf8" },
    );
    assert.equal(
      result.status,
      scenario.exit,
      `${scenario.name}: ${result.stderr}`,
    );
    assert.ok(
      !(result.stdout + result.stderr).includes(credential),
      "Credential leaked to output",
    );
    if (scenario.message) assert.ok(result.stderr.includes(scenario.message));
    const evidence = join(cwd, "evidence/binding.json");
    assert.equal(
      existsSync(evidence),
      scenario.exit === 0,
      "Failed requests must not write successful evidence",
    );
    if (scenario.exit === 0) {
      const saved = JSON.parse(readFileSync(evidence, "utf8"));
      assert.equal(saved.recording_id, recordingId);
      assert.equal(saved.github_url, repository);
    }
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}
console.log(
  "PASS: 8 binding API contract cases, including 401/409, mismatches and credential redaction.",
);
