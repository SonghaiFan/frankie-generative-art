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
    id: "pop_art",
    name: "Pop Art (波普艺术)",
    era: "1950s-1960s",
    driver: "p5",
    description: "通过符号的极端简化与高饱和对比，消解视觉层次并重构大众美学。",
    prompt: "当符号被削减到极致，它是否依然拥有足以被辨认的力量？",
    styleTags: ["Minimalist", "Abstract Symbol", "Repetition"],
    sketch: (p: p5, seed: string) => {
      // Pop Art: 2x2 Screenprint Grid with Misaligned Symbols
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        const w = p.width / 2;
        const h = p.height / 2;
        const colors = [
          [320, 90, 90], // Hot Pink
          [190, 90, 90], // Cyan
          [50, 90, 100], // Yellow
          [100, 80, 80], // Green
        ];

        // Draw four panels
        [0, 1, 2, 3].forEach((i) => {
          const cx = (i % 2) * w;
          const cy = Math.floor(i / 2) * h;
          const bg = colors[i];
          const fg = colors[(i + 1) % 4]; // Offset color

          p.fill(bg[0], bg[1], bg[2]);
          p.rect(cx, cy, w, h);

          // Draw "Appropriated" icon (a simple can shape)
          p.push();
          p.translate(cx + w / 2, cy + h / 2);

          // Simple screenprint offset effect
          const shiftX = Math.sin(p.frameCount * 0.05 + i) * 5;
          const shiftY = Math.cos(p.frameCount * 0.05 + i) * 5;

          p.fill(0, 0, 10); // Black outline base layer
          p.rectMode(p.CENTER);
          p.rect(shiftX, shiftY, 60, 90, 10);

          p.fill(fg[0], fg[1], fg[2]); // Bright top layer
          p.rect(0, 0, 60, 90, 10);

          p.pop();
        });
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "appropriation",
    name: "Appropriation (挪用艺术)",
    era: "1970s-Present",
    driver: "p5",
    description:
      "利用剪贴报纸、手稿和历史图像，在重叠的语境中剥离原创的权威性。",
    prompt: "当文字被剪碎，意义是否也在拼贴中获得了新生？",
    styleTags: ["Collage", "Typography", "Historical"],
    sketch: (p: p5, seed: string) => {
      // Appropriation: Synthetic Collage inspired by Analytical Cubism
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      const tornPaper = (
        x: number,
        y: number,
        w: number,
        h: number,
        col: any,
      ) => {
        p.push();
        p.fill(col);
        p.noStroke();
        p.beginShape();
        const steps = 15;
        for (let i = 0; i <= steps; i++)
          p.vertex(x + (w / steps) * i, y + p.random(-3, 3));
        for (let i = 0; i <= steps; i++)
          p.vertex(x + w + p.random(-3, 3), y + (h / steps) * i);
        for (let i = steps; i >= 0; i--)
          p.vertex(x + (w / steps) * i, y + h + p.random(-3, 3));
        for (let i = steps; i >= 0; i--)
          p.vertex(x + p.random(-3, 3), y + (h / steps) * i);
        p.endShape(p.CLOSE);
        p.pop();
      };

      const drawTextLines = (
        x: number,
        y: number,
        w: number,
        lines: number,
      ) => {
        p.stroke(0, 0, 10, 50);
        p.strokeWeight(1.2);
        for (let i = 0; i < lines; i++) {
          const ly = y + i * 7;
          p.line(x, ly, x + w * p.random(0.7, 1), ly);
        }
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.background(40, 5, 90); // Muted paper background

        const cx = p.width / 2;
        const cy = p.height / 2;

        // 1. Charcoal sketch lines
        p.stroke(0, 0, 20, 40);
        p.strokeWeight(1);
        for (let i = 0; i < 10; i++) {
          p.line(p.random(p.width), 0, p.random(p.width), p.height);
          p.line(0, p.random(p.height), p.width, p.random(p.height));
        }

        // 2. Layered fragments
        for (let i = 0; i < 14; i++) {
          p.push();
          p.translate(cx + p.random(-250, 250), cy + p.random(-250, 250));
          p.rotate(p.random(-0.3, 0.3));

          const type = p.floor(p.random(4));
          if (type === 0) {
            // Newspaper clipping
            tornPaper(
              0,
              0,
              p.random(120, 200),
              p.random(150, 300),
              p.color(45, 10, 85),
            );
            drawTextLines(15, 20, 100, 22);
          } else if (type === 1) {
            // Wood/Charcoal block
            tornPaper(
              0,
              0,
              p.random(60, 100),
              p.random(200, 450),
              p.color(30, 30, 30),
            );
          } else if (type === 2) {
            // Sheet music / Grid
            tornPaper(
              0,
              0,
              p.random(150, 250),
              p.random(100, 180),
              p.color(0, 0, 95),
            );
            for (let j = 0; j < 6; j++) {
              p.stroke(0, 0, 0, 30);
              p.line(10, 15 + j * 12, 130, 15 + j * 12);
            }
          } else {
            // Muted Color accent
            const hue = p.random() > 0.5 ? 100 : 20;
            tornPaper(
              0,
              0,
              p.random(80, 120),
              p.random(100, 250),
              p.color(hue, 40, 45),
            );
          }
          p.pop();
        }

        // 3. Central focus Typography
        p.push();
        p.translate(cx + p.random(-50, 50), cy + p.random(-50, 50));
        p.fill(0, 0, 10);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(p.random(60, 100));
        p.textFont("serif");
        p.textStyle(p.BOLD);
        const headers = ["FIGARO", "JOURNAL", "LA PRESSE", "VIREUX"];
        p.text(p.random(headers), 0, 0);
        p.pop();

        // 4. Subtle center structures
        p.noFill();
        p.stroke(0, 0, 0, 80);
        p.strokeWeight(2.5);
        p.arc(cx, cy, 350, 250, p.QUARTER_PI, p.PI);
        p.line(cx - 100, cy + 50, cx + 180, cy - 30);
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
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
          (p as any).drawingContext.setLineDash([5, 5]);
          p.line(pt.x, pt.y, pt.x, p.height * 0.1);
          p.line(pt.x, pt.y, p.width * 0.1, pt.y);
          (p as any).drawingContext.setLineDash([]);

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
  {
    id: "new_ugly",
    name: "New Ugly (新丑风)",
    era: "Post-Internet Era",
    driver: "p5",
    description:
      "拒绝传统的精致与比例，通过故意而为的笨拙、刺眼的撞色和扭曲的布局，解构刻板的视觉秩序。",
    prompt: "当‘丑’变得如此理直气壮，它是否比‘美’更真实？",
    styleTags: ["Anti-Design", "Distorted", "Clashing", "Raw"],
    sketch: (p: p5, seed: string) => {
      // New Ugly: Anti-Design and Harsh Contrast
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        const time = p.frameCount * 0.05;

        // 1. Clashing Background
        const bgHue = p.random() > 0.5 ? 120 : 300; // Harsh Lime or Harsh Pink
        p.background(bgHue, 100, 100);

        // 2. Distorted Shapes (Anti-Design Layout)
        for (let i = 0; i < 6; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const w = p.random(100, 400);
          const h = p.random(50, 150);

          p.push();
          p.translate(x, y);
          // Deliberately awkward rotation
          p.rotate(p.random(-0.5, 0.5) + p.sin(time + i) * 0.1);

          // Harsh clashing colors
          p.fill(p.random(360), 100, 100, 80);
          p.stroke(0, 0, 0);
          p.strokeWeight(p.random(5, 15));

          const shapeType = p.floor(p.random(3));
          if (shapeType === 0) {
            p.rect(0, 0, w, h);
          } else if (shapeType === 1) {
            p.ellipse(0, 0, w, h); // Squashed ellipse
          } else {
            // Primitive polygon
            p.beginShape();
            for (let j = 0; j < 4; j++) {
              p.vertex(p.random(w), p.random(h));
            }
            p.endShape(p.CLOSE);
          }
          p.pop();
        }

        // 3. "Digital Garbage" - Brutalist blobs
        for (let i = 0; i < 3; i++) {
          const x = p.noise(time, i) * p.width;
          const y = p.noise(i, time) * p.height;
          p.fill(200, 100, 100); // Harsh blue
          p.noStroke();
          p.circle(x, y, 150);

          p.fill(0, 0, 100);
          p.textSize(40);
          p.text("ERROR", x - 60, y + 10);
        }

        // 4. Broken Lines
        p.stroke(0, 100, 100);
        p.strokeWeight(10);
        for (let i = 0; i < 5; i++) {
          p.line(0, p.random(p.height), p.width, p.random(p.height));
        }
      };

      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "memphis",
    name: "Memphis Design (孟菲斯设计)",
    era: "1980s Postmodernism",
    driver: "p5",
    description:
      "通过鲜艳的撞色、琐碎的几何与波浪线条，在1980年代发起了一场对精英品味的彩色叛乱。",
    prompt: "当有序的混乱与极具廉价感的活泼相结合，是否能更彻底地解构严肃？",
    styleTags: ["Postmodern", "Vibrant", "Pattern", "Playful"],
    sketch: (p: p5, seed: string) => {
      // Memphis Design: 1980s Chaos and Geometry
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };

      const drawWavyLine = (
        x: number,
        y: number,
        len: number,
        amp: number,
        freq: number,
      ) => {
        p.noFill();
        p.beginShape();
        for (let i = 0; i < len; i++) {
          p.vertex(x + i, y + p.sin(i * freq) * amp);
        }
        p.endShape();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.background(0, 0, 100); // Clean white base

        // 1. Background Pattern (Technical dots or grid)
        p.stroke(0, 0, 80);
        p.strokeWeight(2);
        for (let x = 0; x < p.width; x += 40) {
          for (let y = 0; y < p.height; y += 40) {
            p.point(x, y);
          }
        }

        // 2. Large Bold Geometry
        const shapes = 10;
        const colors = [
          [330, 80, 100], // Memphis Pink
          [180, 100, 100], // Cyan
          [60, 100, 100], // Yellow
          [280, 70, 90], // Purple
        ];

        for (let i = 0; i < shapes; i++) {
          const col = p.random(colors);
          p.fill(col[0], col[1], col[2]);
          p.stroke(0);
          p.strokeWeight(4);

          const x = p.random(p.width);
          const y = p.random(p.height);
          const sz = p.random(100, 300);

          p.push();
          p.translate(x, y);
          p.rotate(p.random(p.TWO_PI));

          const type = p.floor(p.random(3));
          if (type === 0)
            p.triangle(0, -sz / 2, -sz / 2, sz / 2, sz / 2, sz / 2);
          else if (type === 1) p.circle(0, 0, sz);
          else p.rect(-sz / 2, -sz / 2, sz, sz);
          p.pop();
        }

        // 3. Wavy "Bacteria" Patterns
        p.stroke(0);
        p.strokeWeight(6);
        for (let i = 0; i < 8; i++) {
          const x = p.random(p.width * 0.2, p.width * 0.8);
          const y = p.random(p.height * 0.2, p.height * 0.8);
          p.push();
          p.translate(x, y);
          p.rotate(p.random(p.TWO_PI));
          drawWavyLine(0, 0, 150, 20, 0.1);
          p.pop();
        }

        // 4. Confetti (Squiggles and small bits)
        p.noStroke();
        for (let i = 0; i < 30; i++) {
          p.fill(p.random(colors)[0], 80, 100);
          p.rect(p.random(p.width), p.random(p.height), 15, 5);
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
];
