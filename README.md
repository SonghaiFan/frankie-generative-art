![Frankie Generative Art](docs/readme/banner.png)

# Frankie Generative Art

[English](README.md) · [简体中文](README.zh-CN.md)

Explore visual styles, choose what resonates, and turn those choices into interactive P5.js artwork.

[Introduction](https://songhaifan.github.io/frankie-generative-art/) · [Guide](docs/guide.md) · [Run locally](#run-locally)

## What it does

- Browse the style archive and try its live visual previews.
- Choose aesthetic anchors for AI-assisted analysis and synthesis.
- Preview generated work and export a standalone HTML artwork.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Online AI analysis and generation use the server-side `OPENAI_API_KEY` on Vercel; local development reads it from `.env.local`.

## Before you start

The archive includes existing interactive examples. AI analysis and all three artwork modes use OpenAI through the same-origin `/api/art` endpoint. The key remains on the server. The detailed guide retains the English and Chinese descriptions and setup notes.

## For developers

```sh
npm run build
```

[AI setup](docs/ai-service.md) · [Project guide](docs/guide.md) · [Artwork](docs/readme/README.md)

---

Made by [Songhai Fan](https://github.com/SonghaiFan) · A Frankie project
