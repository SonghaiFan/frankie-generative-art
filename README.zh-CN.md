![Frankie Generative Art](docs/readme/banner.png)

# Frankie Generative Art

[English](README.md) · [简体中文](README.zh-CN.md)

探索视觉风格，选择打动你的作品，再把这些选择转化为可交互的 P5.js 艺术。

[介绍页](https://songhaifan.github.io/frankie-generative-art/zh/) · [项目指南](docs/guide.md) · [本地运行](#本地运行)

## 可以做什么

- 浏览风格档案，体验实时视觉预览。
- 选择审美锚点，进行 AI 辅助分析与融合。
- 预览生成作品，并导出独立 HTML 文件。

## 本地运行

```sh
npm ci
npm run dev
```

打开 Vite 输出的地址。线上 AI 分析与生成使用 Vercel 服务端的 `OPENAI_API_KEY`；本地开发时在 `.env.local` 中配置。

## 开始之前

档案中包含现成的交互示例。AI 分析与三种作品生成模式通过同源 `/api/art` 接口调用 OpenAI，key 仅保存在服务端。详细指南保留了中英文介绍和配置说明。

## 开发说明

```sh
npm run build
```

[AI 配置](docs/ai-service.md) · [项目指南](docs/guide.md) · [Banner 维护](docs/readme/README.md)

---

由 [Songhai Fan](https://github.com/SonghaiFan) 制作 · Frankie 系列项目
