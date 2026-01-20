import p5 from "p5";
import { ArtStyle } from "../types";

export const painterlyStyles: ArtStyle[] = [
  {
    id: "automatism",
    name: "Automatism (自动主义)",
    era: "Surrealism",
    driver: "p5",
    description: "悬置理性控制，让潜意识引导手部运动，记录心灵的原始痕迹。",
    prompt: "如果完全放弃思考，你的手会画出什么？",
    styleTags: ["Chaos", "Fluid", "Scribble"],
    sketch: (p: p5, seed: string) => {
      let x = 0,
        y = 0;
      let tx = 0,
        ty = 0;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(40, 10, 95);
        x = p.width / 2;
        y = p.height / 2;
        tx = 0;
        ty = 1000;
      };
      p.draw = () => {
        p.stroke(0, 0, 10, 80);
        p.strokeWeight(1.5);
        p.noFill();
        // 加速绘制
        for (let i = 0; i < 50; i++) {
          const nx = (p.noise(tx) - 0.5) * 10;
          const ny = (p.noise(ty) - 0.5) * 10;
          p.line(x, y, x + nx, y + ny);
          x += nx;
          y += ny;
          tx += 0.01;
          ty += 0.01;

          if (x < 0) x = p.width;
          if (x > p.width) x = 0;
          if (y < 0) y = p.height;
          if (y > p.height) y = 0;
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(40, 10, 95);
        x = w / 2;
        y = h / 2;
      };
    },
  },
  {
    id: "impasto",
    name: "Impasto (厚涂法)",
    era: "Painting Technique",
    driver: "p5",
    description: "颜料堆叠在画布上，形成浮雕般的物理质感，笔触即是情感。",
    prompt: "你希望你的表达是平滑隐形的，还是充满颗粒与痕迹的？",
    styleTags: ["Rough", "Texture", "Chaos"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        p.background(30, 10, 90);
        for (let i = 0; i < 80; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const w = p.random(50, 200);
          const h = p.random(20, 60);
          const rot = p.random(p.TWO_PI);
          p.push();
          p.translate(x, y);
          p.rotate(rot);
          p.noStroke();
          // Shadow
          p.fill(0, 0, 0, 30);
          p.rect(2, 2, w, h);
          // Paint
          const hue = p.random(360);
          p.fill(hue, 60, 80);
          p.rect(0, 0, w, h);
          p.pop();
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    id: "pointillism",
    era: "Post-Impressionism",
    name: "Pointillism (点彩派)",
    driver: "p5",
    description: "纯色的小点在视网膜上混合，形成鲜艳而颤动的光影。",
    prompt: "如果把你的人生拆解成无数个瞬间，它们能汇聚成完整的画面吗？",
    styleTags: ["Dots", "Vibrant", "Texture"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
        p.background(255);
      };
      p.draw = () => {
        for (let i = 0; i < 50; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);

          // Create a gradient pattern
          const dist = p.dist(x, y, p.width / 2, p.height / 2);
          let col;
          if (dist < 200) {
            col = p.color(255, 0, 0, 100);
          } else {
            col = p.color(0, 0, 255, 100);
          }
          p.fill(col);
          p.circle(x, y, p.random(2, 8));
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "action_painting",
    era: "Abstract Expressionism",
    name: "Action Painting (行动绘画)",
    driver: "p5",
    description: "画布是行动的竞技场，颜料的滴洒、泼溅记录了身体的能量与爆发。",
    prompt: "你渴望精确的控制，还是渴望彻底的释放？",
    styleTags: ["Chaos", "Energy", "Texture"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(40, 10, 95);
      };
      p.draw = () => {
        // 快速且混乱的笔触
        const moves = 5;
        for (let i = 0; i < moves; i++) {
          const x1 = p.random(p.width);
          const y1 = p.random(p.height);
          const x2 = x1 + p.random(-200, 200);
          const y2 = y1 + p.random(-200, 200);

          p.strokeWeight(p.random(1, 10));
          p.stroke(0, 0, 10, p.random(50, 100)); // Black ink
          if (p.random() > 0.8) {
            p.stroke(0, 80, 80, 80); // Occasional Color
          }

          // Dripping effect
          p.line(x1, y1, x2, y2);

          // Splatter
          if (p.random() > 0.5) {
            p.noStroke();
            p.fill(0, 0, 10, 80);
            const r = p.random(2, 10);
            p.circle(x2, y2, r);
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(40, 10, 95);
      };
    },
  },
];
