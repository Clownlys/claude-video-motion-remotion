import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
const recordingId = "e3ee409a-50f7-4b4a-af27-288226e47a57";
const url = process.argv[2];
if (
  !/^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+$/.test(url ?? "")
) {
  console.error(
    "Usage: node scripts/bind-repository.mjs https://github.com/owner/repo < token-file",
  );
  process.exit(1);
}
const token = readFileSync(0, "utf8").trim();
if (!token) {
  console.error("A binding credential must be supplied on stdin.");
  process.exit(1);
}
try {
  const response = await fetch(
    `https://motionface.cc/api/recordings/${recordingId}/repository`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ github_url: url }),
      signal: AbortSignal.timeout(30000),
    },
  );
  if (response.status === 409) {
    console.error(
      "HTTP 409: another repository is already bound for this user. No binding was removed.",
    );
    process.exit(1);
  }
  if (response.status === 401) {
    console.error(
      "HTTP 401: refresh the reproduction prompt from the recording page.",
    );
    process.exit(1);
  }
  if (!response.ok) {
    console.error(`Binding failed: HTTP ${response.status}`);
    process.exit(1);
  }
  const body = await response.json();
  const normalizeUrl = (value) =>
    typeof value === "string"
      ? value
          .replace(/\.git$/, "")
          .replace(/\/$/, "")
          .toLowerCase()
      : "";
  const findMatch = (value) => {
    if (!value || typeof value !== "object") return null;
    const recordValue = value.recording_id ?? value.recordingId;
    const repoValue =
      value.github_url ??
      value.githubUrl ??
      value.repository_url ??
      value.repositoryUrl;
    if (
      recordValue === recordingId &&
      normalizeUrl(repoValue) === normalizeUrl(url)
    )
      return { recording_id: recordValue, github_url: repoValue };
    for (const child of Object.values(value)) {
      const match = findMatch(child);
      if (match) return match;
    }
    return null;
  };
  if (!findMatch(body)) {
    console.error(
      "HTTP success returned unexpected recording/repository identifiers.",
    );
    process.exit(1);
  }
  const result = {
    http_status: response.status,
    recording_id: recordingId,
    github_url: url,
    verified_at: new Date().toISOString(),
  };
  mkdirSync("evidence", { recursive: true });
  writeFileSync(
    "evidence/binding.json",
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(`Binding request failed: ${error.name}`);
  process.exit(1);
}
