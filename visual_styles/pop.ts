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
      // Andy Warhol Silk Screen Effect
      // Draw the same "icon" multiple times with offset colors

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };

      const drawIcon = (
        x: number,
        y: number,
        w: number,
        h: number,
        colors: number[][],
      ) => {
        // Background
        p.fill(colors[0][0], colors[0][1], colors[0][2]);
        p.rect(x, y, w, h);

        p.push();
        p.translate(x + w / 2, y + h / 2);

        // "Face" or "Object" silhouette
        // Hair/Back
        p.fill(colors[1][0], colors[1][1], colors[1][2]);
        p.arc(0, -h * 0.1, w * 0.7, h * 0.7, p.PI, 0);
        p.rect(-w * 0.35, -h * 0.1, w * 0.7, h * 0.5);

        // Face Skin
        p.fill(colors[2][0], colors[2][1], colors[2][2]); // Skin tone usually pinkish
        p.ellipse(0, h * 0.1, w * 0.5, h * 0.6);

        // Eyes/Lips Overlay (High contrast)
        p.fill(colors[3][0], colors[3][1], colors[3][2]);
        p.ellipse(-w * 0.1, h * 0.05, w * 0.12, h * 0.05); // Eye L
        p.ellipse(w * 0.1, h * 0.05, w * 0.12, h * 0.05); // Eye R
        p.ellipse(0, h * 0.25, w * 0.2, h * 0.05); // Mouth
        p.pop();
      };

      p.draw = () => {
        const cols = 2;
        const rows = 2;
        const cellW = p.width / cols;
        const cellH = p.height / rows;

        // Random palettes for each cell, changing slowly
        if (p.frameCount % 60 === 0 || p.frameCount === 1) {
          // p.background(0);
        }

        let seedVal = Math.floor(p.frameCount / 120);
        p.randomSeed(seedVal);

        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            // Generate wild pop palette
            const c1 = [p.random(360), p.random(60, 100), p.random(80, 100)]; // BG
            const c2 = [p.random(360), p.random(60, 100), p.random(30, 80)]; // Hair
            const c3 = [p.random(330, 30), p.random(20, 60), 95]; // Skin (Pinkish range)
            const c4 = [p.random(360), 100, 60]; // Features

            drawIcon(i * cellW, j * cellH, cellW, cellH, [c1, c2, c3, c4]);
          }
        }
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
  {
    id: "graffiti",
    name: "Graffiti (街头涂鸦)",
    era: "Street Art",
    driver: "p5",
    description: "在城市的混凝土表面上，用喷漆和标签争夺一块暂时的存在空间。",
    prompt: "如果只能在一面墙上留下一个词，你会写什么？",
    styleTags: ["Urban", "Tag", "Spray"],
    sketch: (p: p5, seed: string) => {
      // Improved Graffiti: Wildstyle + Drips + Texture
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };

      const sprayLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: any,
        weight: number,
      ) => {
        // Simulate spray can stroke
        const d = p.dist(x1, y1, x2, y2);
        const steps = d;
        for (let i = 0; i < steps; i += 2) {
          const t = i / steps;
          const x = p.lerp(x1, x2, t);
          const y = p.lerp(y1, y2, t);

          // Scatter
          p.noStroke();
          p.fill(color);
          for (let j = 0; j < 10; j++) {
            const r = p.random(weight);
            const angle = p.random(p.TWO_PI);
            const sx = x + Math.cos(angle) * r;
            const sy = y + Math.sin(angle) * r;
            p.circle(sx, sy, p.random(1, 3));
          }
        }
      };

      const drawTag = (cx: number, cy: number, str: string, color: any) => {
        p.stroke(color);
        p.strokeWeight(15);
        p.strokeJoin(p.ROUND);
        p.noFill();
        // Abstracted wildstyle letters (just curves imitating text)
        p.beginShape();
        for (let i = 0; i < 6; i++) {
          p.curveVertex(cx + p.random(-150, 150), cy + p.random(-50, 50));
        }
        p.endShape();
        // Drips
        for (let i = 0; i < 5; i++) {
          let dripX = cx + p.random(-100, 100);
          let dripY = cy + p.random(20, 50);
          let len = p.random(20, 150);
          p.strokeWeight(p.random(3, 8));
          p.line(dripX, dripY, dripX, dripY + len + p.random(5, 5));
          p.circle(dripX, dripY + len, 5);
        }
      };

      p.draw = () => {
        // 1. Concrete Wall Texture
        p.background(40, 10, 30);
        p.loadPixels();
        for (let x = 0; x < p.width; x += 4) {
          for (let y = 0; y < p.height; y += 4) {
            if (p.random() > 0.5) {
              p.fill(0, 0, p.random(20, 40), 50);
              p.noStroke();
              p.rect(x, y, 4, 4);
            }
          }
        }

        // 2. Old faded tags (background noise)
        for (let i = 0; i < 10; i++) {
          let x = p.random(p.width);
          let y = p.random(p.height);
          p.stroke(0, 0, 60, 30);
          p.strokeWeight(5);
          p.noFill();
          p.beginShape();
          p.vertex(x, y);
          p.bezierVertex(x + 50, y - 50, x - 50, y + 50, x + 100, y);
          p.endShape();
        }

        // 3. Main Piece (Gradient Fill + Outline)
        const cx = p.width / 2;
        const cy = p.height / 2;

        // Outline / "Bubble" background
        p.stroke(0, 0, 100); // White outline
        p.strokeWeight(40);
        p.strokeJoin(p.ROUND);
        p.noFill();
        p.beginShape();
        p.vertex(cx - 200, cy);
        p.bezierVertex(cx - 100, cy - 150, cx + 100, cy - 150, cx + 200, cy);
        p.bezierVertex(cx + 250, cy + 100, cx - 250, cy + 100, cx - 200, cy);
        p.endShape(p.CLOSE);

        // Fill ("Throw up")
        p.fill(320, 80, 90); // Pink
        p.noStroke();
        p.beginShape();
        p.vertex(cx - 200, cy);
        p.bezierVertex(cx - 100, cy - 150, cx + 100, cy - 150, cx + 200, cy);
        p.bezierVertex(cx + 250, cy + 100, cx - 250, cy + 100, cx - 200, cy);
        p.endShape(p.CLOSE);

        // Inner Details / Highlights
        p.fill(320, 40, 100);
        p.circle(cx - 100, cy - 50, 40);
        p.circle(cx + 80, cy - 40, 30);

        p.stroke(0);
        p.strokeWeight(10);
        p.noFill();
        // Arrow
        p.line(cx + 180, cy + 50, cx + 250, cy);
        p.line(cx + 250, cy, cx + 230, cy - 20);

        // Drips from the piece
        p.stroke(320, 80, 90);
        p.strokeWeight(8);
        p.line(cx - 50, cy + 80, cx - 50, cy + 200);
        p.line(cx + 120, cy + 80, cx + 120, cy + 250);
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "conceptual_art",
    name: "Conceptual Art (观念艺术)",
    era: "1960s-1970s",
    driver: "p5",
    description: "作品的物质形态退居次要，核心在于一套纯粹的逻辑或空间度量。",
    prompt: "如果艺术不依赖形象，它能否仅凭一段关系或一个尺度而存在？",
    styleTags: ["Logic", "Measurement", "Minimal"],
    sketch: (p: p5, seed: string) => {
      // Improved Conceptual Art: No text.
      // Visualizing measurements and spatial logic (Measuring the invisible)
      let points: { x: number; y: number }[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        initPoints();
      };

      const initPoints = () => {
        points = [];
        for (let i = 0; i < 15; i++) {
          points.push({
            x: p.random(p.width * 0.2, p.width * 0.8),
            y: p.random(p.height * 0.2, p.height * 0.8),
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 98); // Gallery white

        // Fine grid
        p.stroke(0, 0, 90);
        p.strokeWeight(1);
        for (let x = 0; x < p.width; x += 50) p.line(x, 0, x, p.height);
        for (let y = 0; y < p.height; y += 50) p.line(0, y, p.width, y);

        // Logical lines connecting points
        p.noFill();
        p.stroke(0, 0, 30, 40);

        // Measuring lines
        points.forEach((pt, i) => {
          // Draw coordinate lines to edges
          p.strokeWeight(0.5);
          p.stroke(200, 50, 70, 20); // Blueish "blueprint" line
          p.line(pt.x, 0, pt.x, p.height);
          p.line(0, pt.y, p.width, pt.y);

          // Marks
          p.fill(0);
          p.noStroke();
          p.rect(pt.x - 2, pt.y - 2, 4, 4);

          // Connect to next
          if (i < points.length - 1) {
            let next = points[i + 1];
            p.stroke(0, 0, 10, 60);
            p.strokeWeight(1);
            p.line(pt.x, pt.y, next.x, next.y);

            // Draw middle crosshair
            let midX = (pt.x + next.x) / 2;
            let midY = (pt.y + next.y) / 2;
            p.stroke(0, 80, 80, 50);
            p.line(midX - 10, midY, midX + 10, midY);
            p.line(midX, midY - 10, midX, midY + 10);
          }
        });

        // Corner labels (Visual only, no meaningful text)
        p.noStroke();
        p.fill(0, 0, 60);
        p.rect(50, 50, 100, 1);
        p.rect(50, 60, 60, 1);
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        initPoints();
      };
    },
  },
];
