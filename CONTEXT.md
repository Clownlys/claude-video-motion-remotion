# Context and decisions

Lin requested a Remotion reconstruction of recording `e3ee409a-50f7-4b4a-af27-288226e47a57`, a public repository under Lin's GitHub account, and an API binding to that recording. Lin explicitly authorized creation, commit, push and binding.

- Work is isolated under the laboratory's `sandbox/claude-video-motion` directory and published as an independent repository.
- Visuals use React/SVG, reconstructed from locally downloaded reference keyframes. Reference video is not a runtime dependency.
- Preserve the supplied stereo audio to match editing beats; describe reference-media ownership without asserting a new license.
- Bundle OFL fonts so rendering does not depend on installed system fonts.
- Render 1280 × 720, 30 fps, 900 frames; retain original semantic beats and acknowledge illustration/font/motion approximations.
- Never publish the signed reference URL or binding credential. Binding credential enters the helper through stdin.
- Existing bindings must survive; stop on HTTP 409, and do not attempt deletion. HTTP 401 requires a fresh credential.
- Codex implements; Claude Sonnet performs independent static review. Source/type/format checks, render validation, frame determinism, API contract checks and visual inspection provide separate evidence.

## Delivery status

Complete implementation, final full-render self-test, clean lockfile install, independent Claude review, public GitHub publication and recording binding have passed. Repository: https://github.com/Clownlys/claude-video-motion-remotion. Binding returned HTTP 200 with the expected recording ID and repository root URL. Final visual acceptance belongs to Lin.
