#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out evidence
exec > >(tee evidence/selftest.txt) 2>&1
printf '%s\n' 'Running complete Remotion self-test'
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
node scripts/check-source.mjs
npm run typecheck
npm run format:check
npm test
npm run render > out/render.log 2>&1 || { cat out/render.log; exit 1; }
printf '%s\n' 'PASS: complete 900-frame Remotion render'
for frame in 0 90 180 285 390 450 510 570 645 720 810 870; do
  name=$(printf '%03d' "$frame")
  ffmpeg -hide_banner -loglevel error -y -i out/claude-video-motion.mp4 -vf "select=eq(n\,$frame)" -frames:v 1 -update 1 "evidence/frame-$name.png"
done
npx remotion still src/index.ts ClaudeVideoMotion out/deterministic-a.png --frame=510 --log=error
npx remotion still src/index.ts ClaudeVideoMotion out/deterministic-b.png --frame=510 --log=error
node scripts/verify-render.mjs
ffmpeg -hide_banner -loglevel error -y -pattern_type glob -i 'evidence/frame-*.png' -vf 'scale=320:180,tile=4x3' -frames:v 1 -update 1 evidence/storyboard.jpg
printf '%s\n' 'PASS: storyboard and render evidence saved in evidence/'
