import p5 from "p5";
import { ArtStyle } from "../types";

export const digitalStyles: ArtStyle[] = [
  {
    id: "glitch",
    name: "Glitch (故障)",
    era: "Digital Art",
    driver: "p5",
    description: "在系统的错误和崩溃中，发现预料之外的数字美学。",
    prompt: "错误是你需要修正的瑕疵，还是天赐的灵感入口？",
    styleTags: ["Chaos", "Noise", "Geometric"],
    sketch: (p: p5, seed: string) => {
      // Improved Glitch: Data Moshing Simulation
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0);
        p.noStroke();
      };

      p.draw = () => {
        // Base content: Scrolling colorful bars
        if (p.frameCount % 5 === 0) {
          const h = p.random(p.height);
          p.fill(p.random(360), 80, 90);
          p.rect(0, h, p.width, p.random(5, 50));
        }

        // Destructive Copy / Sorting
        const sliceH = p.random(5, 60);
        const y = p.random(p.height - sliceH);

        // Sort of slit-scan / displacement
        // Instead of p.get() which is heavy, we use drawing over context
        // to simulate memory corruption

        // Horizontal shift strip
        const shift = p.random(-50, 50);
        // We can't easily capture pixels without get(), so we just draw "noise" strips
        // that look like the background shifted

        p.fill(0, 0, 0, p.random(10, 50)); // Darken
        p.rect(0, y, p.width, sliceH);

        // Add random blocks of "corrupted data"
        for (let i = 0; i < 10; i++) {
          p.fill(p.random(360), 100, 100);
          p.rect(p.random(p.width), y, p.random(10, 100), p.random(2, 5));
        }

        // Vertical tear
        if (p.frameCount % 10 === 0) {
          p.fill(0, 0, 100, 90); // White flash
          // p.rect(p.random(p.width), 0, 2, p.height);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "vaporwave",
    name: "Vaporwave (蒸汽波)",
    era: "Internet Aesthetic",
    driver: "p5",
    description: "对旧日消费主义和模拟时代的迷幻怀旧，一种对未来的失落感。",
    prompt: "你怀念的是过去本身，还是那个‘从未发生过的未来’？",
    styleTags: ["Soft", "Neon", "Fluid"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        // 紫色渐变天空
        for (let i = 0; i < p.height / 2; i++) {
          const interp = p.map(i, 0, p.height / 2, 0, 1);
          p.stroke(260 + interp * 40, 80, 40 + interp * 40);
          p.line(0, i, p.width, i);
        }

        // 落日
        p.noStroke();
        // 上半部分黄色，下半部分品红
        const sunY = p.height / 2 - 50;
        for (let y = sunY - 75; y < sunY + 75; y += 5) {
          if (y % 10 < 2) continue; // scanlines
          const dist = Math.abs(y - sunY);
          if (dist > 75) continue;
          // Width of circle at this y
          const w = Math.sqrt(75 * 75 - dist * dist) * 2;
          p.fill(50 + y * 0.1, 80, 100); // Yellow/Orange
          p.rect(p.width / 2 - w / 2, y, w, 5);
        }

        // 黑色地面 + 青色网格
        p.fill(0, 0, 0);
        p.rect(0, p.height / 2, p.width, p.height / 2);

        p.stroke(160, 100, 100); // Cyan
        p.strokeWeight(1);

        // 移动的横线
        const t = (p.frameCount % 40) * 1.5;
        for (
          let y = p.height / 2;
          y < p.height;
          y += (y - p.height / 2) * 0.1 + 5
        ) {
          const py = y + t * ((y - p.height / 2) / 100);
          if (py < p.height) p.line(0, py, p.width, py);
        }
        // 纵向透视线
        for (let x = -p.width; x <= p.width * 2; x += 100) {
          p.line(
            x,
            p.height / 2,
            (x - p.width / 2) * 2 + p.width / 2,
            p.height,
          );
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "pixelation",
    era: "Digital Era",
    name: "Pixelation (像素化)",
    driver: "p5",
    description: "图像的最小原子，当放大到极致，现实便分解为抽象的方块。",
    prompt: "当现实被拆解到底层逻辑时，它变得更清晰了，还是更陌生了？",
    styleTags: ["Geometric", "Grid", "Digital"],
    sketch: (p: p5, seed: string) => {
      const cellSize = 30;
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
      };
      p.draw = () => {
        // 不需要每帧重绘全屏，只更新部分
        const cols = Math.ceil(p.width / cellSize);
        const rows = Math.ceil(p.height / cellSize);

        for (let i = 0; i < 30; i++) {
          const cx = Math.floor(p.random(cols));
          const cy = Math.floor(p.random(rows));
          // Perlin noise for color field
          const n = p.noise(cx * 0.1, cy * 0.1, p.frameCount * 0.01);
          const hue = (n * 360 + p.frameCount * 0.5) % 360;
          p.fill(hue, 80, 90);
          p.rect(cx * cellSize, cy * cellSize, cellSize, cellSize);
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    era: "Digital Era",
    id: "topology",
    name: "Topology (拓扑点云)",
    driver: "p5",
    description: "数学的纯粹逻辑在三维空间中折叠，将维度转化为可见的几何秩序。",
    prompt: "当形式被剥离到只剩下坐标，你是否能看到算法跳动的脉搏？",
    styleTags: ["Grid", "Digital", "Geometry"],
    sketch: (p: p5, seed: string) => {
      // 3D Donut (Torus) Point Cloud
      let A = 0;
      let B = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        p.background(0);

        A += 0.02;
        B += 0.01;

        const R1 = p.height * 0.15; // inner radius
        const R2 = p.height * 0.3; // outer radius
        const K2 = 500; // distance
        const K1 = p.width * 0.8; // scale factor

        p.translate(p.width / 2, p.height / 2);

        for (let theta = 0; theta < 6.28; theta += 0.2) {
          for (let phi = 0; phi < 6.28; phi += 0.1) {
            const costheta = Math.cos(theta);
            const sintheta = Math.sin(theta);
            const cosphi = Math.cos(phi);
            const sinphi = Math.sin(phi);

            const circlex = R2 + R1 * costheta;
            const circley = R1 * sintheta;

            const x =
              circlex *
                (Math.cos(B) * cosphi + Math.sin(A) * Math.sin(B) * sinphi) -
              circley * Math.cos(A) * Math.sin(B);
            const y =
              circlex *
                (Math.sin(B) * cosphi - Math.sin(A) * Math.cos(B) * sinphi) +
              circley * Math.cos(A) * Math.cos(B);
            const z =
              K2 + Math.cos(A) * circlex * sinphi + circley * Math.sin(A);
            const ooz = 1 / z;

            const xp = x * ooz * K1;
            const yp = -y * ooz * K1;

            // Simple luminance based on simple normal
            const L =
              Math.cos(phi) * costheta * Math.sin(B) -
              Math.cos(A) * costheta * sinphi -
              Math.sin(A) * sintheta +
              Math.cos(B) *
                (Math.cos(A) * sintheta - costheta * Math.sin(A) * sinphi);

            if (L > 0) {
              p.noStroke();
              p.fill(160, 80, 100 * L, 100); // Pulse of light
              p.rect(xp, yp, 2, 2);
            }
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk (赛博朋克)",
    era: "Late 20th Century",
    driver: "p5",
    description:
      "高饱和的霓虹在雨夜中闪烁，寒冷的城市网格包裹着潮湿而脆弱的‘高科技／低生活’。",
    prompt: "当技术无处不在，人的孤独会被放大，还是被掩盖？",
    styleTags: ["Neon", "Rain", "City"],
    sketch: (p: p5, seed: string) => {
      // Improved Cyberpunk: Abstract Bio-Data Metropolis
      // Moving away from cliché neon city skylines to a dense, data-driven atmosphere

      let streams: any[] = [];
      let gridY = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0);
        initStreams();
      };

      const initStreams = () => {
        streams = [];
        // Create vertical "lanes" of data
        let laneCount = Math.floor(p.width / 40);
        for (let i = 0; i < laneCount; i++) {
          streams.push({
            x: i * (p.width / laneCount),
            w: p.random(10, 30),
            speed: p.random(5, 15),
            color: p.random([170, 200, 280, 320]), // Cyan, Blue, Purple, Pink
            active: p.random() > 0.5,
            offset: p.random(1000),
          });
        }
      };

      const drawGlitchRect = (
        x: number,
        y: number,
        w: number,
        h: number,
        hue: number,
      ) => {
        if (p.random() > 0.1) {
          p.fill(hue, 80, 100, 80);
          p.noStroke();
          p.rect(x, y, w, h);
        } else {
          // Glitch segment
          p.noFill();
          p.stroke(hue, 100, 100);
          p.strokeWeight(2);
          p.line(x, y, x + w, y + h);
          p.line(x + w, y, x, y + h);
        }
      };

      p.draw = () => {
        // Leave trails
        p.background(230, 60, 5, 20); // Deep dark blue background

        // 1. Perspective Grid (Infinite Floor)
        p.stroke(280, 80, 60, 30);
        p.strokeWeight(1);
        gridY += 2;
        if (gridY > 40) gridY = 0;

        let cy = p.height * 0.4; // Horizon high up

        // Floor lines
        for (let y = cy; y < p.height; y += 40) {
          let actualY = y + gridY;
          if (actualY < p.height) {
            p.line(0, actualY, p.width, actualY);
          }
        }
        // Vertical perspective lines
        for (let x = -p.width; x < p.width * 2; x += 100) {
          p.line(x, p.height, p.width / 2, cy);
        }

        // 2. Data Rain / Vertical Structures
        streams.forEach((s, idx) => {
          if (!s.active) return;

          // Time based vertical movement
          let y =
            ((p.frameCount * s.speed + s.offset) % (p.height + 200)) - 100;

          // Draw head
          drawGlitchRect(s.x, y, s.w, p.random(10, 40), s.color);

          // Draw trail
          for (let k = 0; k < 5; k++) {
            p.fill(s.color, 90, 100, 20 - k * 4);
            p.noStroke();
            p.rect(s.x, y - k * 20, s.w, 10);
          }

          // Occasional "text" or code blocks
          if (p.frameCount % 30 === 0 && p.random() > 0.8) {
            p.fill(0, 0, 100);
            p.rect(s.x + s.w + 5, y, 4, 4);
            p.rect(s.x + s.w + 5, y + 6, 4, 4);
          }
        });

        // 3. Volumetric Searchlight (Surveillance)
        let lx = p.width / 2 + Math.sin(p.frameCount * 0.02) * (p.width * 0.4);
        p.push();
        p.translate(lx, 0);
        p.fill(320, 100, 100, 5); // Pink searchlight
        p.triangle(0, 0, -100, p.height, 100, p.height);

        // Core of light
        p.fill(320, 0, 100);
        p.ellipse(0, 0, 20, 10);
        p.pop();

        // 4. Interface overlay (HUD)
        if (p.frameCount % 5 === 0) {
          // Scanline
          p.stroke(0, 100, 100, 50);
          let scanY = (p.frameCount * 8) % p.height;
          p.line(0, scanY, p.width, scanY);
        }

        // Random large glitch block
        if (p.random() > 0.98) {
          let gx = p.random(p.width);
          let gy = p.random(p.height);
          let gw = p.random(100, 400);
          let gh = p.random(50, 200);

          let c = p.get(gx, gy, gw, gh);
          p.image(c, gx + p.random(-20, 20), gy + p.random(-5, 5));

          p.noFill();
          p.stroke(0, 0, 100);
          p.rect(gx, gy, gw, gh);
        }
      };
      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        initStreams();
      };
    },
  },
  {
    id: "character_matrix",
    name: "Character Matrix (字符矩阵)",
    era: "Digital Era",
    driver: "p5",
    description: "万物皆可被流动的字符所转译，在单色光辉中重现数字世界的本质。",
    prompt: "如果现实是由代码构成的，你是否能看穿这层字符的表面？",
    styleTags: ["Matrix", "Grid", "Monochrome"],
    sketch: (p: p5, seed: string) => {
      // 28. ASCII Art: Character Matrix
      const chars = " .:;+=xX$";
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textFont("monospace");
        p.textSize(12);
        p.fill(120, 100, 100); // Using HSB: Green
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };
      p.draw = () => {
        p.background(0);
        p.fill(120, 100, 100); // Matrix Green
        let t = p.frameCount * 0.05;
        for (let y = 12; y < p.height; y += 12) {
          for (let x = 0; x < p.width; x += 8) {
            let n = p.noise(x * 0.01, y * 0.01, t);
            let index = Math.floor(n * chars.length);
            p.text(chars[index], x, y);
          }
        }
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "acid",
    name: "Acid (酸性)",
    era: "Y2K Revival",
    driver: "p5",
    description:
      "液态金属、扭曲的网格与高饱和度的霓虹色。一种具有腐蚀性的未来主义。",
    prompt: "在数字乌托邦融化之后，剩下的是什么形状？",
    styleTags: ["Liquid", "Chrome", "Distorted"],
    sketch: (p: p5, seed: string) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
      };

      p.draw = () => {
        p.background(0); // Deep black
        const time = p.frameCount * 0.015;

        // 1. Animated Distorted Grid Background
        p.stroke(280, 80, 80, 40); // Subtle Neon Purple
        p.strokeWeight(1);
        p.noFill();

        for (let y = -40; y < p.height + 40; y += 40) {
          p.beginShape();
          for (let x = 0; x <= p.width; x += 20) {
            // Sine wave distortion + Time
            const yOff = Math.sin(x * 0.01 + y * 0.02 + time) * 30;
            p.vertex(x, y + yOff);
          }
          p.endShape();
        }

        // 2. Liquid Metal Blob (Chrome effect) - Evolving
        p.push();
        p.translate(p.width / 2, p.height / 2);

        // Reactive to mouse
        const mx = (p.mouseX - p.width / 2) * 0.03;
        const my = (p.mouseY - p.height / 2) * 0.03;
        p.translate(mx, my);

        p.noStroke();

        const layers = 22;
        for (let i = layers; i > 0; i--) {
          const t = i / layers;
          // Chrome gradient shift
          let bri = 50;
          const tone = (t + time * 0.1) % 1;
          if (tone > 0.8) bri = 100;
          else if (tone > 0.5) bri = 10;
          else if (tone > 0.2) bri = 90;

          p.fill(0, 0, bri, 95);

          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            // Liquid blob physics simulation using noise
            const noiseFactor = p.noise(
              Math.cos(a) * 0.6 + 1,
              Math.sin(a) * 0.6 + 1,
              time + i * 0.02,
            );
            const r = 130 + noiseFactor * 160;
            const x = Math.cos(a) * r * t;
            const y = Math.sin(a) * r * t;
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }

        // 3. Acid Symbols - Rotating
        p.rotate(time * 0.5);
        p.stroke(120, 100, 100, 70); // Neon Green
        p.noFill();
        p.strokeWeight(1.5);
        p.circle(0, 0, 320 + Math.sin(time * 2) * 15);

        p.line(-180, 0, 180, 0);
        p.line(0, -180, 0, 180);

        // Dynamic glyphs
        for (let j = 0; j < 4; j++) {
          p.rotate(p.HALF_PI);
          p.rect(140, 140, 12, 12);
          if (p.frameCount % 60 < 30) {
            p.fill(120, 100, 100, 50);
            p.rect(140, 140, 6, 6);
            p.noFill();
          }
        }
        p.pop();
      };
      (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
    },
  },
  {
    id: "cyber_calligraphy",
    name: "Cyber Calligraphy (赛博书法)",
    era: "Post-Digital",
    driver: "p5",
    description:
      "用算法模拟毛笔的运势，但在数字空间中，墨迹会因代码的扰动而产生故障、偏移与几何坍塌。",
    prompt: "当传统与算法相遇，哪一部分是个性的表达，哪一部分是机器的计算？",
    styleTags: ["Calligraphy", "Glitch", "Gestural"],
    sketch: (p: p5, seed: string) => {
      // Gesture tracking with simulated brush drag and digital corruption
      let points: { x: number; y: number; w: number }[] = [];
      let targetX = p.windowWidth / 2;
      let targetY = p.windowHeight / 2;
      let x = targetX;
      let y = targetY;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 95); // White paper
      };

      p.draw = () => {
        // Continuous movement influenced by "Auto-writing"
        targetX = p.noise(p.frameCount * 0.005) * p.width;
        targetY = p.noise(p.frameCount * 0.005 + 100) * p.height;

        // Interaction
        if (p.mouseIsPressed) {
          targetX = p.mouseX;
          targetY = p.mouseY;
        }

        // Smooth follow
        x = p.lerp(x, targetX, 0.1);
        y = p.lerp(y, targetY, 0.1);

        // Brush width based on speed
        const speed = p.dist(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
        const brushW = p.map(speed, 0, 50, 20, 2, true);

        points.push({ x, y, w: brushW });
        if (points.length > 200) points.shift();

        // Render "Ink" with digital artifacts
        p.background(0, 0, 95, 10); // Fade for trail

        for (let i = 1; i < points.length; i++) {
          const pt = points[i];
          const prev = points[i - 1];

          // Core Stroke
          p.stroke(0, 0, 10, 80);
          p.strokeWeight(pt.w);
          p.line(prev.x, prev.y, pt.x, pt.y);

          // Digital Corruptions (Glitch spikes)
          if (p.random() > 0.98) {
            p.stroke(0, 100, 100, 50); // Red glitch
            p.strokeWeight(0.5);
            p.line(pt.x, pt.y, pt.x + p.random(-100, 100), pt.y);
          }

          // Occasional geometric "halos"
          if (i % 50 === 0) {
            p.noFill();
            p.stroke(0, 0, 40, 20);
            p.rectMode(p.CENTER);
            p.rect(pt.x, pt.y, 40, 40);
          }
        }
      };

      (p as any).customResize = (w: number, h: number) => {
        p.resizeCanvas(w, h);
        p.background(0, 0, 95);
        points = [];
      };
    },
  },
];
