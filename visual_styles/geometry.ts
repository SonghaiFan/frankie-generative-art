import p5 from "p5";
import { ArtStyle } from "../types";

export const geometryStyles: ArtStyle[] = [
  {
    id: "ready_made",
    name: "Ready-made (现成品)",
    era: "Dadaism",
    driver: "p5",
    description: "艺术不在于制作，而在于选择和重新定义语境。",
    prompt: "如果剥离了手工劳作，你的创造力还剩下什么？",
    styleTags: ["Geometric", "Industrial", "Cold"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(200, 5, 80); // 工业蓝灰
        p.noFill();
        p.stroke(0, 0, 20);
        p.strokeWeight(1.5);

        const cols = 6;
        const rows = 8;
        const w = p.width / cols;
        const h = p.height / rows;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            p.push();
            p.translate(i * w + w / 2, j * h + h / 2);
            // 每一个都在旋转，像流水线
            p.rotate(p.frameCount * 0.02 + (i + j) * 0.5);
            p.rectMode(p.CENTER);
            p.rect(0, 0, w * 0.5, w * 0.5); // 简单的方框
            p.line(0, -w * 0.25, 0, w * 0.25);
            p.pop();
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "art_deco",
    name: "Art Deco (装饰艺术)",
    era: "1920s-1930s",
    driver: "p5",
    description:
      "几何与奢华结合成流线型的阶梯与放射纹理，金属光泽在深色背景上精确发光。",
    prompt: "当功能已经足够，你还会为纯粹的优雅留下多少空间？",
    styleTags: ["Geometric", "Symmetry", "Gold"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noFill();
        p.stroke(212, 175, 55);
        p.strokeWeight(2);
      };
      p.draw = () => {
        p.background(20);
        let cx = p.width / 2;
        let cy = p.height;
        for (let i = 0; i < 20; i++) {
          let r = i * 40 + (p.frameCount % 40);
          p.arc(cx, cy, r * 2, r * 2, p.PI, 0);
        }
        // Rays
        for (let a = p.PI; a <= p.TWO_PI; a += p.PI / 12) {
          p.line(
            cx,
            cy,
            cx + Math.cos(a) * p.width,
            cy + Math.sin(a) * p.width,
          );
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "bauhaus",
    name: "Bauhaus (包豪斯)",
    era: "Modernism",
    driver: "p5",
    description: "形式追随功能，在工业生产中寻找理性的几何之美。",
    prompt: "在你的世界里，多余的装饰是必要的浪漫，还是需要切除的累赘？",
    styleTags: ["Geometric", "Structure", "Clean"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.rectMode(p.CENTER);
      };
      p.draw = () => {
        p.background(40, 5, 95); // Off-white paper

        const t = p.frameCount * 0.01;
        p.translate(p.width / 2, p.height / 2);

        // Kandinsky-style composition: Floating, diagonal, overlapping

        // 1. Diagnosis lines (The "Structure")
        p.stroke(0, 0, 10);
        p.strokeWeight(1.5);
        p.line(-p.width / 2, p.height / 2, p.width / 2, -p.height / 4);
        p.line(-p.width / 3, -p.height / 2, p.width / 4, p.height / 2);

        p.noStroke();

        // 2. The Yellow Triangle (Sharp, energetic)
        p.push();
        p.translate(Math.cos(t) * 100, Math.sin(t * 1.3) * 50 - 100);
        p.rotate(t + p.PI / 6);
        p.fill(50, 90, 100, 85); // Yellow
        // Sharp triangle
        p.triangle(0, -80, -50, 50, 50, 50);
        p.pop();

        // 3. The Red Square (Stable, heavy)
        p.push();
        p.translate(-150 + Math.sin(t * 0.5) * 30, 50);
        p.rotate(0.2); // Slight tilt
        p.fill(350, 80, 85, 85); // Red
        p.rect(0, 0, 120, 120);
        p.pop();

        // 4. The Blue Circle (Deep, recedes)
        p.push();
        p.translate(150, 100 + Math.cos(t * 0.8) * 40);
        p.fill(220, 80, 90, 85); // Blue
        p.circle(0, 0, 140);
        p.pop();

        // 5. Black accents (Points and lines)
        p.fill(0, 0, 10);
        p.circle(-50, -50, 10);
        p.circle(60, 80, 5);
        p.rect(0, 200, 300, 5); // Bottom heavy line
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "brutalism",
    era: "Architecture",
    name: "Brutalism (粗野主义)",
    driver: "p5",
    description: "诚实地裸露材料（如混凝土）的粗糙本质，拒绝任何掩饰。",
    prompt: "赤裸的真实虽然粗糙，是否比精致的谎言更动人？",
    styleTags: ["Geometric", "Heavy", "Structure"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(0, 0, 90);
        p.noStroke();

        // 简单的灰度色块，模拟混凝土建筑
        const t = p.frameCount * 0.01;

        p.fill(0, 0, 40); // 深灰
        p.rect(p.width * 0.2, p.height * 0.2, p.width * 0.1, p.height * 0.6);

        p.fill(0, 0, 60); // 中灰

        // 悬臂结构
        const overhang = Math.sin(t) * 20;
        p.rect(
          p.width * 0.15,
          p.height * 0.3 + overhang,
          p.width * 0.4,
          p.height * 0.1,
        );

        p.fill(0, 0, 30); // 更深
        p.rect(p.width * 0.6, p.height * 0.4, p.width * 0.2, p.height * 0.4);

        // 粗糙的纹理线
        p.stroke(0, 0, 20, 20);
        p.strokeWeight(1);
        for (let i = 0; i < p.width; i += 10) {
          if (p.random() > 0.5) p.line(i, 0, i, p.height);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "gestalt",
    era: "Psychology/Design",
    name: "Gestalt (完形)",
    driver: "p5",
    description: "整体大于部分之和，大脑自动将碎片补全为有意义的形状。",
    prompt: "你习惯关注细节的碎片，还是整体的轮廓？",
    styleTags: ["Structure", "Geometric", "Connected"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(0, 0, 10);
        p.fill(0, 0, 100);
        p.noStroke();

        // 每2秒对齐一次
        const phase = (Math.sin(p.frameCount * 0.03) + 1) / 2; // 0 -> 1 -> 0
        const isAligned = phase > 0.8;

        for (let i = 0; i < 16; i++) {
          // 4x4 Grid
          const row = Math.floor(i / 4);
          const col = i % 4;
          const tx = p.width / 2 - 150 + col * 100;
          const ty = p.height / 2 - 150 + row * 100;

          // Random offset
          const offX = Math.sin(p.frameCount * 0.1 + i) * 50;
          const offY = Math.cos(p.frameCount * 0.1 + i) * 50;

          // Lerp to target
          const x = p.lerp(tx + offX, tx, phase);
          const y = p.lerp(ty + offY, ty, phase);

          // Draw "Pacman" or simple shape
          p.circle(x, y, 60);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "1960s",
    id: "op_art",
    name: "Op Art (欧普艺术)",
    driver: "p5",
    description: "利用几何图形的排列，欺骗眼睛，制造颤动、膨胀的视觉错觉。",
    prompt: "你所感知的现实，有多少是大脑对你的欺骗？",
    styleTags: ["Geometric", "Illusion", "Contrast"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        p.rectMode(p.CENTER);
      };
      p.draw = () => {
        p.background(0);
        p.noFill();
        const t = p.frameCount * 0.02;

        p.translate(p.width / 2, p.height / 2);

        // Layer 1: Concentric squares rotating
        p.stroke(255);
        p.strokeWeight(2);
        p.push();
        p.rotate(t * 0.5);
        for (let i = 0; i < 30; i++) {
          let s = i * 20 + 20;
          // Wavy distortion
          let dist = Math.sin(t * 2 + i * 0.2) * 5;
          p.rect(0, 0, s + dist, s + dist);
        }
        p.pop();

        // Layer 2: Interference lines
        p.stroke(255, 150); // Semi-transparent for blending
        p.push();
        p.rotate(-t * 0.3);
        const maxDim = Math.max(p.width, p.height) * 1.5;
        for (let x = -maxDim / 2; x < maxDim / 2; x += 15) {
          p.line(x, -maxDim / 2, x, maxDim / 2);
        }
        p.pop();

        // Layer 3: Pulsing focus circle
        p.stroke(255);
        p.strokeWeight(3);
        let pulse = 20 * Math.sin(t * 5);
        p.circle(0, 0, 100 + pulse);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "de_stijl",
    name: "De Stijl (风格派)",
    era: "Modernism",
    driver: "p5",
    description: "剥离一切具象，只保留水平线、垂直线和三原色，追求普遍的和谐。",
    prompt: "如果世界只剩下最基本的结构和色彩，它会变得枯燥还是纯粹？",
    styleTags: ["Geometric", "Primary", "Grid"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.strokeWeight(10);
        p.stroke(0);
      };
      p.draw = () => {
        p.background(255);
        let x = p.width * (0.5 + Math.sin(p.frameCount * 0.01) * 0.2);
        let y = p.height * (0.5 + Math.cos(p.frameCount * 0.01) * 0.2);
        p.fill(255, 0, 0);
        p.rect(0, 0, x, y);
        p.fill(0, 0, 255);
        p.rect(x, y, p.width, p.height);
        p.fill(255, 255, 0);
        p.rect(x, 0, p.width, y * 0.5);
        // Lines
        p.line(x, 0, x, p.height);
        p.line(0, y, p.width, y);
        p.line(x, y * 0.5, p.width, y * 0.5);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "Early 20th Century",
    id: "cubism",
    name: "Cubism (立体主义)",
    driver: "p5",
    description: "打碎单一视角，将物体分解为碎片，在平面上同时展示多个侧面。",
    prompt: "你能在同一时刻理解事物的不同面向吗？",
    styleTags: ["Geometric", "Fragmented", "Layered"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.rectMode(p.CENTER);
        p.background(30, 10, 85); // 初始画布底色
      };
      p.draw = () => {
        // 每一帧并不清空，而是缓慢叠加，形成复杂的肌理
        if (p.frameCount % 200 === 0) p.background(30, 10, 85);

        p.noStroke();
        const x = p.random(p.width);
        const y = p.random(p.height);
        const size = p.random(50, 250);

        // 毕加索/布拉克时期的配色：赭石、灰、黑、浊蓝、深红
        const colors = [
          [35, 40, 70],
          [210, 20, 50],
          [0, 0, 20],
          [0, 0, 95],
          [10, 40, 50],
        ];
        const col = p.random(colors);
        p.fill(col[0], col[1], col[2], 70); // 半透明

        p.push();
        p.translate(x, y);
        p.rotate(p.random(p.TWO_PI)); // 旋转视角

        p.rect(0, 0, size, size * p.random(0.5, 1.5));

        // 结构线
        p.stroke(0, 0, 10, 60);
        p.strokeWeight(1.5);
        if (p.random() > 0.5) p.line(-size, 0, size, 0);

        p.pop();
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(30, 10, 85);
      };
    },
  },
  {
    id: "precisionism",
    name: "Precisionism (精确主义)",
    era: "Early American Modernism",
    driver: "p5",
    description:
      "工业建筑被削减为冷静而锋利的体块，光线像刀锋一样切割出宁静的秩序。",
    prompt: "当城市只剩下几何和光影，你还能感到情绪吗？",
    styleTags: ["Industrial", "Sharp", "Geometric"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
        p.rectMode(p.CORNER);
      };
      p.draw = () => {
        // 冷淡的蓝灰天空
        for (let y = 0; y < p.height; y++) {
          const t = p.map(y, 0, p.height, 0, 1);
          const hue = p.lerp(210, 200, t);
          const bri = p.lerp(90, 70, t);
          p.stroke(hue, 10, bri);
          p.line(0, y, p.width, y);
        }

        const groundY = p.height * 0.7;
        p.noStroke();
        p.fill(210, 15, 40);
        p.rect(0, groundY, p.width, p.height - groundY);

        // 主体建筑体块
        const blocks = [
          { x: p.width * 0.15, w: p.width * 0.18, h: p.height * 0.45 },
          { x: p.width * 0.38, w: p.width * 0.16, h: p.height * 0.55 },
          { x: p.width * 0.58, w: p.width * 0.22, h: p.height * 0.4 },
        ];

        blocks.forEach((b, i) => {
          const baseHue = 210;
          const baseSat = 10 + i * 5;

          // 正面
          p.fill(baseHue, baseSat, 80);
          p.rect(b.x, groundY - b.h, b.w, b.h);

          // 侧面阴影
          p.fill(baseHue, baseSat + 10, 55);
          const sideW = b.w * 0.45;
          p.quad(
            b.x + b.w,
            groundY - b.h,
            b.x + b.w + sideW,
            groundY - b.h - sideW * 0.35,
            b.x + b.w + sideW,
            groundY - sideW * 0.35,
            b.x + b.w,
            groundY,
          );

          // 顶部受光面
          p.fill(baseHue, baseSat, 95);
          p.quad(
            b.x,
            groundY - b.h,
            b.x + b.w,
            groundY - b.h,
            b.x + b.w + sideW,
            groundY - b.h - sideW * 0.35,
            b.x + sideW,
            groundY - b.h - sideW * 0.35,
          );
        });

        // 远处简化的烟囱和筒仓
        p.fill(210, 5, 60);
        p.rect(
          p.width * 0.78,
          groundY - p.height * 0.32,
          p.width * 0.04,
          p.height * 0.32,
        );
        p.rect(
          p.width * 0.9,
          groundY - p.height * 0.22,
          p.width * 0.05,
          p.height * 0.22,
        );

        // 投射出的长阴影
        p.fill(210, 20, 25, 90);
        p.beginShape();
        p.vertex(p.width * 0.2, groundY);
        p.vertex(p.width * 0.9, groundY);
        p.vertex(p.width * 1.1, p.height);
        p.vertex(p.width * 0.1, p.height);
        p.endShape(p.CLOSE);
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    era: "Modern Culture",
    id: "kinetic_art",
    name: "Kinetic Art (动态艺术)",
    driver: "p5",
    description:
      "艺术品不再静止，而是依靠风、马达或观众的互动产生真实的物理运动。",
    prompt: "平衡是一种静态的结果，还是一种动态的过程？",
    styleTags: ["Movement", "Balance", "Physics"],
    sketch: (p: p5, seed: string) => {
      // Alexander Calder inspired Mobile
      let parts: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // p.colorMode(p.HSB, 360, 100, 100);
      };

      const drawBranch = (length: number, depth: number, phase: number) => {
        if (depth <= 0) {
          // Draw leaf/paddle
          p.noStroke();
          // Primary colors + Black
          const colors = ["#E53935", "#FDD835", "#1E88E5", "#212121"];
          const col =
            colors[Math.floor(Math.abs(Math.sin(phase * 123)) * colors.length)];
          p.fill(col);

          const shapeType = Math.sin(phase) > 0 ? "circle" : "leaf";
          if (shapeType === "circle") p.circle(0, 0, length * 0.8);
          else {
            p.beginShape();
            p.vertex(0, 0);
            p.vertex(length / 2, length / 2);
            p.vertex(length, 0);
            p.vertex(length / 2, -length / 2);
            p.endShape(p.CLOSE);
          }
          return;
        }

        p.stroke(0);
        p.strokeWeight(1.5);

        let angle = Math.sin(p.frameCount * 0.01 * (5 - depth) + phase) * 0.5;
        p.push();
        p.rotate(angle);
        p.line(0, 0, length, 0); // Right arm
        p.line(0, 0, -length * 0.6, 0); // Left arm shorter

        // Right recursive
        p.push();
        p.translate(length, 0);
        drawBranch(length * 0.7, depth - 1, phase + 100);
        p.pop();

        // Left recursive
        p.push();
        p.translate(-length * 0.6, 0);
        drawBranch(length * 0.7, depth - 1, phase + 200);
        p.pop();

        p.pop();
      };

      p.draw = () => {
        p.background(240); // Paper white
        p.translate(p.width / 2, p.height * 0.3);

        // Main string
        p.stroke(0);
        p.line(0, -200, 0, 0);

        drawBranch(120, 4, 0);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "gothic",
    era: "Middle Ages",
    name: "Gothic (哥特式)",
    driver: "p5",
    description: "尖拱、彩色玻璃和垂直线条，渴望摆脱重力，向上触摸神性。",
    prompt: "什么东西能让你的灵魂感到升华？",
    styleTags: ["Structure", "Vertical", "Light"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100);
      };
      p.draw = () => {
        p.background(0, 0, 10);
        p.noFill();
        p.stroke(40, 60, 100, 50); // Goldish light

        const t = p.frameCount * 0.01;
        const w = 100;

        for (let i = 0; i < p.width + w; i += w) {
          // Arches
          p.beginShape();
          p.vertex(i - w / 2, p.height);
          p.vertex(i - w / 2, p.height / 2);
          p.bezierVertex(i - w / 2, p.height / 4, i, 0, i, 0);
          p.bezierVertex(
            i,
            0,
            i + w / 2,
            p.height / 4,
            i + w / 2,
            p.height / 2,
          );
          p.vertex(i + w / 2, p.height);
          p.endShape();
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
