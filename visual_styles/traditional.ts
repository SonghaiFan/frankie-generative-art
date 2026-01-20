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
      let drops: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
      };
      p.draw = () => {
        p.background(240, 20); // paper
        if (p.frameCount % 20 === 0) {
          drops.push({ x: p.random(p.width), y: p.random(p.height), r: 0 });
        }
        p.noStroke();
        p.fill(0, 20);
        drops.forEach((d) => {
          d.r += 0.5;
          if (d.r < 100) p.circle(d.x, d.y, d.r);
        });
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
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
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noFill();
      };
      p.draw = () => {
        p.background(30, 40, 80, 0.1);
        const t = p.frameCount * 0.02;
        const colors = [160, 10, 30];
        colors.forEach((hue, i) => {
          p.stroke(hue, 60, 60);
          p.beginShape();
          for (let x = 0; x < p.width; x += 20) {
            p.vertex(x, p.height / 2 + Math.sin(x * 0.01 + t + i) * 100);
          }
          p.endShape();
        });
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
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
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.stroke(20, 50, 150);
        p.noFill();
      };
      p.draw = () => {
        p.background(245);
        p.translate(p.width / 2, p.height / 2);
        p.rotate(p.frameCount * 0.005);
        for (let r = 50; r < 300; r += 30) {
          p.strokeWeight(r / 50);
          p.circle(0, 0, r * 2);
          const dots = Math.floor(r / 5);
          for (let i = 0; i < dots; i++) {
            p.point(r * Math.cos(i), r * Math.sin(i));
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
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
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
      };
      p.draw = () => {
        p.background(30, 10, 10);
        const t = p.frameCount * 0.05;
        const cx = p.width / 2;
        const cy = p.height / 2;
        for (let r = 20; r < 300; r += 20) {
          const dots = Math.floor(r * 0.5);
          const hue = (p.frameCount + r) % 255;
          p.fill(hue, 100, 200);
          const offset = r % 40 === 0 ? t : -t;
          for (let i = 0; i < dots; i++) {
            const a = (i / dots) * p.TWO_PI + offset;
            p.circle(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5);
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
];
