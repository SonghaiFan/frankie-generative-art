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
            p.rect(i * w + 10, j * h + 10, w - 20, h - 20);
            // 像瓶架一样冷漠的重复
            p.line(i * w + 10, j * h + 10, i * w + w - 10, j * h + h - 10);
          }
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
        p.background(0, 0, 92);
        // 绘制网格背景
        p.stroke(0, 0, 80);
        p.strokeWeight(1);
        for (let i = 0; i < p.width; i += 50) p.line(i, 0, i, p.height);
        for (let j = 0; j < p.height; j += 50) p.line(0, j, p.width, j);

        const t = p.frameCount * 0.01;
        p.noStroke();

        // 黑色横杠
        p.fill(0, 0, 10);
        p.rect(p.width / 2, p.height / 2, p.width * 0.8, 10);

        // 红色正方形
        p.push();
        p.translate(p.width * 0.3, p.height * 0.5 + Math.sin(t) * 20);
        p.fill(350, 90, 90, 90);
        p.rect(0, 0, 100, 100);
        p.pop();

        // 蓝色圆形
        p.push();
        p.translate(p.width * 0.7, p.height * 0.5 + Math.cos(t) * 20);
        p.fill(220, 90, 90, 90);
        p.circle(0, 0, 100);
        p.pop();

        // 黄色三角形
        p.push();
        p.translate(p.width * 0.5, p.height * 0.5 - 100);
        p.rotate(t * 0.5);
        p.fill(50, 100, 100, 90);
        p.triangle(0, -60, -60, 60, 60, 60);
        p.pop();
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
        p.stroke(255);
        p.noFill();
      };
      p.draw = () => {
        p.background(0);
        const t = p.frameCount * 0.05;
        for (let i = 0; i < p.width; i += 20) {
          const offset = Math.sin(i * 0.05 + t) * 50;
          p.strokeWeight(2);
          p.line(i, 0, i + offset, p.height);
        }
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
    era: "Modern Culture",
    id: "kinetic_art",
    name: "Kinetic Art (动态艺术)",
    driver: "p5",
    description:
      "艺术品不再静止，而是依靠风、马达或观众的互动产生真实的物理运动。",
    prompt: "平衡是一种静态的结果，还是一种动态的过程？",
    styleTags: ["Movement", "Balance", "Physics"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.stroke(255);
      };
      p.draw = () => {
        p.background(0, 20);
        p.translate(p.width / 2, p.height / 2);

        for (let i = 0; i < 12; i++) {
          p.push();
          p.rotate(p.frameCount * 0.02 + i * (p.TWO_PI / 12));
          p.line(0, 0, 200, 0);
          p.circle(200, 0, 5);
          p.pop();
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
    era: "Middle Ages",
  },
  {
    id: "gothic",
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
