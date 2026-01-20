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
    id: "fauvism",
    name: "Fauvism (野兽派)",
    era: "Modernism",
    driver: "p5",
    description: "通过狂野、随性且高纯度的色彩，表达最直接的情感冲动。",
    prompt: "如果树是红色的，天空是绿色的，世界会更疯狂还是更快乐？",
    styleTags: ["Vibrant", "Organic", "Bold"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        p.background(45, 20, 95); // Warm background
        p.noStroke();

        // Random organic shapes with wild brush strokes
        for (let i = 0; i < 150; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const w = p.random(20, 100);
          const h = p.random(20, 60);

          // Wild colors: High Saturation
          const hue = p.random([0, 30, 100, 200, 280, 330]);
          p.fill(hue, p.random(70, 100), p.random(80, 100), 80);

          p.push();
          p.translate(x, y);
          p.rotate(p.random(p.TWO_PI));
          // Crude brush stroke
          p.beginShape();
          p.vertex(-w / 2, -h / 4);
          p.vertex(w / 2, -h / 2);
          p.vertex(w / 2 + p.random(-10, 10), h / 2);
          p.vertex(-w / 2 + p.random(-10, 10), h / 2);
          p.endShape(p.CLOSE);
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
      let splatters: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(40, 10, 90);
      };
      p.draw = () => {
        if (p.random() > 0.9) {
          splatters.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-10, 10),
            vy: p.random(-10, 10),
            size: p.random(10, 30),
            hue: p.random(360),
            life: 20,
          });
        }

        splatters.forEach((s, i) => {
          if (s.life > 0) {
            p.noStroke();
            p.fill(s.hue, 80, 80);
            p.circle(s.x, s.y, s.size);

            s.x += s.vx;
            s.y += s.vy;
            s.size *= 0.9;
            s.life--;

            // Stringy paint look
            if (s.life < 18) {
              p.stroke(s.hue, 80, 80);
              p.strokeWeight(s.size);
              p.line(s.x, s.y, s.x - s.vx, s.y - s.vy);
            }
          } else {
            splatters.splice(i, 1);
          }
        });
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(40, 10, 90);
      };
    },
  },
];
