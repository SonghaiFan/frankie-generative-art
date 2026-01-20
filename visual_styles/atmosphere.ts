import p5 from "p5";
import { ArtStyle } from "../types";

export const atmosphereStyles: ArtStyle[] = [
  {
    id: "sfumato",
    name: "Sfumato (晕涂法)",
    era: "Renaissance",
    driver: "p5",
    description: "色彩与轮廓像烟雾一样消融，以此唤起一种朦胧的诗意。",
    prompt: "在你的创作中，你是倾向于清晰的界限，还是迷恋模糊的暧昧？",
    styleTags: ["Soft", "Fluid", "Mystery"],
    sketch: (p: p5, seed: string) => {
      let t = 0;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        t += 0.005;
        // 不完全清空背景，保留历史痕迹
        p.background(30, 10, 20, 5);

        for (let i = 0; i < 4; i++) {
          const x = p.noise(t + i * 10) * p.width;
          const y = p.noise(t + i * 20 + 100) * p.height;
          const size = 100 + p.noise(t + i * 30) * 300;
          const hue = 20 + p.noise(t + i) * 30; // 橙红到黄
          p.fill(hue, 60, 60, 5); // 非常淡
          p.circle(x, y, size);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "sublime",
    name: "Sublime (崇高)",
    era: "Romanticism",
    driver: "p5",
    description: "那种巨大到令人感到恐惧、渺小，却又产生敬畏的壮丽感。",
    prompt: "美必须是令人愉悦的吗？还是它可以是令人战栗的？",
    styleTags: ["Dark", "Stormy", "Fluid"],
    sketch: (p: p5, seed: string) => {
      let t = 0;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
        t = p.random(1000);
      };
      p.draw = () => {
        t += 0.003;
        p.background(220, 30, 5);
        const horizonY = p.height * 0.85;
        const step = 8;

        // 绘制天空
        for (let y = 0; y < horizonY; y += step) {
          const n = p.noise(p.width * 0.005 + t, y * 0.01 + t);
          // 风暴云层
          const alpha = p.map(n, 0, 1, 0, 80);
          const hue = p.map(y, 0, horizonY, 200, 240);
          p.fill(hue, 40, 30, alpha);
          p.rect(0, y, p.width, step);
        }
        // 绘制渺小的大地
        p.fill(0, 0, 0);
        p.beginShape();
        p.vertex(0, p.height);
        for (let x = 0; x <= p.width; x += 20) {
          p.vertex(x, horizonY - 10 + p.noise(x * 0.01) * 20);
        }
        p.vertex(p.width, p.height);
        p.endShape(p.CLOSE);
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(220, 30, 5);
      };
    },
  },
];
