# Generative Art introduction maintenance / 介绍页维护

The introduction is independent from the React app and builds using Python's standard library. It never reads `.env` files, invokes OpenAI, requests devices, or runs saved artwork HTML. / 介绍页独立于 React 应用，使用 Python 标准库构建，不读取环境变量文件、不请求 AI、设备或运行历史 HTML 作品。

- Intro: https://songhaifan.github.io/frankie-generative-art/
- Chinese: https://songhaifan.github.io/frankie-generative-art/zh/
- App: https://p5-generative-art-archive.vercel.app

## Update content and behavior / 更新内容与行为

`site/content.json` owns English and Chinese product explanations. Update both languages when these source files change:

| Owning code | Intro content to review |
| --- | --- |
| `components/ArtArchive.tsx` | Selection limit, hover/touch behavior, built-in previews, initial random saved-artwork background |
| `constants.ts`, `visual_styles/*.ts` | Style names, metadata, tags and original sketches |
| `App.tsx`, `components/AnalysisView.tsx` | Analysis → follow-up → three variants → current-result export; memory-only session; fallback examples |
| `services/openaiService.ts`, `api/art.js`, `server/art-prompts.js` | Sent data, OpenAI provider, current Chinese output, static/camera/audio modes |
| `components/P5Renderer.tsx`, `App.tsx` → `handleDownload` | Preview/export library URLs, browser/device behavior and online dependencies |
| `index.html`, app component classes | Dark shell, serif display/sans labels, fine borders and square controls |

同步维护以上源代码对应的双语说明；不要把创意原型称为心理诊断，不要把需要 CDN 的导出描述为完整离线包。

## Assets and provenance / 素材与来源

| Asset | Capture or refresh procedure |
| --- | --- |
| `site/assets/archive-current.png` | Open the current app before selecting styles. Capture the settled opening screen. Background is random and may differ. / 采集当前版本开场界面，背景随机。 |
| `site/assets/selection-current.png` | Switch to English, scroll to the grid and select Constructivism, Color Field and Sublime. Capture their rendered previews and selection bar. **Do not click Generate Art merely to update this screenshot.** / 切换英文，选择这三个真实风格后采集，不必调用 AI。 |
| `docs/readme/assets/constructivism.png`, `color-field.png`, `sublime.png` | Existing actual sketch stills, shared with the approved banner. Recapture from `visual_styles/abstract.ts` / `atmosphere.ts` when the sketch changes. Keep banner provenance accurate if replacing these shared assets. / 真实绘图静态画面，与 banner 共用；绘图变化后重采并同步来源。 |
| `docs/readme/banner.png` | Approved sharing artwork, copied to `media/banner.png`. Update through the existing banner template. / 通过原有模板维护分享图。 |
| `docs/readme/assets/frankie.svg` | Approved signature. / 已确认的签名。 |

The anchor demo reads the three current style names and tag arrays directly from `visual_styles/*.ts` at build time. `source_samples()` in `site/build.py` names the three IDs and their matching stills. If IDs or source syntax change, update that small extractor and its assets together; it fails clearly rather than publishing missing metadata. It is a labelled still-based selection example, not an embedded full p5 engine. / 锚点演示构建时提取真实名称与标签；修改 ID 或元数据格式时同步更新提取器与静态素材。演示不是完整绘图引擎。

For additional screenshots/GIFs, use only real settled app states and nonpersonal demo data. Label existing generated examples as examples, not new AI output. Camera/audio are unnecessary for intro captures. A true GIF should record actual transitions and have a still/reduced-motion alternative. Never capture keys or private comments. / 新截图和动图须来自真实界面，使用非私人示例；不要把已有作品当作新生成结果。

## Build and check / 构建与检查

```sh
python3 site/build.py --out _site
node --check site/demo.js
python3 -m http.server 8080 --directory _site --bind 127.0.0.1
```

Open both `/` and `/zh/`, desktop and phone width. Choose all three examples, remove one, clear selection, and confirm source labels/tags. Check every image, anchor and application link. `site/demo.js` has no network or persistence. Review any art-history claim against primary references; current code explanation cites the official [p5 draw reference](https://p5js.org/reference/p5/draw/). / 检查双语、手机与桌面、选择/移除/清空、素材和链接。

## Publish / 发布

Push reviewed intro files to branch `simple`. `.github/workflows/pages.yml` builds only `_site` and publishes GitHub Pages. Its path filter includes `site/**`, `visual_styles/**`, banner and shared assets, so source metadata edits rebuild the small example. Vercel remains the app destination. Do not include unrelated app work, lockfiles or environment files. / 审核后推送到 `simple`，Pages 工作流只构建介绍页；不要包含其他修改。
