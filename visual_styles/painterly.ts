import p5 from "p5";
import { ArtStyle } from "../types";

export const painterlyStyles: ArtStyle[] = [
  {
    id: "automatism",
    name: "Automatism (自动主义)",
    era: "Surrealism",
    driver: "p5",
    description: "悬置理性控制，让潜意识引导手部运动，记录心灵的原始痕迹。",
    prompt: "如果完全放弃思考，你的手会画出什么？",
    styleTags: ["Chaos", "Fluid", "Scribble"],
    sketch: (p: p5, seed: string) => {
      // Automatism: Subconscious Scribble (Improved Version)
      let x = 0, y = 0;
      let tx = 0, ty = 1000;

      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(40, 10, 95);
        p.randomSeed(getSeedNum(seed));
        p.noiseSeed(getSeedNum(seed));
        x = p.width / 2;
        y = p.height / 2;
      };

      p.draw = () => {
        p.stroke(0, 0, 10, 80);
        p.strokeWeight(1.5);
        p.noFill();

        // Accelerated drawing
        for (let i = 0; i < 50; i++) {
          const nX = (p.noise(tx) - 0.5) * 4;
          const nY = (p.noise(ty) - 0.5) * 4;
          
          if (x + nX > 0 && x + nX < p.width && y + nY > 0 && y + nY < p.height) {
            p.line(x, y, x + nX, y + nY);
            x += nX;
            y += nY;
          } else {
            x += nX;
            y += nY;
            if (x > p.width) x = 0;
            if (x < 0) x = p.width;
            if (y > p.height) y = 0;
            if (y < 0) y = p.height;
          }
          tx += 0.01;
          ty += 0.01;
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(40, 10, 95);
        x = w / 2;
        y = h / 2;
      };
    },
  },
  {
    id: "impressionism",
    era: "Impressionism",
    name: "Impressionism (印象派)",
    driver: "p5",
    description: "通过破碎的碎点笔触和互补色的微妙并置，捕捉光线随时间流逝而产生的颤动感。",
    prompt: "你是在看风景，还是在看光本身？",
    styleTags: ["Light", "Vibrant", "Broken Strokes", "Atmosphere"],
    sketch: (p: p5, seed: string) => {
      // Impressionism: Light Atmosphere & Broken Strokes
      const getSeedNum = (s: string) => {
        let h = 0;
        for (let i = 0; i < s.length; i++)
          h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return Math.abs(h);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(200, 5, 95); // Canvas primer beige/grey
        p.noStroke();
      };

      p.draw = () => {
        p.randomSeed(getSeedNum(seed));
        const time = p.frameCount * 0.005;
        
        // Dynamic layered building
        for (let i = 0; i < 200; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          
          // Use noise to determine "Light zones" vs "Shadow zones"
          const lightNoise = p.noise(x * 0.003, y * 0.003, time);
          const colorNoise = p.noise(x * 0.005, y * 0.005, time * 0.5);
          
          let h, s, b, alpha;

          if (lightNoise > 0.6) {
             // Sunlit area (Gold/Warm White/Lilac)
             h = p.map(colorNoise, 0, 1, 35, 65); // Warm yellows to golds
             if (colorNoise > 0.8) h = 280; // Occasional lilac glints in sun
             s = p.random(30, 60);
             b = p.random(85, 100);
             alpha = p.random(2, 8); // Very thin layers
          } else if (lightNoise < 0.4) {
             // Shadow area (Deep Blue/Turquoise/Violet)
             h = p.map(colorNoise, 0, 1, 200, 260); 
             s = p.random(40, 70);
             b = p.random(30, 60);
             alpha = p.random(5, 15);
          } else {
             // Mid-tones (Greenery/Earth/Transition)
             h = p.map(colorNoise, 0, 1, 80, 160); // Greens and cyans
             s = p.random(20, 50);
             b = p.random(60, 85);
             alpha = p.random(3, 10);
          }

          // Optical mixing: Place complementaries occasionally
          if (p.random() > 0.98) {
            h = (h + 180) % 360; // Complementary spark
            s = 80;
            b = 100;
          }

          p.fill(h, s, b, alpha);

          // Classic Impressionist "Tachisme" (dab/dash)
          p.push();
          p.translate(x, y);
          // Brush angle follows the atmospheric flow (noise)
          const angle = p.noise(x * 0.01, y * 0.01) * p.TWO_PI;
          p.rotate(angle);
          
          // Vary brush shape: sometimes thin dash, sometimes small dot
          const brushW = p.random(12, 35);
          const brushH = p.random(3, 6);
          p.ellipse(0, 0, brushW, brushH);
          
          // Subtle highlight on top of brushstroke
          p.fill(h, s * 0.5, p.min(b + 20, 100), alpha * 1.5);
          p.ellipse(brushW * 0.2, -brushH * 0.2, brushW * 0.3, brushH * 0.3);
          p.pop();
        }

        // Texture overlay (simulate canvas grain)
        if (p.frameCount % 120 === 0) {
           p.fill(0, 0, 100, 1);
           p.rect(0,0, p.width, p.height);
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(200, 5, 95);
      };
    },
  },
  {
    id: "fauvism",
    name: "Fauvism (野兽派)",
    era: "Modernism",
    driver: "p5",
    description: "通过狂野、随性且高纯度的色彩，表达最直接的情感冲动。",
    prompt: "如果树是红色的，天空是绿色的，世界会更疯狂还是更快乐？",
    styleTags: ["Vibrant", "Organic", "Bold"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        p.background(45, 20, 95); // Warm background
        p.noStroke();

        // Random organic shapes with wild brush strokes
        for (let i = 0; i < 150; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const w = p.random(20, 100);
          const h = p.random(20, 60);

          // Wild colors: High Saturation
          const hue = p.random([0, 30, 100, 200, 280, 330]);
          p.fill(hue, p.random(70, 100), p.random(80, 100), 80);

          p.push();
          p.translate(x, y);
          p.rotate(p.random(p.TWO_PI));
          // Crude brush stroke
          p.beginShape();
          p.vertex(-w / 2, -h / 4);
          p.vertex(w / 2, -h / 2);
          p.vertex(w / 2 + p.random(-10, 10), h / 2);
          p.vertex(-w / 2 + p.random(-10, 10), h / 2);
          p.endShape(p.CLOSE);
          p.pop();
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.redraw();
      };
    },
  },
  {
    id: "neo_expressionism",
    era: "Neo-Expressionism",
    name: "Neo-Expressionism (新表现主义)",
    driver: "p5",
    description:
      "粗暴的笔触、扭曲的身体、带着街头涂鸦气息的符号，把情绪直接涂抹在画面上。",
    prompt: "当你无法用语言表达的时候，你会如何在画面和墙面上同时‘喊叫’？",
    styleTags: ["Figurative", "Aggressive", "Texture"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noLoop();
      };
      p.draw = () => {
        // 暖脏背景
        p.background(30, 30, 40);

        // 1. 粗糙的大色块（像墙上的底色涂抹）
        for (let i = 0; i < 40; i++) {
          const x = p.random(-50, p.width + 50);
          const y = p.random(-50, p.height + 50);
          const w = p.random(80, 260);
          const h = p.random(40, 160);
          const hue = p.random([10, 30, 200, 340]);
          p.noStroke();
          p.fill(hue, p.random(60, 100), p.random(50, 90), 70);
          p.push();
          p.translate(x, y);
          p.rotate(p.random(-0.4, 0.4));
          p.rect(0, 0, w, h);
          p.pop();
        }

        // 2. 一个扭曲的“头/面具”轮廓
        const cx = p.width * 0.5;
        const cy = p.height * 0.45;
        p.push();
        p.translate(cx, cy);
        p.rotate(p.random(-0.15, 0.15));

        // 头部底色
        p.noStroke();
        p.fill(40, 40, 80, 90);
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += 0.3) {
          const rx = 120 + p.random(-20, 30);
          const ry = 160 + p.random(-30, 40);
          const x = Math.cos(a) * rx;
          const y = Math.sin(a) * ry;
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);

        // 眼睛（不对称、暴力涂抹）
        p.fill(0, 0, 5);
        p.rect(-50, -30, 60, 25);
        p.rect(30, -45, 55, 30);
        p.fill(0, 0, 100);
        p.circle(-35, -25, 15);
        p.circle(45, -40, 18);

        // 嘴巴 / 咆哮的裂缝
        p.fill(0, 90, 80);
        p.rect(0, 40, 120, 35);
        p.stroke(0, 0, 0);
        p.strokeWeight(3);
        for (let i = -50; i <= 50; i += 15) {
          p.line(i, 25, i + p.random(-5, 5), 55);
        }

        p.pop();

        // 3. 粗野的黑线“乱写乱画”
        p.stroke(0, 0, 5, 220);
        p.strokeWeight(4);
        p.noFill();
        for (let i = 0; i < 25; i++) {
          p.beginShape();
          const steps = p.int(p.random(3, 7));
          for (let j = 0; j < steps; j++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            p.vertex(x, y);
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
    id: "lyrical_abstraction",
    era: "Post-War Abstraction",
    name: "Lyrical Abstraction (抒情抽象)",
    driver: "p5",
    description:
      "半透明的色云与奔放的线条，在没有具象的前提下，却带着音乐般的节奏和情绪波动。",
    prompt: "如果用颜色代替旋律，你此刻的情绪会是一首怎样的歌？",
    styleTags: ["Fluid", "Color Field", "Gesture"],
    sketch: (p: p5, seed: string) => {
      // Flowing Color based on user reference
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };

      p.draw = () => {
        // Background with very high transparency for trailing effect
        p.background(0, 0, 100, 5);

        let t = p.frameCount * 0.01;
        for (let i = 0; i < 3; i++) {
          let x = p.noise(t + i) * p.width;
          let y = p.noise(t + i + 10) * p.height;

          // Hue cycling
          let hue = (t * 50 + i * 100) % 360;
          p.fill(hue, 60, 80, 20); // Alpha 20/100
          p.circle(x, y, 200);
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
      };
    },
  },
  {
    id: "pointillism",
    era: "Post-Impressionism",
    name: "Pointillism (点彩派)",
    driver: "p5",
    description: "纯色的小点在视网膜上混合，形成鲜艳而颤动的光影。",
    prompt: "如果把你的人生拆解成无数个瞬间，它们能汇聚成完整的画面吗？",
    styleTags: ["Dots", "Vibrant", "Texture"],
    sketch: (p: p5, seed: string) => {
      // Seurat Simulator: Optical Color Mixing
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        p.noStroke();
      };

      p.draw = () => {
        // Draw many points per frame
        for (let i = 0; i < 200; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);

          // Image logic: A simple scene
          // Sky (Top 1/3), Grass (Bottom 2/3), Sun (Top Right)

          let targetR, targetG, targetB;

          if (y < p.height * 0.3) {
            // Sky
            targetR = 100;
            targetG = 200;
            targetB = 255;
            // Sun
            if (p.dist(x, y, p.width * 0.8, p.height * 0.1) < 80) {
              targetR = 255;
              targetG = 255;
              targetB = 0;
            }
          } else {
            // Grass
            targetR = 50;
            targetG = 150;
            targetB = 50;
            // Shadow
            if (x < p.width * 0.4) {
              targetR = 20;
              targetG = 80;
              targetB = 40;
            }
          }

          // Pointillism Trick: Don't use the exact color.
          // Use primary/secondary neighbors to create the color.
          // Randomly shift hue channel ? No, standard RGB dithering logic
          // Simple approach: Add noise to channels

          p.fill(
            targetR + p.random(-50, 50),
            targetG + p.random(-50, 50),
            targetB + p.random(-50, 50),
            200,
          );

          p.circle(x, y, p.random(3, 6));
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(255);
      };
    },
  },
  {
    id: "action_painting",
    era: "Abstract Expressionism",
    name: "Action Painting (行动绘画)",
    driver: "p5",
    description: "画布是行动的竞技场，颜料的滴洒、泼溅记录了身体的能量与爆发。",
    prompt: "你渴望精确的控制，还是渴望彻底的释放？",
    styleTags: ["Chaos", "Energy", "Texture"],
    sketch: (p: p5, seed: string) => {
      let splatters: any[] = [];
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(40, 10, 90);
      };
      p.draw = () => {
        if (p.random() > 0.9) {
          splatters.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-10, 10),
            vy: p.random(-10, 10),
            size: p.random(10, 30),
            hue: p.random(360),
            life: 20,
          });
        }

        splatters.forEach((s, i) => {
          if (s.life > 0) {
            p.noStroke();
            p.fill(s.hue, 80, 80);
            p.circle(s.x, s.y, s.size);

            s.x += s.vx;
            s.y += s.vy;
            s.size *= 0.9;
            s.life--;

            // Stringy paint look
            if (s.life < 18) {
              p.stroke(s.hue, 80, 80);
              p.strokeWeight(s.size);
              p.line(s.x, s.y, s.x - s.vx, s.y - s.vy);
            }
          } else {
            splatters.splice(i, 1);
          }
        });
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(40, 10, 90);
      };
    },
  },
];
