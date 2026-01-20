import p5 from "p5";
import { ArtStyle } from "../types";

export const minimalismStyles: ArtStyle[] = [
  {
    id: "ma",
    name: "Ma (间)",
    era: "Japanese Aesthetics",
    driver: "p5",
    description: "物体之间的空白不是无，而是充满了可能性的‘间隙’。",
    prompt: "在你的作品或生活中，你敢于留下多少不被填满的空白？",
    styleTags: ["Minimal", "Space", "Structure"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(0, 0, 96); // 纸一样的白色
        p.noStroke();

        // 右下角一个缓慢变化的圆，代表存在的微弱
        const t = p.frameCount * 0.02;
        const size = 60 + Math.sin(t) * 10;
        const alpha = 50 + Math.sin(t) * 40;

        p.fill(0, 0, 20, alpha); // 深灰墨色
        p.circle(p.width * 0.75, p.height * 0.75, size);

        // 一条极细的线分割空间
        p.stroke(0, 0, 80);
        p.strokeWeight(0.5);
        p.line(p.width * 0.3, p.height * 0.1, p.width * 0.3, p.height * 0.9);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "wabi_sabi",
    name: "Wabi-Sabi (侘寂)",
    era: "Traditional Japan",
    driver: "p5",
    description: "接受短暂、残缺和不完美，在枯萎的时间痕迹中发现美。",
    prompt: "你是否认为只有完整无缺的东西才配称之为完美？",
    styleTags: ["Rough", "Organic", "Decay"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.frameRate(12); // 低帧率
      };
      p.draw = () => {
        p.background(35, 10, 85, 30); // 泛黄的纸张感
        p.noFill();

        // 枯墨般的笔触
        p.stroke(30, 20, 20, 60);
        p.strokeWeight(2);

        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += 0.1) {
          const r = 150 + p.noise(a * 5, p.frameCount * 0.1) * 30;
          const x = p.width / 2 + Math.cos(a) * r;
          const y = p.height / 2 + Math.sin(a) * r;
          p.vertex(x, y);
        }
        p.endShape();

        // 噪点纹理
        for (let i = 0; i < 100; i++) {
          p.stroke(0, 0, 20, 10);
          p.point(p.random(p.width), p.random(p.height));
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "negative_space",
    era: "Visual Composition",
    name: "Negative Space (负空间)",
    driver: "p5",
    description: "环绕在主体周围的空间，它定义了主体，却往往被忽视。",
    prompt: "你关注的是‘有’，还是定义了‘有’的‘无’？",
    styleTags: ["Space", "Contrast", "Geometric"],
    sketch: (p: p5, seed: string) => {
      let particles: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        for (let i = 0; i < 150; i++)
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-1, 1),
            vy: p.random(-1, 1),
          });
      };
      p.draw = () => {
        p.background(220, 60, 30); // 深蓝背景
        p.noStroke();
        p.fill(220, 10, 95); // 亮白粒子

        const cx = p.width / 2;
        const cy = p.height / 2;

        particles.forEach((pt) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0 || pt.x > p.width) pt.vx *= -1;
          if (pt.y < 0 || pt.y > p.height) pt.vy *= -1;

          const d = p.dist(pt.x, pt.y, cx, cy);
          // 排斥中心
          if (d < 200) {
            const a = Math.atan2(pt.y - cy, pt.x - cx);
            pt.x = cx + Math.cos(a) * 200;
            pt.y = cy + Math.sin(a) * 200;
          }
          p.circle(pt.x, pt.y, 5);
        });
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "1960s California",
    id: "light_and_space",
    name: "Light and Space (光与空间)",
    driver: "p5",
    description:
      "关注光线本身的物质性，消除物体的边界，创造一种沉浸的感知体验。",
    prompt: "当物质消失，只剩下光，你看到了什么？",
    styleTags: ["Light", "Gradient", "Ethereal"],
    sketch: (p: p5, seed: string) => {
      // Light and Space (光与空间) - James Turrell style "Skyspace" or "Ganzfeld"
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        // 1. Base Environment: Deep Blue Monochromatic Room
        const baseHue = 220;
        const t = p.frameCount * 0.01;

        // Gradient Background (Floor to Ceiling) to give slight perspective cue
        for (let y = 0; y <= p.height; y += 5) {
          const interp = p.map(y, 0, p.height, 0, 1);
          const s = 95 - interp * 20; // Saturation gradient
          const b = 20 + interp * 10; // Brightness gradient
          p.fill(baseHue, s, b);
          p.rect(0, y, p.width, 6);
        }

        // 2. The Apertures (The "Windows" of pure light)
        const apertureW = p.width * 0.25;
        const apertureH = p.height * 0.6;
        const gap = p.width * 0.1;
        const yPos = (p.height - apertureH) / 2;
        const leftX = (p.width - (apertureW * 2 + gap)) / 2;
        const rightX = leftX + apertureW + gap;

        // Light Color: Cyan/Light Blue, much brighter
        const lightHue = 210;

        // Glow
        const glowLayers = 40;
        for (let i = glowLayers; i > 0; i--) {
          const alpha = (1 - i / glowLayers) * 5;
          const size = i * 2;
          p.fill(lightHue, 60, 95, alpha);
          p.rect(
            leftX - size,
            yPos - size,
            apertureW + size * 2,
            apertureH + size * 2,
          );
          p.rect(
            rightX - size,
            yPos - size,
            apertureW + size * 2,
            apertureH + size * 2,
          );
        }

        // 3. The Aperture Surfaces (Flat, loss of depth)
        p.fill(lightHue, 60, 95);
        p.rect(leftX, yPos, apertureW, apertureH);
        p.rect(rightX, yPos, apertureW, apertureH);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
