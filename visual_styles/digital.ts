import p5 from "p5";
import { ArtStyle } from "../types";

export const digitalStyles: ArtStyle[] = [
  {
    id: "glitch",
    name: "Glitch (故障)",
    era: "Digital Art",
    driver: "p5",
    description: "在系统的错误和崩溃中，发现预料之外的数字美学。",
    prompt: "错误是你需要修正的瑕疵，还是天赐的灵感入口？",
    styleTags: ["Chaos", "Noise", "Geometric"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0);
      };
      p.draw = () => {
        // 偶尔重置背景，制造闪烁感
        if (p.frameCount % 40 === 0) p.background(0, 0, 0, 20);

        const x = p.random(p.width);
        const y = p.random(p.height);
        const w = p.random(50, 300);
        const h = p.random(2, 20);

        p.noStroke();

        // RGB 分离效果 (模拟色差)
        if (p.random() > 0.5) {
          p.fill(0, 100, 100, 80); // Red
          p.rect(x + 5, y, w, h);
          p.fill(180, 100, 100, 80); // Cyan
          p.rect(x - 5, y, w, h);
        }
        p.fill(0, 0, 100);
        p.rect(x, y, w, h);

        // 画面切片错位
        if (p.random() > 0.8) {
          const sliceY = p.random(p.height);
          const sliceH = p.random(10, 50);
          const offset = p.random(-20, 20);
          // p5.get() is expensive, simulate visual glitch with rects instead
          p.fill(0, 0, 0, 50);
          p.rect(0, sliceY, p.width, sliceH);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "vaporwave",
    name: "Vaporwave (蒸汽波)",
    era: "Internet Aesthetic",
    driver: "p5",
    description: "对旧日消费主义和模拟时代的迷幻怀旧，一种对未来的失落感。",
    prompt: "你怀念的是过去本身，还是那个‘从未发生过的未来’？",
    styleTags: ["Soft", "Neon", "Fluid"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        // 紫色渐变天空
        for (let i = 0; i < p.height / 2; i++) {
          const interp = p.map(i, 0, p.height / 2, 0, 1);
          p.stroke(260 + interp * 40, 80, 40 + interp * 40);
          p.line(0, i, p.width, i);
        }

        // 落日
        p.noStroke();
        // 上半部分黄色，下半部分品红
        const sunY = p.height / 2 - 50;
        for (let y = sunY - 75; y < sunY + 75; y += 5) {
          if (y % 10 < 2) continue; // scanlines
          const dist = Math.abs(y - sunY);
          if (dist > 75) continue;
          // Width of circle at this y
          const w = Math.sqrt(75 * 75 - dist * dist) * 2;
          p.fill(50 + y * 0.1, 80, 100); // Yellow/Orange
          p.rect(p.width / 2 - w / 2, y, w, 5);
        }

        // 黑色地面 + 青色网格
        p.fill(0, 0, 0);
        p.rect(0, p.height / 2, p.width, p.height / 2);

        p.stroke(160, 100, 100); // Cyan
        p.strokeWeight(1);

        // 移动的横线
        const t = (p.frameCount % 40) * 1.5;
        for (
          let y = p.height / 2;
          y < p.height;
          y += (y - p.height / 2) * 0.1 + 5
        ) {
          const py = y + t * ((y - p.height / 2) / 100);
          if (py < p.height) p.line(0, py, p.width, py);
        }
        // 纵向透视线
        for (let x = -p.width; x <= p.width * 2; x += 100) {
          p.line(
            x,
            p.height / 2,
            (x - p.width / 2) * 2 + p.width / 2,
            p.height,
          );
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "pixelation",
    era: "Digital Era",
    name: "Pixelation (像素化)",
    driver: "p5",
    description: "图像的最小原子，当放大到极致，现实便分解为抽象的方块。",
    prompt: "当现实被拆解到底层逻辑时，它变得更清晰了，还是更陌生了？",
    styleTags: ["Geometric", "Grid", "Digital"],
    sketch: (p: p5, seed: string) => {
      const cellSize = 30;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        // 不需要每帧重绘全屏，只更新部分
        const cols = Math.ceil(p.width / cellSize);
        const rows = Math.ceil(p.height / cellSize);

        for (let i = 0; i < 30; i++) {
          const cx = Math.floor(p.random(cols));
          const cy = Math.floor(p.random(rows));
          // Perlin noise for color field
          const n = p.noise(cx * 0.1, cy * 0.1, p.frameCount * 0.01);
          const hue = (n * 360 + p.frameCount * 0.5) % 360;
          p.fill(hue, 80, 90);
          p.rect(cx * cellSize, cy * cellSize, cellSize, cellSize);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "Early Computing",
    id: "ascii_art",
    name: "ASCII Art (字符艺术)",
    driver: "p5",
    description: "在受限的字符网格中，用字母和符号的密度来模拟图像的灰度。",
    prompt: "在这个高分辨率的世界里，你是否怀念低保真的想象力？",
    styleTags: ["Grid", "Digital", "Text"],
    sketch: (p: p5, seed: string) => {
      const chars = " .:-=+*#%@"; // 密度从低到高
      const fontSize = 16;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textFont("Courier New");
        p.textSize(fontSize);
        p.textAlign(p.CENTER, p.CENTER);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.frameRate(24);
      };
      p.draw = () => {
        p.background(0);
        p.fill(120, 100, 100); // Terminal Green

        const cols = Math.floor(p.width / fontSize);
        const rows = Math.floor(p.height / fontSize);
        const t = p.frameCount * 0.02;

        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            // Moving wave pattern
            const d = p.dist(i, j, cols / 2, rows / 2);
            const val = (Math.sin(d * 0.2 - t) + 1) / 2;
            const index = Math.floor(val * (chars.length - 1));
            const char = chars[index];
            if (char !== " ") {
              p.text(
                char,
                i * fontSize + fontSize / 2,
                j * fontSize + fontSize / 2,
              );
            }
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
