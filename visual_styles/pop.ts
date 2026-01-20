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
      // Fluxus: Art as Event, Life as Breath
      let phase = 0;
      let elements: any[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        p.background(0, 0, 95, 8); // Deep fades for temporal feel

        phase += 0.05;
        const breath = (Math.sin(phase) + 1) / 2;
        const size = p.map(breath, 0, 1, 50, 200);

        // The "Breathing" Core
        p.noFill();
        p.stroke(0, 0, 20);
        p.strokeWeight(2);
        p.ellipse(p.width / 2, p.height / 2, size, size);

        // Temporal "events" (lines that appear and disappear)
        if (p.frameCount % 20 === 0) {
          elements.push({
            x1: p.random(p.width),
            y1: p.random(p.height),
            x2: p.random(p.width),
            y2: p.random(p.height),
            life: 100,
          });
        }

        elements.forEach((el, i) => {
          p.stroke(0, 0, 40, el.life / 2);
          p.line(el.x1, el.y1, el.x2, el.y2);
          el.life -= 1;
        });
        elements = elements.filter((el) => el.life > 0);

        // Occasional "Anti-Art" mark
        if (p.random() > 0.99) {
          p.fill(0);
          p.noStroke();
          p.rect(p.random(p.width), p.random(p.height), p.random(5, 50), 2);
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
      // Abstract Dynamic Graffiti: Wildstyle + Splatters + Seeded Chaos
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };

      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      const spraySplatter = (
        x: number,
        y: number,
        color: any,
        size: number,
      ) => {
        p.noStroke();
        p.fill(color);
        for (let i = 0; i < 30; i++) {
          const r = p.random(size);
          const angle = p.random(p.TWO_PI);
          const d = p.pow(p.random(), 1.5) * r;
          p.circle(
            x + Math.cos(angle) * d,
            y + Math.sin(angle) * d,
            p.random(1, 4),
          );
        }
      };

      const drawWildShape = (
        cx: number,
        cy: number,
        w: number,
        h: number,
        col: any,
        isOutline = false,
      ) => {
        if (isOutline) {
          p.noFill();
          p.stroke(0, 0, 100);
          p.strokeWeight(20);
        } else {
          p.fill(col);
          p.noStroke();
        }

        p.beginShape();
        const pts = 10;
        for (let i = 0; i <= pts; i++) {
          const angle = (p.TWO_PI / pts) * i;
          const r = p.random(0.5, 1.3) * (w / 2);
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r * (h / w);
          if (i === 0) p.vertex(px, py);
          else {
            p.bezierVertex(
              cx + p.random(-w, w) * 0.5,
              cy + p.random(-h, h) * 0.5,
              px + p.random(-50, 50),
              py + p.random(-50, 50),
              px,
              py,
            );
          }
        }
        p.endShape(p.CLOSE);
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));

        // 1. Gritty Concrete Texture
        p.background(0, 0, 25);
        for (let i = 0; i < 800; i++) {
          p.fill(0, 0, p.random(15, 35), 40);
          p.noStroke();
          p.rect(
            p.random(p.width),
            p.random(p.height),
            p.random(1, 6),
            p.random(1, 6),
          );
        }

        // 2. Faded Background Tags
        for (let i = 0; i < 8; i++) {
          p.stroke(0, 0, 50, 15);
          p.strokeWeight(p.random(5, 40));
          p.noFill();
          p.beginShape();
          const startX = p.random(p.width);
          const startY = p.random(p.height);
          for (let j = 0; j < 5; j++) {
            p.curveVertex(
              startX + p.random(-200, 200),
              startY + p.random(-200, 200),
            );
          }
          p.endShape();
        }

        const mainHue = p.random(360);
        const cx = p.width / 2;
        const cy = p.height / 2;
        const baseW = p.min(p.width, p.height) * 0.7;

        // 3. Main Piece: Wildstyle Abstraction
        // 3D Shadow
        drawWildShape(
          cx + 20,
          cy + 20,
          baseW,
          baseW * 0.6,
          p.color(0, 0, 0, 40),
        );
        // Bold Outline
        drawWildShape(
          cx,
          cy,
          baseW + 30,
          baseW * 0.6 + 30,
          p.color(0, 0, 100),
          true,
        );
        // Fill
        drawWildShape(cx, cy, baseW, baseW * 0.6, p.color(mainHue, 80, 90));
        // Inner Pattern/Highlight
        drawWildShape(
          cx + p.random(-40, 40),
          cy + p.random(-40, 40),
          baseW * 0.6,
          baseW * 0.3,
          p.color((mainHue + 40) % 360, 60, 100, 50),
        );

        // 4. Dynamic Details: Highlights, Drips, and Arrows
        p.stroke(0, 0, 100, 70);
        p.strokeWeight(8);
        p.noFill();
        for (let i = 0; i < 5; i++) {
          const hx = cx + p.random(-baseW * 0.4, baseW * 0.4);
          const hy = cy + p.random(-baseW * 0.2, baseW * 0.2);
          p.arc(
            hx,
            hy,
            p.random(40, 100),
            p.random(10, 30),
            p.random(p.PI),
            p.random(p.TWO_PI),
          );
        }

        // Drips
        for (let i = 0; i < 12; i++) {
          const dx = cx + p.random(-baseW / 2, baseW / 2);
          const dy = cy + p.random(0, baseW * 0.2);
          const len = p.random(50, 250);
          p.stroke(mainHue, 85, 95);
          p.strokeWeight(p.random(3, 10));
          p.line(dx, dy, dx, dy + len);
          p.noStroke();
          p.fill(mainHue, 85, 95);
          p.circle(dx, dy + len, p.random(6, 12));
          if (p.random() > 0.5)
            spraySplatter(dx, dy + len + 5, p.color(mainHue, 85, 95, 30), 20);
        }

        // Abstract Arrows
        p.stroke(0);
        p.strokeWeight(12);
        for (let i = 0; i < 2; i++) {
          const ax = cx + (p.random() > 0.5 ? baseW * 0.5 : -baseW * 0.5);
          const ay = cy + p.random(-50, 50);
          p.line(ax, ay, ax + p.random(50, 100), ay + p.random(-30, 30));
        }

        // 5. Final Spray Splatters
        for (let i = 0; i < 10; i++) {
          const col = p.color(p.random(360), 70, 100, 20);
          spraySplatter(
            p.random(p.width),
            p.random(p.height),
            col,
            p.random(40, 120),
          );
        }
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
      // Improved Conceptual Art: System-driven logic, Blueprint aesthetic.
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      let points: { x: number; y: number; label: string }[] = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };

      const initSystem = () => {
        p.randomSeed(getSeedNum(seed));
        points = [];
        const count = p.floor(p.random(6, 12));
        for (let i = 0; i < count; i++) {
          points.push({
            x: p.random(p.width * 0.15, p.width * 0.85),
            y: p.random(p.height * 0.15, p.height * 0.85),
            label: `P-${i}`,
          });
        }
      };

      p.draw = () => {
        initSystem();
        p.background(0, 0, 98); // Gallery white

        // 1. Technical Grid
        p.stroke(0, 0, 92);
        p.strokeWeight(1);
        for (let x = 0; x <= p.width; x += 40) p.line(x, 0, x, p.height);
        for (let y = 0; y <= p.height; y += 40) p.line(0, y, p.width, y);

        // 2. Logical Framework
        p.noFill();

        // Primary Axis
        p.stroke(200, 70, 60, 30); // Technical Blue
        p.line(p.width * 0.1, p.height * 0.1, p.width * 0.9, p.height * 0.1);
        p.line(p.width * 0.1, p.height * 0.1, p.width * 0.1, p.height * 0.9);

        // 3. Relationships (Geometric Logic)
        points.forEach((pt, i) => {
          // Extension lines to axes
          p.stroke(0, 0, 80);
          p.setLineDash([5, 5]);
          p.line(pt.x, pt.y, pt.x, p.height * 0.1);
          p.line(pt.x, pt.y, p.width * 0.1, pt.y);
          p.setLineDash([]);

          // Connection to next point (The Path)
          if (i < points.length - 1) {
            let next = points[i + 1];
            p.stroke(0, 0, 20, 60);
            p.strokeWeight(1.5);
            p.line(pt.x, pt.y, next.x, next.y);

            // Midpoint marker
            let midX = (pt.x + next.x) / 2;
            let midY = (pt.y + next.y) / 2;
            p.stroke(0, 80, 80, 80); // Red logic mark
            p.line(midX - 8, midY - 8, midX + 8, midY + 8);
            p.line(midX + 8, midY - 8, midX - 8, midY + 8);
          }

          // Point Marker
          p.fill(0);
          p.noStroke();
          p.rectMode(p.CENTER);
          p.rect(pt.x, pt.y, 6, 6);

          // Geometric Radius (Invisible influence)
          p.noFill();
          p.stroke(200, 50, 80, 15);
          p.circle(
            pt.x,
            pt.y,
            p.dist(pt.x, pt.y, p.width / 2, p.height / 2) * 0.5,
          );
        });

        // 4. Abstract "Dimensions" (No text, just indicators)
        p.stroke(0, 0, 40);
        p.strokeWeight(1);
        const margin = 50;
        p.line(margin, p.height - margin, p.width - margin, p.height - margin); // Bottom scale
        for (let i = 0; i < 10; i++) {
          let x = p.map(i, 0, 9, margin, p.width - margin);
          p.line(x, p.height - margin - 5, x, p.height - margin + 5);
        }

        // 5. Focal "Logic Block"
        p.noStroke();
        p.fill(0, 0, 20, 10);
        p.rect(p.width * 0.8, p.height * 0.2, 100, 100);
        p.stroke(0, 0, 0, 50);
        p.line(
          p.width * 0.8 - 40,
          p.height * 0.2,
          p.width * 0.8 + 40,
          p.height * 0.2,
        );
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
];
