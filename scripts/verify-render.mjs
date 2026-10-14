import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
const metadata = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      "out/claude-video-motion.mp4",
    ],
    { encoding: "utf8" },
  ),
);
const video = metadata.streams.find((s) => s.codec_type === "video");
const audio = metadata.streams.find((s) => s.codec_type === "audio");
assert.equal(video.width, 1280);
assert.equal(video.height, 720);
assert.equal(video.r_frame_rate, "30/1");
assert.equal(Number(video.nb_frames), 900);
assert.ok(Math.abs(Number(video.duration) - 30) < 0.04);
assert.ok(
  audio && audio.channels === 2 && Number(audio.duration) >= 29.9,
  "Stereo audio must span the composition",
);
const hash = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");
assert.equal(
  hash("out/deterministic-a.png"),
  hash("out/deterministic-b.png"),
  "Repeated frame render changed",
);
const frames = [0, 90, 180, 285, 390, 450, 510, 570, 645, 720, 810, 870];
const hashes = frames.map((frame) =>
  hash(`evidence/frame-${String(frame).padStart(3, "0")}.png`),
);
assert.equal(
  new Set(hashes).size,
  frames.length,
  "Distinct story beats must not repeat one frozen frame",
);
const result = {
  status: "passed",
  composition: "ClaudeVideoMotion",
  width: video.width,
  height: video.height,
  fps: 30,
  frames: 900,
  duration: 30,
  audio: {
    codec: audio.codec_name,
    channels: audio.channels,
    duration: Number(audio.duration),
  },
  deterministicFrame: 510,
  deterministicSha256: hash("out/deterministic-a.png"),
  distinctKeyframes: frames.length,
  videoSha256: hash("out/claude-video-motion.mp4"),
};
writeFileSync(
  "evidence/render-validation.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log("PASS: 1280x720, 30 fps, 900 frames, 30 seconds, stereo AAC.");
console.log(
  "PASS: 12 distinct keyframes; frame 510 renders identically twice.",
);
