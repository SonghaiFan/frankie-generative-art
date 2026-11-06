# Generative Art code and UI audit

Audited 2026-11-06, app source `09961d5` before this intro work. Only site assets/content/renderer and Pages watch paths changed. Pre-existing `package-lock.json` modification preserved.

## Actual app inspection

Opened https://p5-generative-art-archive.vercel.app in shared Ego workspace9, p2. Inspected the saved-HTML opening artwork, switched interface to English, scrolled the real grid, selected Constructivism, Color Field and Sublime, and observed three live canvases plus the 3/3 selection bar. Captured `site/assets/archive-current.png` and `selection-current.png`. No Generate Art submission, OpenAI request or device permission action was made.

## Source evidence

- `components/ArtArchive.tsx`: random saved HTML hero background; maximum three anchors, minimum one; selection toggles; hover/selection render `GenerativeArt`; explicit completion action.
- `visual_styles/index.ts`, `constants.ts`, `components/GenerativeArt.tsx`: source-defined p5 sketches become archive metadata and previews. The intro extracts three names/tag arrays at build time, using real existing rendered sketch stills.
- `App.tsx`: selected styles → interpretation → written response → parallel static/camera/audio requests; current-result HTML export; session state only; explicitly labelled AI error fallbacks.
- `components/AnalysisView.tsx`: one nonempty written answer advances; no separate persistent account/gallery flow claimed.
- `services/openaiService.ts`, `api/art.js`, `server/openai.js`, `server/art-prompts.js`: server OpenAI Responses, key server-only, selected metadata/comment payloads, Chinese requested interpretation/descriptions, three input modes. No key value or environment file was read.
- `components/P5Renderer.tsx`, `App.tsx` export: external p5, p5.sound and ml5 libraries. Export is portable HTML, not self-contained offline. Browser/device access remains relevant to reactive works.
- `index.html` and UI classes: black architectural shell, fine pale borders, square controls, serif display with sans UI labels. Intro uses native CSS, comparable font fallbacks and no new library/font network dependency. Brand fidelity overrides generic light/dual-theme guidance.

## Research

Read official primary p5 documentation: [draw()](https://p5js.org/reference/p5/draw/) and [createCanvas()](https://p5js.org/reference/p5/createCanvas/). The page paraphrases the drawing-loop/canvas concept and links draw(). No invented art history, psychic/clinical claim or unmeasured benefit is presented. Creative archetypes are labelled creative interpretations.

## Design and checks

Reading this as an app introduction for creative exploration, preserving the real dark architectural archive rather than the earlier warm template. Design variance5, motion1, density3. Static images and explicit interactive selection keep the page quiet and avoid automatic resource/device requests.

- Python standard-library build generated EN root and Chinese `zh/`.
- Coordinating local asset/link checker:2 pages, zero issues.
- `node --check site/demo.js`; `git diff --check` passed.
- Real browser demo: selected all three source-defined anchors, checked names/tags and selected state, cleared them and checked empty state + disabled clear button.
- Real390px target viewport: EN and Chinese each scrollWidth390 / innerWidth390, all images loaded without broken assets. Desktop screenshot visually reviewed with readable CTA, coherent dark theme and real UI hero. Mobile Chinese screenshot visually reviewed. Device override cleared afterward.
- No Lighthouse run: not available through the approved Ego session interface. No runtime app, paid generation, camera or microphone test performed for this intro-only change.
