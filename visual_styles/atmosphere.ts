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
      // Spiral Jetty Influence
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        const horizon = p.height * 0.45;
        const t = p.frameCount * 0.01;

        // Sky
        for (let y = 0; y < horizon; y += 2) {
          const k = p.map(y, 0, horizon, 0, 1);
          p.stroke(210, 30 * k, 90 - k * 20);
          p.line(0, y, p.width, y);
        }

        // Water/Earth
        p.noStroke();
        p.fill(340, 60, 40); // Pinkish salt lake water
        p.rect(0, horizon, p.width, p.height - horizon);

        // Spiral
        p.push();
        p.translate(p.width / 2, p.height * 0.75);
        // p.scale(1, 0.6); // Perspective squash

        let coils = 4;
        let points = 500;
        let radiusMax = Math.min(p.width, p.height) * 0.4;

        for (let i = 0; i < points; i++) {
          let theta = (i / points) * p.TWO_PI * coils;
          let r = (i / points) * radiusMax;

          // Animated tide?
          let tide = Math.sin(t * 5 + r * 0.05) * 5;

          let x = Math.cos(theta) * r;
          let y = Math.sin(theta) * r * 0.6; // Perspective

          // Rocks
          let rockSize = p.map(i, 0, points, 5, 20) + p.random(-2, 2);
          p.fill(20, 10, 20); // Dark rocks
          p.ellipse(x, y, rockSize, rockSize * 0.8);

          // Salt crust
          if (tide > 0) {
            p.fill(0, 0, 95, 50); // White salt foam
            p.ellipse(x + 5, y + 5, rockSize * 1.2, rockSize);
          }
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
