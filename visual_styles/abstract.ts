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
      let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        for (let i = 0; i < 70; i++) {
          nodes.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
          });
        }
      };
      p.draw = () => {
        p.background(0, 0, 98, 15); // 稍微更明显的拖尾

        nodes.forEach((n, i) => {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > p.width) n.vx *= -1;
          if (n.y < 0 || n.y > p.height) n.vy *= -1;

          p.noStroke();
          p.fill(0, 0, 20, 50);
          p.circle(n.x, n.y, 4);

          // Connect
          nodes.forEach((other, j) => {
            if (i !== j) {
              const d = p.dist(n.x, n.y, other.x, other.y);
              if (d < 120) {
                p.stroke(0, 0, 20, p.map(d, 0, 120, 40, 0));
                p.strokeWeight(0.5);
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
        // 生成一些固定的几何元件
        for (let i = 0; i < 10; i++) {
          shapes.push({
            x: p.random(p.width),
            y: p.random(p.height),
            w: p.random(50, 200),
            h: p.random(10, 50),
            rot: p.random(p.PI),
            col: p.random() > 0.5 ? 0 : 255,
          });
        }
      };
      p.draw = () => {
        p.background(40, 10, 95); // 米白色纸张

        // 对角线动态，象征“进取”
        const t = p.frameCount * 0.01;

        // 背景巨大的红色圆形 (象征革命太阳)
        p.noStroke();
        p.fill(0, 90, 90);
        const sunSize = Math.min(p.width, p.height) * 0.6;
        p.circle(p.width * 0.7, p.height * 0.3, sunSize);

        // 叠加黑色结构
        p.stroke(0, 0, 10);
        p.strokeWeight(2);
        p.line(0, p.height, p.width, 0); // 强对角线

        shapes.forEach((s, i) => {
          p.push();
          p.translate(s.x, s.y);
          p.rotate(s.rot + t * (i % 2 === 0 ? 0.05 : -0.05));
          p.fill(s.col);
          p.noStroke();
          p.rect(0, 0, s.w, s.h);
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
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        p.background(0, 0, 96); // White-ish
        p.noStroke();

        // The composition usually has a diagonal or floating tension
        const numShapes = Math.floor(p.random(3, 10)); // Very few shapes

        for (let i = 0; i < numShapes; i++) {
          p.push();
          p.translate(p.random(p.width), p.random(p.height));
          p.rotate(p.random(p.TWO_PI));

          const r = p.random();
          // Colors: Mostly Black, Red
          if (r < 0.6)
            p.fill(0, 0, 10); // Black
          else if (r < 0.9)
            p.fill(0, 90, 80); // Red
          else p.fill(220, 80, 80); // Blue sometimes

          if (p.random() > 0.3) {
            // Rectangle
            p.rect(0, 0, p.random(50, 300), p.random(20, 100));
          } else {
            // Circle
            p.circle(0, 0, p.random(50, 200));
          }
          p.pop();
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
];
