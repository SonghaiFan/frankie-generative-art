import p5 from "p5";
import { ArtStyle } from "../types";

export const abstractStyles: ArtStyle[] = [
  {
    id: "rhizome",
    name: "Rhizome (块茎)",
    era: "Post-Structuralism",
    driver: "p5",
    description: "去中心化网络，节点动态连接，无主根。",
    prompt: "你的思维是像树一样扎根向上，还是像草一样蔓延连接？",
    styleTags: ["Chaos", "Network", "Organic"],
    sketch: (p: p5, seed: string) => {
      // 3D-ish nodes with depth
      let nodes: {
        x: number;
        y: number;
        z: number;
        vx: number;
        vy: number;
        baseSize: number;
      }[] = [];
      const depth = 200; // Fake z-depth

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);

        // Initialize nodes with depth
        for (let i = 0; i < 90; i++) {
          nodes.push({
            x: p.random(p.width),
            y: p.random(p.height),
            z: p.random(10, depth),
            vx: p.random(-0.8, 0.8),
            vy: p.random(-0.8, 0.8),
            baseSize: p.random(2, 6),
          });
        }
      };

      p.draw = () => {
        p.background(220, 15, 10, 20); // Darker, deep blue/black background for contrast

        nodes.forEach((n, i) => {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < -50) n.x = p.width + 50;
          if (n.x > p.width + 50) n.x = -50;
          if (n.y < -50) n.y = p.height + 50;
          if (n.y > p.height + 50) n.y = -50;

          // Perspective scaling
          let scale = p.map(n.z, 0, depth, 0.5, 1.5);
          let alpha = p.map(n.z, 0, depth, 30, 90);

          p.noStroke();
          // Organic pulsing color
          let hue = (200 + p.frameCount * 0.2 + i * 2) % 360;
          p.fill(hue, 60, 80, alpha);
          p.circle(
            n.x,
            n.y,
            n.baseSize * scale * (1 + 0.3 * Math.sin(p.frameCount * 0.1)),
          );

          // Connections
          nodes.forEach((other, j) => {
            if (i !== j) {
              const d = p.dist(n.x, n.y, other.x, other.y);
              const zDist = Math.abs(n.z - other.z);

              // Only connect if close in 3D space
              if (d < 150 && zDist < 50) {
                let lineAlpha =
                  p.map(d, 0, 150, 60, 0) * p.map(zDist, 0, 50, 1, 0);
                p.stroke(hue, 40, 90, lineAlpha);
                p.strokeWeight(0.5 * scale);
                p.line(n.x, n.y, other.x, other.y);
              }
            }
          });
        });
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "mono_ha",
    name: "Mono-ha (物派)",
    era: "1960s Japan",
    driver: "p5",
    description:
      "未被加工的物质本身，以及物体与空间、物体与物体之间的依存关系。",
    prompt: "你试图控制材料，还是让材料展示它自己？",
    styleTags: ["Structure", "Raw", "Quiet"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(40, 10, 90); // 米色背景
        p.noStroke();

        // 影子 (强调物体存在)
        p.fill(0, 0, 60, 50);
        p.ellipse(p.width / 2 + 20, p.height / 2 + 120, 250, 40);

        // "石头" - 不规则多边形
        p.fill(0, 0, 30); // 深灰
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += 0.4) {
          const r = 100 + p.noise(a * 10) * 30;
          const x = p.width / 2 + Math.cos(a) * r;
          const y = p.height / 2 + 100 + Math.sin(a) * (r * 0.4);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);

        // "钢板" - 几何矩形，强行介入
        p.fill(20, 40, 40, 90); // 锈迹色
        p.push();
        p.translate(p.width / 2 - 80, p.height / 2);
        p.rotate(-0.1);
        p.rect(0, -100, 30, 250);
        p.pop();
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "chiaroscuro",
    era: "Baroque",
    name: "Chiaroscuro (明暗对照)",
    driver: "p5",
    description: "强烈的光明与黑暗对比，营造体积感与戏剧冲突。",
    prompt: "你人生剧本里，光是用来照亮舞台，还是为了加深阴影？",
    styleTags: ["Contrast", "Shadow", "Dramatic"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(0); // 纯黑

        // 光源位置移动
        const lightX = p.width / 2 + Math.cos(p.frameCount * 0.02) * 200;
        const lightY = p.height / 2 + Math.sin(p.frameCount * 0.03) * 150;

        p.noStroke();

        // 一堆隐藏的球体
        const rows = 10;
        const cols = 10;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const cx = p.map(i, 0, cols - 1, p.width * 0.2, p.width * 0.8);
            const cy = p.map(j, 0, rows - 1, p.height * 0.2, p.height * 0.8);
            const d = p.dist(lightX, lightY, cx, cy);
            const maxD = 400;

            if (d < maxD) {
              const bri = p.map(d, 0, maxD, 100, 0);
              const size = p.map(d, 0, maxD, 50, 10);
              p.fill(0, 0, 100, bri); // 白色光
              p.circle(cx, cy, size);
            }
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "Early Soviet",
    id: "constructivism",
    name: "Constructivism (构成主义)",
    driver: "p5",
    description:
      "艺术是服务于革命的工程，强调对角线、工业材料和激进的几何结构。",
    prompt: "在混乱的时代，你试图建立什么样的秩序？",
    styleTags: ["Structure", "Red", "Industrial"],
    sketch: (p: p5, seed: string) => {
      let shapes: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        // Generate Constructivist elements
        for (let i = 0; i < 15; i++) {
          shapes.push({
            x: p.random(p.width),
            y: p.random(p.height),
            w: p.random(50, 300),
            h: p.random(10, 80),
            type: p.random() > 0.7 ? "circle" : "rect", // Basic shapes
            col: p.random() > 0.6 ? 0 : p.random() > 0.5 ? 255 : 40, // 0=Red(ish), 255=Black, 40=Gray
            speed: p.random(0.5, 2) * (p.random() > 0.5 ? 1 : -1),
          });
        }
      };

      p.draw = () => {
        p.background(40, 10, 92); // Cream paper background

        // Diagonal Grid / Composition Lines
        p.stroke(0, 0, 80, 50);
        p.strokeWeight(1);
        for (let i = -p.height; i < p.width; i += 100) {
          p.line(i, p.height, i + p.height, 0); // 45 degree lines
        }

        // Animated bold elements
        p.noStroke();

        // The "Red Sun" / Dynamic Circle
        p.push();
        p.translate(p.width * 0.7, p.height * 0.4);
        // Slight scale oscillation
        const scale = 1 + Math.sin(p.frameCount * 0.02) * 0.05;
        p.scale(scale);
        p.fill(350, 80, 90, 90); // Constructivist Red
        p.circle(0, 0, 200);
        p.pop();

        // Strong black diagonal bar
        p.push();
        p.fill(0, 0, 10);
        p.translate(p.width / 2, p.height / 2);
        p.rotate(-p.PI / 4);
        p.rectMode(p.CENTER);
        // Sliding bar
        let slide = (p.frameCount * 2) % (p.width * 1.5);
        if (slide < 0) slide += p.width * 1.5;
        // p.rect(slide - p.width*0.75, 0, 400, 40);
        // Actually let's make it static but potent
        p.rect(0, 0, p.width * 1.2, 50);
        p.pop();

        // Floating geometric shards
        shapes.forEach((s, i) => {
          p.push();
          // Movement along diagonals
          s.x += s.speed;
          s.y -= s.speed; // Move up-right

          // Loop functionality
          if (s.x > p.width + 200) {
            s.x = -200;
            s.y = p.random(p.height + 200);
          }
          if (s.x < -200) {
            s.x = p.width + 200;
            s.y = p.random(p.height);
          }
          if (s.y < -200) {
            s.y = p.height + 200;
            s.x = p.random(-200, p.width);
          }

          p.translate(s.x, s.y);
          // Constructivist colors: Red, Black, Gray
          if (s.col === 0)
            p.fill(350, 90, 80, 80); // Red
          else if (s.col === 255)
            p.fill(0, 0, 10, 90); // Black
          else p.fill(0, 0, 60, 70); // Gray

          p.rotate(-p.PI / 4); // Align with diagonal theme

          if (s.type === "rect") {
            p.rect(0, 0, s.w, s.h);
          } else {
            p.circle(0, 0, s.w / 2);
          }
          p.pop();
        });
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "suprematism",
    name: "Suprematism (至上主义)",
    era: "Russian Avant-Garde",
    driver: "p5",
    description: "在这个零度世界里，只有纯粹的感受和漂浮的几何体。",
    prompt: "如果剥离了所有社会意义，艺术还剩下什么？",
    styleTags: ["Geometric", "Minimal", "Floating"],
    sketch: (p: p5, seed: string) => {
      // Improved Suprematism: Seeded, Balanced Composition, Iconic Palette
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      let shapes: any[] = [];
      const initShapes = () => {
        p.randomSeed(getSeedNum(seed));
        shapes = [];
        const count = p.floor(p.random(8, 15));

        // Ensure at least one Large Central Element (The "Black Square" or "Red Circle" feel)
        shapes.push({
          type: "rect",
          x: p.width / 2 + p.random(-100, 100),
          y: p.height / 2 + p.random(-100, 100),
          w: p.random(150, 300),
          h: p.random(150, 300),
          rot: p.random(p.QUARTER_PI),
          col: p.random() > 0.7 ? [0, 80, 80] : [0, 0, 0], // Red or Black
          phase: p.random(p.TWO_PI),
        });

        for (let i = 0; i < count; i++) {
          shapes.push({
            type: p.random(["rect", "rect", "circle", "line"]),
            x: p.random(p.width * 0.1, p.width * 0.9),
            y: p.random(p.height * 0.1, p.height * 0.9),
            w: p.random(20, 350),
            h: p.random(10, 120),
            rot: p.random(p.TWO_PI),
            col: p.random([
              [0, 0, 0],
              [0, 85, 85],
              [45, 90, 95],
              [210, 80, 50],
            ]), // Black, Red, Yellow, Blue
            phase: p.random(p.TWO_PI),
          });
        }
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.rectMode(p.CENTER);
        initShapes();
      };

      p.draw = () => {
        p.background(0, 0, 95); // Off-white/Gallery white

        shapes.forEach((s) => {
          p.push();
          // Subtle floating movement
          let driftY = Math.sin(p.frameCount * 0.015 + s.phase) * 15;
          p.translate(s.x, s.y + driftY);
          p.rotate(s.rot);

          p.noStroke();
          p.fill(s.col[0], s.col[1], s.col[2]);

          if (s.type === "rect") {
            p.rect(0, 0, s.w, s.h);
          } else if (s.type === "circle") {
            p.ellipse(0, 0, s.w, s.w);
          } else if (s.type === "line") {
            p.rect(0, 0, s.w, 4);
          }
          p.pop();
        });
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        initShapes();
      };
    },
  },
  {
    id: "installation_art",
    name: "Installation Art (装置艺术)",
    era: "Contemporary",
    driver: "p5",
    description:
      "在绝对的黑暗中，光成为了唯一的实体。通过几何的切割与空间的留白，观众在纯净的体验中重构自我。",
    prompt: "如果空间可以被‘切割’，剩下的虚无是否也是一种物质？",
    styleTags: ["Minimalist", "Spatial", "Light", "Monolithic"],
    sketch: (p: p5, seed: string) => {
      // Minimalist Installation: Spatial Light & Void
      let lightPhase = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        p.background(0); // The Void

        const cx = p.width / 2;
        const cy = p.height / 2;
        const mx = p.mouseX / p.width; // Normalized mouse X

        // 1. Perspective Room (Defining the gallery space)
        p.stroke(0, 0, 15); // Very subtle dark grey lines
        p.strokeWeight(1);
        p.noFill();

        // Floor/Ceiling converging lines
        p.line(0, 0, p.width * 0.2, p.height * 0.2);
        p.line(p.width, 0, p.width * 0.8, p.height * 0.2);
        p.line(0, p.height, p.width * 0.2, p.height * 0.8);
        p.line(p.width, p.height, p.width * 0.8, p.height * 0.8);

        // Inner wall rectangle
        p.rectMode(p.CENTER);
        p.rect(cx, cy, p.width * 0.6, p.height * 0.6);

        // 2. The Monolith: A central vertical slice of light
        lightPhase += 0.01;
        const pulse = Math.sin(lightPhase) * 10 + 25; // Subtle breathing
        const hoverGlow = p.map(
          p.dist(p.mouseX, p.mouseY, cx, cy),
          0,
          400,
          40,
          0,
          true,
        );

        p.noStroke();
        // Inner Glow (Heart of the monolith)
        p.fill(190, 80, pulse + 60 + hoverGlow, 80);
        p.rect(cx, cy, p.width * 0.05, p.height * 0.5);

        // Outer blurring glow (Aura)
        for (let i = 1; i < 10; i++) {
          p.fill(190, 80, 50, 5 / i);
          p.rect(cx, cy, p.width * 0.05 + i * 15, p.height * 0.5 + i * 5);
        }

        // 3. Laser Intersections: Minimalism cutting the void
        p.strokeWeight(1.5);
        // Vertical sharp beam reacting to mouse
        p.stroke(190, 40, 100, 60);
        const lX = p.lerp(cx - 100, cx + 100, mx);
        p.line(lX, 0, lX, p.height);

        // Horizontal baseline (Horizon/Floor edge)
        p.stroke(0, 0, 40, 30);
        p.line(0, p.height * 0.8, p.width, p.height * 0.8);

        // 4. Atmosphere: Subtle "floating dust" in the light beam
        p.randomSeed(42); // Stable dust positions
        for (let i = 0; i < 35; i++) {
          let px = p.random(cx - 150, cx + 150);
          let py = p.random(cy - 250, cy + 250);

          // Subtle upward drift
          let offsetY = ((p.frameCount * 0.2 + p.random(1000)) % 500) - 250;
          let finalPy = cy + offsetY;

          let distFromCenter = Math.abs(px - cx);
          let dAlpha = p.map(distFromCenter, 0, 150, 50, 0);

          p.fill(0, 0, 100, dAlpha);
          p.noStroke();
          p.circle(px, finalPy, 1.2);
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
];
