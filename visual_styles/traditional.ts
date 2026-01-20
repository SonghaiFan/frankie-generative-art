import p5 from "p5";
import { ArtStyle } from "../types";

export const traditionalStyles: ArtStyle[] = [
  {
    id: "ukiyo_e",
    name: "Ukiyo-e (浮世绘)",
    era: "Edo Period",
    driver: "p5",
    description: "虚浮世界的绘画，用流畅的线条和平面色彩描绘瞬息万变的享乐。",
    prompt: "如果生活只是一场短暂的漂流，你会随波逐流还是逆流而上？",
    styleTags: ["Fluid", "Flat", "Lines"],
    sketch: (p: p5, seed: string) => {
      // Ukiyo-e (浮世绘) - Hokusai Style: Gradient Sky, Mt. Fuji, Stylized Clouds
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        // 1. Sky Gradient (Bokashi)
        for (let y = 0; y < p.height; y++) {
          const interp = p.map(y, 0, p.height * 0.7, 0, 1);
          const s = p.lerp(70, 10, interp);
          const b = p.lerp(40, 95, interp);
          p.stroke(210, s, b);
          p.line(0, y, p.width, y);
          if (y > p.height * 0.7) break;
        }

        const numSeed = parseInt(seed) || Math.floor(p.random(10000));
        p.randomSeed(numSeed);

        // 2. The Red Sun
        const sunX = p.width * 0.8;
        const sunY = p.height * 0.25;
        const sunSize = p.min(p.width, p.height) * 0.25;
        p.noStroke();
        p.fill(0, 85, 90);
        p.circle(sunX, sunY, sunSize);

        // 3. Mount Fuji
        const mx = p.width * 0.5;
        const my = p.height * 0.65;
        const mw = p.width * 0.6;
        const mh = p.height * 0.4;

        p.noStroke();
        p.fill(210, 60, 50); // Indigo
        p.beginShape();
        p.vertex(0, p.height);
        p.vertex(mx - mw / 2, p.height);
        p.quadraticVertex(mx - mw * 0.1, my + mh * 0.5, mx, my);
        p.quadraticVertex(mx + mw * 0.1, my + mh * 0.5, mx + mw / 2, p.height);
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);

        // Snow Cap
        p.fill(240, 5, 98);
        p.beginShape();
        p.vertex(mx, my);
        p.vertex(mx + 20, my + 40);
        p.vertex(mx + 10, my + 35);
        p.vertex(mx - 5, my + 45);
        p.vertex(mx - 15, my + 35);
        p.vertex(mx - 25, my + 45);
        p.endShape(p.CLOSE);

        // 4. Texture/Grain (Washi Paper)
        p.loadPixels();
        for (let i = 0; i < p.width * p.height * 4; i += 4) {
          if (Math.random() > 0.8) {
            p.pixels[i] = Math.max(0, p.pixels[i] - 10); // darken slightly
            p.pixels[i + 1] = Math.max(0, p.pixels[i + 1] - 10);
            p.pixels[i + 2] = Math.max(0, p.pixels[i + 2] - 10);
          }
        }
        p.updatePixels();
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    id: "ink_wash",
    name: "Ink Wash (水墨)",
    era: "Various Dynasties",
    driver: "p5",
    description:
      "黑白虚实之间，气韵生动。计白当黑，用极简的笔墨表现无限的意境。",
    prompt: "如果没有颜色，你会如何描绘世界的灵魂？",
    styleTags: ["Flow", "Void", "Brushstroke"],
    sketch: (p: p5, seed: string) => {
      // Improved Ink Wash: Procedural Mountains + Shufa Strokes
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noLoop();
      };

      const drawMountain = (
        y: number,
        baseH: number,
        col: number,
        s: number,
      ) => {
        p.fill(col, 200);
        p.noStroke();
        p.beginShape();
        p.vertex(0, p.height);
        for (let x = 0; x <= p.width; x += 5) {
          let n = p.noise(x * 0.005, s * 100);
          let h = n * baseH;
          p.vertex(x, y - h);
        }
        p.vertex(p.width, p.height);
        p.endShape(p.CLOSE);

        // Add "mist" effect at the bottom
        for (let i = 0; i < 5; i++) {
          p.fill(245, 150); // Paper color mist
          p.rect(0, p.height - i * 20, p.width, 30);
        }
      };

      const drawStroke = (x: number, y: number, len: number, angle: number) => {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.fill(0, 180);
        p.beginShape();
        let sw = p.random(2, 8);
        for (let i = 0; i < len; i += 2) {
          let r = sw * p.noise(i * 0.1);
          p.circle(i, p.random(-r, r), r);
        }
        p.endShape();
        p.pop();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.noiseSeed(getSeedNum(seed));
        p.background(245); // Warm paper back

        // 1. Distant Mountains (Lightest)
        for (let i = 0; i < 3; i++) {
          drawMountain(p.height * 0.5 + i * 50, 200 - i * 30, 200 - i * 20, i);
        }

        // 2. Middle Ground
        drawMountain(p.height * 0.7, 300, 100, 5);

        // 3. Foreground Brushstrokes (like reeds or branches)
        for (let i = 0; i < 15; i++) {
          drawStroke(
            p.random(p.width),
            p.height,
            p.random(100, 300),
            -p.PI / 2 + p.random(-0.5, 0.5),
          );
        }

        // 4. Ink Splatters
        for (let i = 0; i < 20; i++) {
          p.fill(0, p.random(50, 150));
          p.circle(p.random(p.width), p.random(p.height), p.random(1, 5));
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    id: "dunhuang",
    era: "Ancient China",
    name: "Dunhuang (敦煌)",
    driver: "p5",
    description: "沙漠中的佛国，飞天飘带与矿物颜料的交响，历史的层叠与风化。",
    prompt: "在时间的沙漠中，什么颜色能永不褪色？",
    styleTags: ["Earth Tones", "Ribbons", "Gold"],
    sketch: (p: p5, seed: string) => {
      // Improved Dunhuang: Mineral Palette + Flowing Ribbons + Weathered Texture
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

      const drawRibbon = (y: number, hue: number, seed: number) => {
        p.push();
        p.noFill();
        p.stroke(hue, 60, 50, 80);
        p.strokeWeight(p.random(10, 30));
        p.beginShape();
        for (let x = -50; x < p.width + 50; x += 10) {
          let n = p.noise(x * 0.003, seed, p.frameCount * 0.01);
          let yOff = p.map(n, 0, 1, -150, 150);
          p.curveVertex(x, y + yOff);
        }
        p.endShape();
        p.pop();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.noiseSeed(getSeedNum(seed));

        // 1. Weathered Sandstone Background
        p.background(35, 30, 85); // Warm Gobi sand
        for (let i = 0; i < 2000; i++) {
          p.noStroke();
          p.fill(35, 40, 70, 10);
          p.circle(p.random(p.width), p.random(p.height), p.random(2, 5));
        }

        // 2. Mineral Colors Flowing
        const mineralPalette = [10, 160, 200, 45]; // Vermilion, Malachite, Lapis, Ochre
        for (let i = 0; i < 8; i++) {
          drawRibbon(p.height * (0.2 + i * 0.1), p.random(mineralPalette), i);
        }

        // 3. Gold Accents (Houshi pattern)
        for (let i = 0; i < 30; i++) {
          let x = p.random(p.width);
          let y = p.random(p.height);
          p.stroke(45, 80, 90, 60); // Golden
          p.strokeWeight(2);
          p.noFill();
          p.push();
          p.translate(x, y);
          for (let j = 0; j < 4; j++) {
            p.rotate(p.HALF_PI);
            p.arc(5, 5, 20, 20, 0, p.HALF_PI);
          }
          p.pop();
        }

        // 4. Weathered Cracks
        p.stroke(20, 10, 30, 15);
        p.strokeWeight(1);
        for (let i = 0; i < 5; i++) {
          let x = p.random(p.width);
          let y = 0;
          p.beginShape();
          for (let j = 0; j < p.height; j += 10) {
            x += p.random(-5, 5);
            p.vertex(x, j);
          }
          p.endShape();
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    era: "Ming/Qing Dynasty",
    id: "blue_white",
    name: "Blue & White (青花)",
    driver: "p5",
    description: "钴蓝与白瓷的永恒对话，精致的缠枝花纹与几何边界。",
    prompt: "纯粹的蓝与白，是否足以讲述万物？",
    styleTags: ["Cobalt Blue", "Pattern", "Ceramic"],
    sketch: (p: p5, seed: string) => {
      // Improved Blue & White: Chanzhi Patterns + Glaze Texture
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

      const drawVine = (x: number, y: number, r: number, angle: number) => {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.noFill();
        p.stroke(230, 80, 60, 70); // Cobalt Blue
        p.strokeWeight(2);

        p.beginShape();
        for (let i = 0; i < 100; i += 5) {
          let nx = i;
          let ny = Math.sin(i * 0.05) * 20;
          p.vertex(nx, ny);
          if (i % 20 === 0) {
            p.push();
            p.fill(230, 80, 50, 40);
            p.noStroke();
            p.ellipse(nx, ny, 15, 8);
            p.pop();
          }
        }
        p.endShape();
        p.pop();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.background(200, 5, 98); // Glazed porcelain white

        // 1. Ceramic Glaze Shine
        p.noStroke();
        for (let i = 0; i < 50; i++) {
          p.fill(0, 0, 100, 10);
          p.ellipse(p.random(p.width), p.random(p.height), p.random(100, 300));
        }

        // 2. Chanzhi (Intertwined Vine) Pattern
        for (let i = 0; i < 12; i++) {
          drawVine(
            p.random(p.width),
            p.random(p.height),
            200,
            p.random(p.TWO_PI),
          );
        }

        // 3. Central Medallion
        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.stroke(230, 90, 40);
        p.strokeWeight(4);
        p.noFill();
        p.circle(0, 0, 200);
        p.circle(0, 0, 210);

        // Ruyi pattern in center
        for (let a = 0; a < p.TWO_PI; a += p.PI / 4) {
          p.push();
          p.rotate(a);
          p.fill(230, 80, 60, 30);
          p.arc(60, 0, 40, 40, -p.HALF_PI, p.HALF_PI);
          p.pop();
        }
        p.pop();

        // 4. Border Pattern
        p.stroke(230, 80, 50);
        p.strokeWeight(10);
        p.noFill();
        p.rect(20, 20, p.width - 40, p.height - 40);
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    era: "Traditional / SE Asia",
    id: "batik",
    name: "Batik (蜡染)",
    driver: "p5",
    description: "蜡与染料的艺术，冰裂纹的偶然之美，靛蓝与大地色的深沉纹理。",
    prompt: "在被阻挡的地方，是否藏着最美的纹理？",
    styleTags: ["Resist", "Crackle", "Indigo"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        p.background(240, 40, 30); // Dark Indigo
        const t = p.frameCount * 0.01;
        p.fill(40, 10, 90); // wax
        const s = 60;
        for (let x = 0; x < p.width; x += s) {
          for (let y = 0; y < p.height; y += s) {
            const rot = Math.sin(t + x * 0.01 + y * 0.01);
            p.push();
            p.translate(x + s / 2, y + s / 2);
            p.rotate(rot);
            p.rect(-10, -10, 20, 20);
            p.pop();
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "Indigenous Australian",
    id: "dot_painting",
    name: "Dot Painting (点画)",
    driver: "p5",
    description: "大地的梦径，用无数的点编织古老的故事与地图。",
    prompt: "如果要画出大地的梦，你会从哪里开始落点？",
    styleTags: ["Dots", "Earth Pigments", "Dreamtime"],
    sketch: (p: p5, seed: string) => {
      // Improved Dot Painting: Dreaming Tracks + Earth Palette
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

      const drawTrack = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        col: number[],
      ) => {
        const d = p.dist(x1, y1, x2, y2);
        const steps = d / 8;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = p.lerp(x1, x2, t) + p.random(-5, 5);
          const y = p.lerp(y1, y2, t) + p.random(-5, 5);
          const dotSize = p.random(6, 12);

          // Outer glow for the dot
          p.fill(col[0], col[1], col[2], 30);
          p.circle(x, y, dotSize * 1.5);

          // Core dot
          p.fill(col[0], col[1], col[2]);
          p.circle(x, y, dotSize);
        }
      };

      const drawSymbol = (cx: number, cy: number, r: number, col: number[]) => {
        const dots = p.floor(r * 0.8);
        for (let i = 0; i < dots; i++) {
          const a = (p.TWO_PI / dots) * i;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          p.fill(col[0], col[1], col[2]);
          p.circle(x, y, p.random(5, 8));
        }
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.background(20, 40, 15); // Deep charcoal/earth background

        const palette = [
          [25, 80, 80], // Ochre Red
          [40, 70, 90], // Desert Yellow
          [30, 20, 95], // White Clay
          [10, 80, 40], // Deep Brown
        ];

        // 1. Dreaming Tracks (Wandering lines)
        for (let i = 0; i < 5; i++) {
          let x = p.random(p.width);
          let y = p.random(p.height);
          const col = p.random(palette);
          for (let j = 0; j < 6; j++) {
            let nx = x + p.random(-200, 200);
            let ny = y + p.random(-200, 200);
            drawTrack(x, y, nx, ny, col);
            x = nx;
            y = ny;
          }
        }

        // 2. Sacred Sites (Concentric symbols)
        for (let i = 0; i < 4; i++) {
          const cx = p.random(p.width * 0.2, p.width * 0.8);
          const cy = p.random(p.height * 0.2, p.height * 0.8);
          const rings = p.floor(p.random(3, 6));
          const col = p.random(palette);
          for (let r = 0; r < rings; r++) {
            drawSymbol(cx, cy, (r + 1) * 20, col);
          }
        }

        // 3. Fill / Background Texture (Fine dots)
        for (let i = 0; i < 3000; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const col = p.random(palette);
          p.fill(col[0], col[1], p.random(20, 60), 40);
          p.circle(x, y, p.random(2, 5));
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
];
