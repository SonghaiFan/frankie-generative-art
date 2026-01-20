import p5 from "p5";
import { ArtStyle } from "../types";

export const popStyles: ArtStyle[] = [
  {
    id: "camp",
    name: "Camp (坎普)",
    era: "Modern Culture",
    driver: "p5",
    description: "通过夸张、反讽和戏剧化，将平庸转化为一种独特的风格。",
    prompt: "你是否愿意为了‘有趣’而牺牲‘严肃’？",
    styleTags: ["Chaos", "Vibrant", "Artificial"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        // 荧光粉背景拖尾
        p.background(320, 50, 90, 20);

        const t = p.frameCount * 0.05;
        const x = p.width / 2 + Math.sin(t) * 150;
        const y = p.height / 2 + Math.cos(t * 1.5) * 150;

        // 闪烁的星形
        p.push();
        p.translate(x, y);
        p.rotate(t);
        p.noStroke();
        // 变换的彩虹色
        p.fill(p.frameCount % 360, 100, 100);

        p.beginShape();
        for (let i = 0; i < 5; i++) {
          const angle = (p.TWO_PI / 5) * i;
          const r = 50;
          p.vertex(Math.cos(angle) * r, Math.sin(angle) * r);
          const angle2 = angle + p.TWO_PI / 10;
          const r2 = 20;
          p.vertex(Math.cos(angle2) * r2, Math.sin(angle2) * r2);
        }
        p.endShape(p.CLOSE);
        p.pop();

        // 随机彩屑
        if (p.random() > 0.5) {
          p.fill(p.random(360), 100, 100);
          p.rect(p.random(p.width), p.random(p.height), 10, 10);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "appropriation",
    name: "Appropriation (挪用)",
    era: "Postmodernism",
    driver: "p5",
    description: "借用已有的图像或物品，通过新的语境赋予其新的含义。",
    prompt: "原创是一种执念吗？如果在旧物上能开出新花，为何不可？",
    styleTags: ["Collage", "Layered", "Geometric"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        const w = p.width / 2;
        const h = p.height / 2;
        const colors = [
          [320, 90, 90],
          [190, 90, 90],
          [50, 90, 100],
          [100, 80, 80],
        ];

        // 绘制四个面板
        [0, 1, 2, 3].forEach((i) => {
          const cx = (i % 2) * w;
          const cy = Math.floor(i / 2) * h;
          p.fill(colors[i][0], colors[i][1], colors[i][2]);
          p.rect(cx, cy, w, h);

          // Draw "Marilyn" lips or object
          p.fill(0, 0, 100);
          p.ellipse(cx + w / 2, cy + h / 2, 100, 50);
          p.fill(0, 100, 100);
          p.ellipse(cx + w / 2, cy + h / 2, 100, 20); // Lips
        });
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "fluxus",
    era: "1960s",
    name: "Fluxus (激浪派)",
    driver: "p5",
    description: "艺术是生活的过程，是流动的事件，而非博物馆里的僵死之物。",
    prompt: "此时此刻你的呼吸，算不算一件艺术品？",
    styleTags: ["Fluid", "Chaos", "Simple"],
    sketch: (p: p5, seed: string) => {
      const words = ["BREATHE", "WALK", "LISTEN", "DROP", "NOTHING", "REPEAT"];
      let currentWord = "FLUX";
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.textSize(40);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont("Courier New"); // 打印机字体
      };
      p.draw = () => {
        p.background(0, 0, 100, 10); // 缓慢淡出

        if (p.frameCount % 120 === 0) {
          currentWord = p.random(words);
        }

        p.fill(0);
        p.text(currentWord, p.width / 2, p.height / 2);

        // 偶尔画一条无意义的线
        if (p.random() > 0.98) {
          p.stroke(0);
          p.line(
            p.random(p.width),
            p.random(p.height),
            p.random(p.width),
            p.random(p.height),
          );
          p.noStroke();
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
