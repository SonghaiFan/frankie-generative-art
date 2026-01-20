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
      // Romantic Sublime: Storm, Awe, Terror
      let lightningTimer = 0;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };

      p.draw = () => {
        p.background(220, 40, 5); // Dark stormy sea color

        const t = p.frameCount * 0.01;

        // Sky: Turbulent
        for (let i = 0; i < 20; i++) {
          const x = p.noise(i, t * 0.2) * p.width * 1.5 - p.width * 0.25;
          const y = p.noise(i + 100, t * 0.1) * p.height * 0.6;
        }

        // Lightning
        if (p.random() > 0.98) {
          p.background(200, 200, 255, 50);
          p.stroke(255);
          p.strokeWeight(2);
          let lx = p.random(p.width);
          let ly = 0;
          while (ly < p.height) {
            let nextX = lx + p.random(-30, 30);
            let nextY = ly + p.random(10, 40);
            p.line(lx, ly, nextX, nextY);
            lx = nextX;
            ly = nextY;
          }
          p.noStroke();
        }

        // Sea: Raging Waves
        const horizon = p.height * 0.7;
        for (let y = horizon; y < p.height; y += 5) {
          let offset = Math.sin(y * 0.05 + t * 5) * 10 + p.noise(y, t) * 20;
          p.fill(210, 60, p.map(y, horizon, p.height, 10, 30));
          p.rect(0, y + offset, p.width, 6);
        }

        // Tiny Ship / Figure
        p.fill(0);
        p.push();
        const shipX = p.width * 0.5;
        const shipY = horizon + Math.sin(t * 3) * 10;
        p.translate(shipX, shipY);
        p.rotate(Math.sin(t * 2) * 0.1);
        p.beginShape();
        p.vertex(-20, 0);
        p.vertex(20, 0);
        p.vertex(10, 10);
        p.vertex(-10, 10);
        p.endShape();
        p.rect(-2, -25, 4, 25); // Mast
        p.pop();
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "land_art",
    name: "Land Art (大地艺术)",
    era: "1960s-1970s",
    driver: "p5",
    description: "在荒野中用石头、泥土和足迹画画，作品与风雨和时间共同完成。",
    prompt: "如果画布是整片土地，你想在地球表面画出怎样的一笔？",
    styleTags: ["Earth", "Spiral", "Site-Specific"],
    sketch: (p: p5, seed: string) => {
      // Improved Land Art: Monumental Geometries + Atmospheric Decay
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

      const drawHorizon = (y: number, complexity: number) => {
        p.beginShape();
        p.vertex(0, p.height);
        p.vertex(0, y);
        for (let x = 0; x <= p.width; x += 20) {
          let noiseVal = p.noise(x * 0.005, y);
          p.vertex(x, y - noiseVal * complexity);
        }
        p.vertex(p.width, y);
        p.vertex(p.width, p.height);
        p.endShape(p.CLOSE);
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        p.noiseSeed(getSeedNum(seed));

        const horizon = p.height * 0.5;

        // 1. Atmospheric Sky
        const skyHue = p.random([200, 30, 10, 280]); // Blue, Gold, Red, or Purple
        for (let y = 0; y < horizon; y++) {
          let inter = p.map(y, 0, horizon, 0, 1);
          p.stroke(skyHue, 40 * inter, 90 - 20 * inter);
          p.line(0, y, p.width, y);
        }

        // 2. Distant Mountains
        p.noStroke();
        p.fill(skyHue, 20, 40);
        drawHorizon(horizon, 150);

        // 3. Terrain (Salt Lake or Desert)
        const groundHue = p.random([0, 30, 340]); // Red Clay, Sand, or Pink Salt
        p.fill(groundHue, 10, 20); // Deep background
        p.rect(0, horizon, p.width, p.height - horizon);

        // Texture for ground
        for (let i = 0; i < 5000; i++) {
          p.fill(groundHue, p.random(10, 30), p.random(20, 50), 30);
          p.circle(
            p.random(p.width),
            p.random(horizon, p.height),
            p.random(1, 4),
          );
        }

        // 4. The Earthwork Structure
        p.push();
        const cx = p.width / 2;
        const cy = horizon + (p.height - horizon) * 0.6;
        p.translate(cx, cy);

        const type = p.floor(p.random(3)); // 0: Spiral, 1: Concentric, 2: Linear
        const accentHue = (groundHue + 180) % 360;

        if (type === 0) {
          // Spiral (Robert Smithson vibe)
          let coils = p.random(3, 6);
          let points = 800;
          let rMax = p.min(p.width, p.height) * 0.4;
          for (let i = 0; i < points; i++) {
            let t = i / points;
            let theta = t * p.TWO_PI * coils;
            let r = t * rMax;
            let x = Math.cos(theta) * r;
            let y = Math.sin(theta) * r * 0.5; // Perspective
            drawRock(p, x, y, p.map(i, 0, points, 4, 15));
          }
        } else if (type === 1) {
          // Concentric Circles (Richard Long vibe)
          let rings = p.floor(p.random(4, 8));
          for (let r = 0; r < rings; r++) {
            let radius = (r + 1) * 40;
            let count = radius * 0.8;
            for (let i = 0; i < count; i++) {
              let theta = (p.TWO_PI / count) * i;
              let x = Math.cos(theta) * radius * 2.5;
              let y = Math.sin(theta) * radius * 1.25;
              drawRock(p, x, y, p.random(8, 12));
            }
          }
        } else {
          // Linear / Trench (Walter De Maria / Michael Heizer vibe)
          let lines = p.floor(p.random(5, 12));
          for (let l = 0; l < lines; l++) {
            let xOff = (l - lines / 2) * 50;
            for (let j = 0; j < 400; j += 10) {
              let yOff = j - 200;
              drawRock(p, xOff + yOff * 0.5, yOff, 8);
            }
          }
        }
        p.pop();

        // 5. Atmospheric effects (Mist/Sun flare)
        p.noStroke();
        for (let r = 500; r > 0; r -= 10) {
          p.fill(skyHue, 10, 100, 1);
          p.circle(p.width * 0.8, horizon * 0.4, r);
        }
      };

      const drawRock = (p: p5, x: number, y: number, size: number) => {
        p.push();
        p.translate(x, y);
        p.rotate(p.random(p.TWO_PI));

        // Shadow
        p.fill(0, 0, 0, 30);
        p.ellipse(2, 2, size, size * 0.6);

        // Rock body
        const rockCol = p.random(20, 40);
        p.fill(0, 0, rockCol);
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += p.PI / 3) {
          let r = size * 0.5 + p.random(-size * 0.2, size * 0.2);
          p.vertex(Math.cos(a) * r, Math.sin(a) * r);
        }
        p.endShape(p.CLOSE);

        // Salt crust / Highlights
        if (p.random() > 0.6) {
          p.fill(0, 0, 100, 40);
          p.circle(-size * 0.2, -size * 0.2, size * 0.3);
        }
        p.pop();
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "metaphysical",
    name: "Metaphysical (形而上绘画)",
    era: "Early 20th Century",
    driver: "p5",
    description: "空旷的广场、过长的影子与静止的建筑，让时间像被卡住一样诡异。",
    prompt: "当太阳永远停在同一个角度，世界会显得安静，还是不安？",
    styleTags: ["Still", "Shadow", "Architectural"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
      };
      p.draw = () => {
        p.background(100, 150, 200); // Blue sky
        // Ground
        p.fill(200, 150, 100);
        p.rect(0, p.height * 0.6, p.width, p.height * 0.4);
        // Arch
        let sunX = p.width + Math.sin(p.frameCount * 0.01) * 500;
        let archX = p.width * 0.3;
        let archY = p.height * 0.5;
        p.fill(0, 50); // Shadow
        p.beginShape();
        p.vertex(archX, archY + 100);
        p.vertex(archX + 50, archY + 100);
        p.vertex(archX + 50 - (sunX - archX) * 0.5, p.height);
        p.vertex(archX - (sunX - archX) * 0.5, p.height);
        p.endShape();
        // Object
        p.fill(240);
        p.rect(archX, archY, 50, 100);
        p.circle(archX + 25, archY, 50);
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
