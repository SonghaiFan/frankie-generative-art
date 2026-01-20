import p5 from "p5";

// --- 3. P5.JS VISUAL STYLES (UNIQUE PER CARD ID) ---

export const VISUAL_STYLES: Record<string, (p: p5, seed: string) => void> = {
  // 1. Rhizome (块茎): 去中心化网络，节点动态连接，无主根。
  static_1: (p, seed) => {
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      for (let i = 0; i < 70; i++) {
        nodes.push({
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(-0.7, 0.7),
          vy: p.random(-0.7, 0.7),
        });
      }
    };
    p.draw = () => {
      p.background(0, 0, 98, 15); // 稍微更明显的拖尾

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;

        // 边界穿墙 (Rhizome 是蔓延的)
        if (n.x < 0) n.x = p.width;
        if (n.x > p.width) n.x = 0;
        if (n.y < 0) n.y = p.height;
        if (n.y > p.height) n.y = 0;

        // 连接
        let connectionCount = 0;
        nodes.forEach((other, j) => {
          if (i !== j) {
            const d = p.dist(n.x, n.y, other.x, other.y);
            if (d < 130) {
              p.strokeWeight(p.map(d, 0, 130, 1.5, 0));
              p.stroke(160, 20, 60, 20); // 墨绿色/灰色
              p.line(n.x, n.y, other.x, other.y);
              connectionCount++;
            }
          }
        });

        // 节点大小随连接数变化 (活跃度)
        p.noStroke();
        p.fill(160, 40, 60, 60);
        p.circle(n.x, n.y, 2 + connectionCount * 0.5);
      });
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 2. Sfumato (晕涂法): 烟雾般的层次，无边线，柔和的色彩过渡。
  static_2: (p, seed) => {
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
        const size = 150 + p.noise(t * 2 + i) * 300;

        // 蒙娜丽莎式的褐色/琥珀色调
        p.fill(30 + i * 10, 40, 50, 2);
        p.circle(x, y, size);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 3. Glitch (故障): 随机矩形，切片位移，颜色分离。
  static_3: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(0);
    };
    p.draw = () => {
      // 偶尔重置背景，制造闪烁感
      if (p.frameCount % 40 === 0) p.background(0, 0, 0, 20);

      const x = p.random(p.width);
      const y = p.random(p.height);
      const w = p.random(50, 300);
      const h = p.random(2, 20);

      p.noStroke();

      // RGB 分离效果 (模拟色差)
      if (p.random() > 0.5) {
        p.fill(0, 100, 100, 80); // Red
        p.rect(x + 5, y, w, h);
        p.fill(180, 100, 100, 80); // Cyan
        p.rect(x - 5, y, w, h);
      }
      p.fill(0, 0, 100);
      p.rect(x, y, w, h);

      // 画面切片错位
      if (p.random() > 0.8) {
        const sliceY = p.random(p.height);
        const sliceH = p.random(20, 100);
        const shift = p.random(-30, 30);
        const slice = p.get(0, sliceY, p.width, sliceH);
        p.set(shift, sliceY, slice);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 4. Ma (间): 极简主义，巨大的留白，单一的呼吸点。
  static_4: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
    };
    p.draw = () => {
      p.background(0, 0, 96); // 纸一样的白色
      p.noStroke();

      // 右下角一个缓慢变化的圆，代表存在的微弱
      const t = p.frameCount * 0.02;
      const size = 60 + Math.sin(t) * 10;
      const alpha = 50 + Math.sin(t) * 40;

      p.fill(0, 0, 20, alpha); // 深灰墨色
      p.circle(p.width * 0.75, p.height * 0.75, size);

      // 一条极细的线分割空间
      p.stroke(0, 0, 80);
      p.strokeWeight(0.5);
      p.line(p.width * 0.3, p.height * 0.1, p.width * 0.3, p.height * 0.9);
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 5. Ready-made (现成品): 工业化，重复的机械形状，冷漠。
  static_5: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
    };
    p.draw = () => {
      p.background(200, 5, 80); // 工业蓝灰
      p.noFill();
      p.stroke(0, 0, 20);
      p.strokeWeight(1.5);

      const cols = 6;
      const rows = 8;
      const w = p.width / cols;
      const h = p.height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          p.push();
          p.translate(i * w + w / 2, j * h + h / 2);
          // 每一个都在旋转，像流水线
          p.rotate(p.frameCount * 0.02 + (i + j) * 0.5);
          p.rectMode(p.CENTER);
          p.rect(0, 0, w * 0.5, w * 0.5); // 简单的方框
          p.line(0, -w * 0.25, 0, w * 0.25);
          p.pop();
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 6. Mono-ha (物派): 原始材料（石头、金属、纸），重力与平衡。
  static_6: (p, seed) => {
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
        const r = 100 + p.noise(a * 5, 100) * 40;
        p.vertex(
          p.width / 2 + Math.cos(a) * r,
          p.height / 2 + Math.sin(a) * r + 50,
        );
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

  // 7. Camp (坎普): 夸张，高饱和，闪耀，俗丽。
  static_7: (p, seed) => {
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
        let angle = (p.TWO_PI * i) / 5;
        let halfAngle = angle + p.TWO_PI / 10;
        p.vertex(Math.cos(angle) * 50, Math.sin(angle) * 50);
        p.vertex(Math.cos(halfAngle) * 20, Math.sin(halfAngle) * 20);
      }
      p.endShape(p.CLOSE);
      p.pop();

      // 随机彩屑
      if (p.random() > 0.5) {
        p.fill(p.random(360), 100, 100);
        p.rect(p.random(p.width), p.random(p.height), 8, 8);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 8. Sublime (崇高): 压倒性的自然力量，风暴，黑暗中的光。（改进版）
  static_8: (p, seed) => {
    let t = 0;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noStroke();
      t = p.random(1000);
    };
    p.draw = () => {
      t += 0.003;
      p.background(220, 30, 5);
      const horizonY = p.height * 0.85;
      const step = 8;

      // 绘制天空
      for (let y = 0; y < horizonY; y += step) {
        for (let x = 0; x < p.width; x += step) {
          const nScale = 0.003;
          let nVal = p.noise(x * nScale, y * nScale, t);
          const distFromCenterTop = p.dist(x, y, p.width / 2, 0);
          const maxDist = p.sqrt(
            (p.width / 2) * (p.width / 2) + p.height * p.height,
          );
          const normDist = distFromCenterTop / maxDist;

          let brightness;
          if (normDist < 0.3) {
            brightness = p.map(
              Math.pow(nVal, 1.5),
              0,
              1,
              30,
              95 * (1 - normDist * 2),
            );
          } else {
            brightness = p.map(nVal, 0, 1, 5, 35);
          }
          const hue = p.map(nVal, 0, 1, 210, 240);
          const saturation = p.map(brightness, 0, 100, 60, 10);
          p.fill(hue, saturation, brightness, 80);
          p.circle(x, y, step * 1.5);
        }
      }
      // 绘制渺小的大地
      p.fill(0, 0, 0);
      p.beginShape();
      p.vertex(0, p.height);
      for (let x = 0; x <= p.width; x += 20) {
        const landHeight = p.noise(x * 0.01, 500) * (p.height * 0.15);
        p.vertex(x, horizonY - landHeight);
      }
      p.vertex(p.width, p.height);
      p.endShape(p.CLOSE);
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.background(220, 30, 5);
    };
  },

  // 9. Automatism (自动主义): 潜意识涂鸦，快速，无修正。（改进版）
  static_9: (p, seed) => {
    let x = 0,
      y = 0;
    let tx = 0,
      ty = 0;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(40, 10, 95);
      x = p.width / 2;
      y = p.height / 2;
      tx = 0;
      ty = 1000;
    };
    p.draw = () => {
      p.stroke(0, 0, 10, 80);
      p.strokeWeight(1.5);
      p.noFill();
      // 加速绘制
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

  // 10. Bauhaus (包豪斯): 原色（红黄蓝），几何，结构主义。
  static_10: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.rectMode(p.CENTER);
    };
    p.draw = () => {
      p.background(0, 0, 92);

      // 绘制网格背景
      p.stroke(0, 0, 80);
      p.strokeWeight(1);
      for (let i = 0; i < p.width; i += 50) p.line(i, 0, i, p.height);
      for (let j = 0; j < p.height; j += 50) p.line(0, j, p.width, j);

      const t = p.frameCount * 0.01;
      p.noStroke();

      // 黑色横杠
      p.fill(0, 0, 10);
      p.rect(p.width / 2, p.height / 2, p.width * 0.8, 10);

      // 红色正方形
      p.push();
      p.translate(p.width * 0.3, p.height * 0.5 + Math.sin(t) * 20);
      p.fill(350, 90, 90, 90);
      p.rect(0, 0, 100, 100);
      p.pop();

      // 蓝色圆形
      p.push();
      p.translate(p.width * 0.7, p.height * 0.5 + Math.cos(t) * 20);
      p.fill(220, 90, 90, 90);
      p.circle(0, 0, 100);
      p.pop();

      // 黄色三角形
      p.push();
      p.translate(p.width * 0.5, p.height * 0.5 - 100);
      p.rotate(t * 0.5);
      p.fill(50, 100, 100, 90);
      p.triangle(0, -60, -60, 60, 60, 60);
      p.pop();
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 11. Wabi-Sabi (侘寂): 不完美的圆，大地色，枯萎感。
  static_11: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.frameRate(12); // 低帧率
    };
    p.draw = () => {
      p.background(35, 10, 85, 30); // 泛黄的纸张感
      p.noFill();

      // 枯墨般的笔触
      p.stroke(30, 20, 20, 60);
      p.strokeWeight(2);

      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += 0.1) {
        // 极大的随机抖动，不像电脑画的圆
        const r = 160 + p.random(-10, 10);
        const ox = p.width / 2 + Math.cos(a) * r;
        const oy = p.height / 2 + Math.sin(a) * r;
        // 断断续续的线条
        if (p.random() > 0.15) p.vertex(ox, oy);
      }
      p.endShape();

      // 噪点纹理
      for (let i = 0; i < 100; i++) {
        p.stroke(0, 0, 0, 20);
        p.point(p.random(p.width), p.random(p.height));
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 12. Negative Space (负空间): 通过周围的粒子反衬出中心的形状。
  static_12: (p, seed) => {
    let particles: any[] = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      for (let i = 0; i < 150; i++)
        particles.push({ x: p.random(p.width), y: p.random(p.height) });
    };
    p.draw = () => {
      p.background(220, 60, 30); // 深蓝背景
      p.noStroke();
      p.fill(220, 10, 95); // 亮白粒子

      const cx = p.width / 2;
      const cy = p.height / 2;

      particles.forEach((pt) => {
        pt.x += p.random(-2, 2);
        pt.y += p.random(-2, 2);

        // 核心逻辑：粒子不能进入中心圆区域
        const d = p.dist(pt.x, pt.y, cx, cy);
        const radius = 120;

        if (d < radius) {
          const angle = Math.atan2(pt.y - cy, pt.x - cx);
          pt.x = cx + Math.cos(angle) * (radius + 5);
          pt.y = cy + Math.sin(angle) * (radius + 5);
        }

        // 边界检查
        if (pt.x < 0) pt.x = p.width;
        if (pt.x > p.width) pt.x = 0;

        p.circle(pt.x, pt.y, 6);
      });
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 13. Impasto (厚涂法)
  static_13: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
    };
    p.draw = () => {
      p.background(30, 10, 90);
      for (let i = 0; i < 80; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        p.strokeWeight(p.random(20, 50));
        p.stroke(p.random(360), 60, 70, 80);
        p.line(x, y, x + p.random(-60, 60), y + p.random(-60, 60));
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },

  // 14. Brutalism (粗野主义): 混凝土块，纪念碑式，无装饰。
  static_14: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
    };
    p.draw = () => {
      p.background(0, 0, 90);
      p.noStroke();

      // 简单的灰度色块，模拟混凝土建筑
      const t = p.frameCount * 0.01;

      p.fill(0, 0, 40); // 深灰
      p.rect(p.width * 0.2, p.height * 0.2, p.width * 0.1, p.height * 0.6);

      p.fill(0, 0, 60); // 中灰

      // 悬臂结构
      const overhang = Math.sin(t) * 20;
      p.rect(
        p.width * 0.15,
        p.height * 0.3 + overhang,
        p.width * 0.4,
        p.height * 0.1,
      );

      p.fill(0, 0, 30); // 更深
      p.rect(p.width * 0.6, p.height * 0.4, p.width * 0.2, p.height * 0.4);

      // 粗糙的纹理线
      p.stroke(0, 0, 20, 20);
      p.strokeWeight(1);
      for (let i = 0; i < p.width; i += 10) {
        if (p.random() > 0.5) p.line(i, 0, i, p.height);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 15. Vaporwave (蒸汽波): 霓虹网格，落日，数字怀旧。
  static_15: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
    };
    p.draw = () => {
      // 紫色渐变天空
      for (let i = 0; i < p.height / 2; i++) {
        p.stroke(270, 60, p.map(i, 0, p.height / 2, 20, 100));
        p.line(0, i, p.width, i);
      }

      // 落日
      p.noStroke();
      // 上半部分黄色，下半部分品红
      const sunY = p.height / 2 - 50;
      for (let y = sunY - 75; y < sunY + 75; y += 5) {
        p.fill(p.map(y, sunY - 75, sunY + 75, 60, 320), 80, 100);
        // 简单的切割效果
        if (y % 10 < 5) {
          const w = Math.sqrt(75 * 75 - (y - sunY) * (y - sunY)) * 2;
          p.rect(p.width / 2 - w / 2, y, w, 4);
        }
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
        p.line(x, p.height, p.width / 2, p.height / 2);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 16. Gestalt (完形): 混乱的点阵，通过运动暗示出正方形轮廓。
  static_16: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
    };
    p.draw = () => {
      p.background(0, 0, 10);
      p.fill(0, 0, 100);
      p.noStroke();

      // 每2秒对齐一次
      const phase = (Math.sin(p.frameCount * 0.03) + 1) / 2; // 0 -> 1 -> 0
      const isAligned = phase > 0.8;

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          // 目标网格位置
          let tx = p.map(i, 0, 15, p.width / 2 - 150, p.width / 2 + 150);
          let ty = p.map(j, 0, 15, p.height / 2 - 150, p.height / 2 + 150);

          // 噪点偏移
          let nx = p.noise(i, j, p.frameCount * 0.01) * 300 - 150;
          let ny = p.noise(i + 100, j + 100, p.frameCount * 0.01) * 300 - 150;

          // 在对齐和混乱之间插值
          let x = tx + nx * (1 - Math.pow(phase, 4));
          let y = ty + ny * (1 - Math.pow(phase, 4));

          p.circle(x, y, 6);
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 17. Chiaroscuro (明暗对照): 纯黑背景，光探照出的几何体。
  static_17: (p, seed) => {
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
          const x = i * (p.width / cols) + 50;
          const y = j * (p.height / rows) + 50;

          const d = p.dist(x, y, lightX, lightY);
          const maxDist = 250;

          if (d < maxDist) {
            // 距离越近越亮，模拟衰减
            const bri = p.map(d, 0, maxDist, 100, 0);
            // 根据光的方向偏移高光点，制造体积感
            const angle = Math.atan2(y - lightY, x - lightX);

            // 阴影面
            p.fill(30, 40, bri * 0.3);
            p.circle(x, y, 40);

            // 受光面
            p.fill(30, 20, bri);
            p.circle(x - Math.cos(angle) * 10, y - Math.sin(angle) * 10, 25);
          }
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 18. Appropriation (挪用): 波普艺术，四色面板，复制粘贴。
  static_18: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noStroke();
    };
    p.draw = () => {
      const w = p.width / 2;
      const h = p.height / 2;
      const colors = [
        [320, 90, 90], // Hot Pink
        [190, 90, 90], // Cyan
        [50, 90, 100], // Yellow
        [100, 80, 80], // Green
      ];

      // 绘制四个面板
      [0, 1, 2, 3].forEach((i) => {
        const cx = (i % 2) * w;
        const cy = Math.floor(i / 2) * h;
        const bg = colors[i];
        const fg = colors[(i + 1) % 4]; // 错位颜色

        p.fill(bg[0], bg[1], bg[2]);
        p.rect(cx, cy, w, h);

        // 绘制“被挪用”的图标（一个简单的罐头形状）
        p.push();
        p.translate(cx + w / 2, cy + h / 2);

        // 简单的丝网印刷错位效果
        const shiftX = Math.sin(p.frameCount * 0.05 + i) * 5;
        const shiftY = Math.cos(p.frameCount * 0.05 + i) * 5;

        p.fill(0, 0, 10); // 黑色轮廓底层
        p.rect(shiftX, shiftY, 60, 90, 10);

        p.fill(fg[0], fg[1], fg[2]); // 亮色顶层
        p.rect(0, 0, 60, 90, 10);

        p.pop();
      });
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 19. Fluxus (激浪派): 文本指令，生活即艺术，无聊与偶发。
  static_19: (p, seed) => {
    const words = ["BREATHE", "WALK", "LISTEN", "DROP", "NOTHING", "REPEAT"];
    let currentWord = "FLUX";
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.textSize(40);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont("Courier New"); // 打印机字体
    };
    p.draw = () => {
      p.background(0, 0, 100, 10); // 缓慢淡出

      if (p.frameCount % 120 === 0) {
        currentWord = p.random(words);
        // 随机位置盖章
        p.fill(0);
        p.text(currentWord, p.random(p.width), p.random(p.height));
      }

      // 偶尔画一条无意义的线
      if (p.random() > 0.98) {
        p.stroke(0);
        p.strokeWeight(1);
        p.line(p.random(p.width), 0, p.random(p.width), p.height);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 20. Pixelation (像素化): 分解现实，马赛克，数字原子。
  static_20: (p, seed) => {
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
        const c = Math.floor(p.random(cols));
        const r = Math.floor(p.random(rows));

        // 基于位置的色彩，形成某种潜在的图像
        // 例如：对角线渐变
        const baseHue = (c + r) * 5 + p.frameCount * 0.5;
        const sat = 80;

        p.fill(baseHue % 360, sat, 90);
        p.rect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 21. Pointillism
  static_21: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.background(255);
    };
    p.draw = () => {
      for (let i = 0; i < 50; i++) {
        p.fill(p.random(255), p.random(255), 0, 100);
        p.circle(p.random(p.width), p.random(p.height), p.random(2, 6));
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 22. Op Art
  static_22: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(0);
      p.stroke(255);
      p.noFill();
    };
    p.draw = () => {
      p.background(0);
      for (let i = 0; i < p.width; i += 20) {
        p.line(
          i + Math.sin(p.frameCount * 0.05 + i * 0.01) * 50,
          0,
          i + Math.sin(p.frameCount * 0.05 + i * 0.01) * 50,
          p.height,
        );
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 23. Constructivism (构成主义): 工业、革命、红黑白几何。
  static_23: (p, seed) => {
    let shapes: any[] = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      // 生成一些固定的几何元件
      for (let i = 0; i < 10; i++) {
        shapes.push({
          type: p.random(["rect", "circle", "line"]),
          x: p.random(p.width),
          y: p.random(p.height),
          w: p.random(50, 400),
          h: p.random(10, 50),
          angle: p.random([0, p.PI / 4, -p.PI / 4]), // 只有特定角度
          col: p.random() > 0.6 ? [0, 90, 80] : [0, 0, 10], // 红 or 黑
          speed: p.random(0.2, 0.8),
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
        // 机械式运动
        if (i % 2 === 0) p.translate(Math.sin(t * s.speed) * 20, 0);
        else p.translate(0, Math.cos(t * s.speed) * 20);

        p.rotate(s.angle);
        p.noStroke();
        p.fill(s.col[0], s.col[1], s.col[2], 90);

        if (s.type === "rect") {
          p.rect(0, 0, s.w, s.h);
        } else if (s.type === "circle") {
          p.circle(0, 0, s.w / 2);
        } else {
          p.stroke(s.col[0], s.col[1], s.col[2]);
          p.strokeWeight(8);
          p.line(-s.w / 2, 0, s.w / 2, 0);
        }
        p.pop();
      });
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
    };
  },

  // 24. Ukiyo-e (浮世绘): 波浪，色彩平涂，渐变。
  static_24: (p: any, seed: string) => {
    // Ukiyo-e (浮世绘) - Hokusai Style: Gradient Sky, Mt. Fuji, Stylized Clouds
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
    };

    p.draw = () => {
      // 1. Sky Gradient (Bokashi)
      // Transition from Indigo (Top) to Pale Yellow (Bottom)
      for (let y = 0; y < p.height; y++) {
        const inter = p.map(y, 0, p.height * 0.7, 0, 1);
        const c1 = p.color(220, 80, 40); // Prussian Blue
        const c2 = p.color(40, 10, 95); // Warm Paper
        const c = p.lerpColor(c1, c2, p.constrain(inter, 0, 1));
        p.stroke(c);
        p.line(0, y, p.width, y);
      }

      const numSeed = parseInt(seed) || Math.floor(p.random(10000));
      p.randomSeed(numSeed);

      // 2. The Red Sun (Kami of the Sun)
      const sunX = p.width * 0.8;
      const sunY = p.height * 0.25;
      const sunSize = p.min(p.width, p.height) * 0.25;
      p.noStroke();
      p.fill(0, 85, 90); // Vermilion Red
      p.circle(sunX, sunY, sunSize);

      // 3. Mount Fuji (or Distant Mountain)
      // Classic Blue Triangle with Snow Cap
      const mx = p.width * 0.5;
      const my = p.height * 0.65;
      const mw = p.width * 0.6;
      const mh = p.height * 0.4;

      p.noStroke();
      // Mountain Body
      p.fill(210, 60, 50); // Indigo
      p.beginShape();
      p.vertex(0, p.height); // far left base
      // Curve up
      p.vertex(mx - mw / 2, p.height);
      // Peak slope left
      p.quadraticVertex(mx - mw * 0.1, my + mh * 0.5, mx, my);
      // Peak slope right
      p.quadraticVertex(mx + mw * 0.1, my + mh * 0.5, mx + mw / 2, p.height);
      p.vertex(p.width, p.height);
      p.vertex(0, p.height);
      p.endShape(p.CLOSE);

      // Snow Cap
      p.fill(240, 5, 98); // White-ish
      p.beginShape();
      p.vertex(mx, my); // Tip
      // Jiggly snow line
      p.vertex(mx + 20, my + 40);
      p.vertex(mx + 10, my + 35);
      p.vertex(mx - 5, my + 45);
      p.vertex(mx - 15, my + 35);
      p.vertex(mx - 25, my + 45);
      p.endShape(p.CLOSE);

      // 4. Texture/Grain (Washi Paper)
      p.loadPixels();
      for (let i = 0; i < p.width * p.height * 4; i += 4) {
        if (p.random() > 0.8) {
          // Subtle noise
          p.pixels[i] -= 10;
          p.pixels[i + 1] -= 10;
          p.pixels[i + 2] -= 10;
        }
      }
      p.updatePixels();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },

  // 25. Light and Space (光与空间): 极简，渐变，感知的边界。
  static_25: (p, seed) => {
    // Light and Space (光与空间) - James Turrell style "Skyspace" or "Ganzfeld"
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noStroke();
    };
    p.draw = () => {
      // 1. Base Environment: Deep Blue Monochromatic Room
      // Hue around 220 (Deep Blue)
      const baseHue = 220;
      const t = p.frameCount * 0.01;

      // Subtle pulse in the room atmosphere
      const roomBright = 30 + Math.sin(t) * 5;

      // Gradient Background (Floor to Ceiling) to give slight perspective cue
      for (let y = 0; y <= p.height; y += 5) {
        const depth = p.map(y, 0, p.height, 0, 1);
        // Top is darker (ceiling/distance), Bottom is slightly lighter (floor)
        // Actually in Turrell rooms, corners disappear. Let's do a radial fog.
        const distFromCenter = p.dist(
          p.width / 2,
          p.height / 2,
          p.width / 2,
          y,
        );
        const b = roomBright - (distFromCenter / p.height) * 10;
        p.fill(baseHue, 90, b);
        p.rect(0, y, p.width, 5);
      }

      // 2. The Apertures (The "Windows" of pure light)
      // Composition: Two large vertical rectangles, side by side.
      const apertureW = p.width * 0.25;
      const apertureH = p.height * 0.6;
      const gap = p.width * 0.1;
      const yPos = (p.height - apertureH) / 2;

      const leftX = (p.width - (apertureW * 2 + gap)) / 2;
      const rightX = leftX + apertureW + gap;

      // Glow/Diffusion effect
      // We draw larger, low-alpha rectangles behind the main ones to create the "fuzziness" of light bleeding
      const glowLayers = 40;
      const glowDist = 80;

      // Light Color: Cyan/Light Blue, much brighter
      const lightHue = 210;

      for (let i = glowLayers; i > 0; i--) {
        const spread = p.map(i, 0, glowLayers, 0, glowDist);
        const alpha = p.map(i, 0, glowLayers, 5, 0); // Very transparent at edges

        p.fill(lightHue, 60, 100, alpha);

        // Left Glow
        p.rect(
          leftX - spread,
          yPos - spread,
          apertureW + spread * 2,
          apertureH + spread * 2,
        );
        // Right Glow
        p.rect(
          rightX - spread,
          yPos - spread,
          apertureW + spread * 2,
          apertureH + spread * 2,
        );
      }

      // 3. The Aperture Surfaces (Flat, loss of depth)
      // They should look like 2D planes of pure color floating in 3D space
      p.fill(lightHue, 60, 95);
      p.rect(leftX, yPos, apertureW, apertureH);
      p.rect(rightX, yPos, apertureW, apertureH);

      // 4. Room Geometry Divider (The "Pillar" between)
      // Re-establish the dark wall between the lights to create contrast
      // This helps sell the illusion that the light is "cut" into the wall
      // We just draw a subtle gradient rect in the middle gap

      // Actually, simply drawing the room gradient earlier handles the gap.
      // But we can darken the center slightly to emphasize the pillar geometry.
      // p.fill(baseHue, 95, 20, 20);
      // p.rect(leftX + apertureW, 0, gap, p.height);

      // 5. Floor reflection?
      // A subtle reflection on the floor adds to the "Space" feel
      const floorH = p.height * 0.2;
      p.fill(lightHue, 60, 80, 5); // Very faint reflection
      p.rect(leftX, p.height - floorH, apertureW, floorH);
      p.rect(rightX, p.height - floorH, apertureW, floorH);
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 26. Action Painting (行动绘画): 能量爆发，滴洒与混乱。
  static_26: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.background(40, 10, 95);
    };
    p.draw = () => {
      // 快速且混乱的笔触
      const moves = 5;
      for (let i = 0; i < moves; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);

        // 主要是黑色和大地色，偶尔爆发亮色
        let hu = 0,
          sa = 0,
          br = 10;
        if (p.random() > 0.8) {
          hu = p.random(360);
          sa = 80;
          br = 90;
        } else {
          hu = 30;
          sa = p.random(20);
          br = p.random(20);
        }

        p.stroke(hu, sa, br, 80);
        p.strokeWeight(p.random(1, 8));
        p.noFill();

        // 模仿 Pollock 的滴洒曲线
        p.beginShape();
        let cx = x,
          cy = y;
        for (let j = 0; j < 6; j++) {
          p.curveVertex(cx, cy);
          cx += p.random(-60, 60);
          cy += p.random(-60, 60);
        }
        p.endShape();

        // 飞溅的墨点
        if (p.random() > 0.6) {
          p.fill(hu, sa, br, 80);
          p.noStroke();
          const splashX = x + p.random(-50, 50);
          const splashY = y + p.random(-50, 50);
          p.circle(splashX, splashY, p.random(2, 6));
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.background(40, 10, 95);
    };
  },

  // 27. Cubism (立体主义): 破碎的视角，几何重构，褐色调。
  static_27: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.rectMode(p.CENTER);
      p.background(30, 10, 85); // 初始画布底色
    };
    p.draw = () => {
      // 每一帧并不清空，而是缓慢叠加，形成复杂的肌理
      if (p.frameCount % 200 === 0) {
        p.background(30, 10, 85, 90); // 偶尔淡化背景
      }

      p.noStroke();
      const x = p.random(p.width);
      const y = p.random(p.height);
      const size = p.random(50, 250);

      // 毕加索/布拉克时期的配色：赭石、灰、黑、浊蓝、深红
      const colors = [
        [35, 40, 70], // Ochre
        [210, 20, 50], // Blue Grey
        [0, 0, 20], // Dark Grey
        [0, 0, 95], // White/Cream
        [10, 40, 50], // Brown/Red
      ];
      const col = p.random(colors);
      p.fill(col[0], col[1], col[2], 70); // 半透明

      p.push();
      p.translate(x, y);
      p.rotate(p.random(p.TWO_PI)); // 旋转视角

      // 绘制“碎片”：模拟被拆解的吉他、瓶子或面孔的局部
      const type = Math.floor(p.random(4));
      if (type === 0) {
        p.triangle(-size / 2, size / 2, 0, -size / 2, size / 2, size / 2);
      } else if (type === 1) {
        p.rect(0, 0, size, size * p.random(0.2, 0.8));
      } else if (type === 2) {
        p.arc(0, 0, size, size, 0, p.PI);
      } else {
        // 剪影效果
        p.beginShape();
        p.vertex(-size / 2, -size / 2);
        p.vertex(size / 3, -size / 4);
        p.vertex(size / 2, size / 2);
        p.vertex(-size / 4, size / 3);
        p.endShape(p.CLOSE);
      }

      // 结构线
      p.stroke(0, 0, 10, 60);
      p.strokeWeight(1.5);
      if (p.random() > 0.5) p.line(-size, 0, size, 0);

      p.pop();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.background(30, 10, 85);
    };
  },

  // 28. ASCII Art (字符艺术): 字符流，密度映射。
  static_28: (p, seed) => {
    const chars = " .:-=+*#%@"; // 密度从低到高

    // const chars = "  ▂▃▄▅▆▇█"; // Alternative block chars
    const fontSize = 16;

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.textFont("Courier New");
      p.textSize(fontSize);
      p.textAlign(p.CENTER, p.CENTER);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.frameRate(24); // 降低帧率以获得更好的字符跳动感
    };
    p.draw = () => {
      p.background(0);
      p.fill(120, 100, 100); // Terminal Green

      const cols = Math.ceil(p.width / fontSize);
      const rows = Math.ceil(p.height / fontSize);
      const t = p.frameCount * 0.03; // 时间流速

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // 使用 Perlin Noise 生成有机流动的图案
          const n = p.noise(i * 0.08, j * 0.08 + t);

          // 只有在亮度足够的地方才绘制，优化性能且制造负空间
          if (n > 0.3) {
            const charIndex = Math.floor(p.map(n, 0.3, 0.8, 0, chars.length));
            // safe clamp
            const idx = Math.max(0, Math.min(charIndex, chars.length - 1));
            const char = chars[idx];

            // 颜色微变：高亮处偏白，暗处偏深绿
            const brightness = p.map(n, 0.3, 0.8, 50, 100);
            p.fill(120, 80, brightness);

            p.text(
              char,
              i * fontSize + fontSize / 2,
              j * fontSize + fontSize / 2,
            );
          }
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 29. Kinetic Art
  static_29: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.stroke(255);
      p.strokeWeight(2);
    };
    p.draw = () => {
      p.background(0, 20);
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < 10; i++) {
        p.push();
        p.rotate(p.frameCount * 0.02 + i * 0.2);
        p.line(0, 0, 200, 0);
        p.pop();
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 30. Gothic (哥特式): 垂直线条，尖拱，神性光辉。
  static_30: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
    };
    p.draw = () => {
      p.background(240, 40, 15); // 深邃的午夜蓝/黑

      // 1. 垂直线条 - 飞扶壁/柱子
      const cols = Math.floor(p.width / 60);
      const colW = p.width / cols;

      for (let i = 0; i <= cols; i++) {
        const x = i * colW;

        // 柱子
        p.stroke(0, 0, 20); // 深色石材
        p.strokeWeight(2);
        p.line(x, 0, x, p.height);

        // 尖拱 (Ogive Arch)
        p.noFill();
        p.stroke(0, 0, 40);
        p.strokeWeight(1);

        // 左半拱
        p.beginShape();
        p.vertex(x, p.height);
        p.vertex(x, p.height * 0.6);
        // 控制点模拟尖顶
        p.bezierVertex(
          x,
          p.height * 0.4,
          x + colW,
          p.height * 0.3,
          x + colW / 2,
          0,
        );
        p.endShape();

        // 右半拱
        p.beginShape();
        p.vertex(x + colW, p.height);
        p.vertex(x + colW, p.height * 0.6);
        p.bezierVertex(
          x + colW,
          p.height * 0.4,
          x,
          p.height * 0.3,
          x + colW / 2,
          0,
        );
        p.endShape();
      }

      // 2. 尘埃粒子 - 增加空气感
      for (let i = 0; i < 150; i++) {
        p.stroke(40, 20, 100, p.random(10, 40));
        p.strokeWeight(p.random(1, 2.5));
        p.point(p.random(p.width), p.random(p.height));
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
  static_31: (p: any, seed: string) => {
    // Ink Wash (水墨) - Improved with layered washes, wet diffusion, and negative space
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noLoop();
    };

    p.draw = () => {
      // 1. Paper Texture (Xuan Paper)
      p.background(245, 243, 238); // Warm rice paper
      p.noStroke();

      // Granularity
      p.loadPixels();
      for (let i = 0; i < p.width * p.height * 4; i += 4) {
        if (p.random() > 0.4) {
          const grain = p.random(-10, 10);
          p.pixels[i] += grain;
          p.pixels[i + 1] += grain;
          p.pixels[i + 2] += grain;
        }
      }
      p.updatePixels();

      const numSeed = parseInt(seed) || Math.floor(p.random(10000));
      p.randomSeed(numSeed);
      p.noiseSeed(numSeed);

      // Utility: Watercolor/Ink Blob (Wet Wash)
      const drawInkBlob = (
        x: number,
        y: number,
        r: number,
        opacity: number,
      ) => {
        p.beginShape();
        p.fill(20, 20, 25, opacity);
        p.noStroke();
        const baseR = r;
        for (let angle = 0; angle < p.TWO_PI; angle += 0.2) {
          // Irregular edge
          const n = p.noise(
            x * 0.01 + Math.cos(angle) * 2,
            y * 0.01 + Math.sin(angle) * 2,
          );
          const rOffset = p.map(n, 0, 1, 0.7, 1.4);
          const finalR = baseR * rOffset;
          p.vertex(x + Math.cos(angle) * finalR, y + Math.sin(angle) * finalR);
        }
        p.endShape(p.CLOSE);
      };

      // Utility: Dry Brush Stroke (Cun Fa)
      const brushStroke = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        weight: number,
      ) => {
        const d = p.dist(x1, y1, x2, y2);
        const steps = d / 2;
        const vx = (x2 - x1) / steps;
        const vy = (y2 - y1) / steps;
        let x = x1;
        let y = y1;
        for (let i = 0; i < steps; i++) {
          if (p.random() > 0.15) {
            // Sketchy/Dry
            const w = p.noise(i * 0.1) * weight;
            const alpha = p.map(p.noise(i * 0.2), 0, 1, 150, 255);
            p.fill(30, 30, 35, alpha);
            p.circle(x + p.random(-1, 1), y + p.random(-1, 1), w);
          }
          x += vx;
          y += vy;
        }
      };

      // 2. Distant Mountains (Wet Wash, Layered)
      // Layer 1: Very Faint (Yuan Shan)
      p.fill(60, 62, 65, 30);
      p.beginShape();
      let horizonY = p.height * 0.35;
      p.vertex(0, p.height);
      p.vertex(0, horizonY);
      for (let x = 0; x <= p.width; x += 30) {
        const n = p.noise(x * 0.002);
        const y = horizonY - p.map(n, 0, 1, -50, 150);
        p.vertex(x, y);
      }
      p.vertex(p.width, p.height);
      p.endShape(p.CLOSE);

      // Layer 2: Mid-distance (Darker wash)
      p.fill(40, 42, 45, 60);
      p.beginShape();
      horizonY = p.height * 0.55;
      p.vertex(0, p.height);
      p.vertex(0, horizonY);
      for (let x = 0; x <= p.width; x += 20) {
        const n = p.noise(x * 0.005 + 50);
        const y = horizonY - p.map(n, 0, 1, -50, 200);
        p.vertex(x, y);
      }
      p.vertex(p.width, p.height);
      p.endShape(p.CLOSE);

      // 3. Foreground Rocks/Trees (Heavy Ink / Nong Mo)
      const numForms = Math.floor(p.random(2, 5));
      for (let i = 0; i < numForms; i++) {
        const cx = p.random(p.width * 0.1, p.width * 0.9);
        const cy = p.random(p.height * 0.7, p.height * 0.9);
        const scale = p.random(0.5, 1.2);

        // Rock Body (Wet blobs)
        p.push();
        p.translate(cx, cy);
        for (let b = 0; b < 5; b++) {
          drawInkBlob(
            p.random(-50, 50) * scale,
            p.random(-30, 30) * scale,
            p.random(20, 60) * scale,
            p.random(100, 200),
          );
        }

        // Trees (Pine/Bamboo style)
        const numTrees = Math.floor(p.random(2, 6));
        for (let t = 0; t < numTrees; t++) {
          const tx = p.random(-40, 40) * scale;
          const ty = p.random(-20, 20) * scale;
          const h = p.random(60, 150) * scale;

          // Trunk
          // Crooked line
          let curX = tx,
            curY = ty;
          let nextX, nextY;
          // Draw up in segments
          const segs = 5;
          for (let s = 0; s < segs; s++) {
            nextX = curX + p.random(-15, 15);
            nextY = curY - h / segs;
            brushStroke(
              curX,
              curY,
              nextX,
              nextY,
              p.map(s, 0, segs, 6 * scale, 2 * scale),
            );
            curX = nextX;
            curY = nextY;

            // Branches
            if (p.random() > 0.4) {
              brushStroke(
                curX,
                curY,
                curX + p.random(-40, 40),
                curY - p.random(10, 30),
                2 * scale,
              );
            }
          }
          // Leaves (Dian - Dots)
          const leafClumps = 10;
          for (let l = 0; l < leafClumps; l++) {
            const lx = curX + p.random(-50, 50);
            const ly = curY + p.random(-30, 50);
            // Cluster of dots
            for (let d = 0; d < 8; d++) {
              p.noStroke();
              p.fill(20, 25, 30, p.random(150, 250));
              p.ellipse(
                lx + p.random(-10, 10),
                ly + p.random(-5, 5),
                6 * scale,
                3 * scale,
              ); // Flat brush shape
            }
          }
        }
        p.pop();
      }

      // 4. Seal (Name Seal)
      const sealSize = p.min(p.width, p.height) * 0.07;
      p.push();
      // Usually placed in corner or empty space
      const sx = p.width * 0.85;
      const sy = p.height * 0.25;

      p.translate(sx, sy);
      p.noStroke();
      p.fill(180, 50, 40, 220); // Cinnabar Red
      p.rectMode(p.CENTER);
      p.rect(0, 0, sealSize, sealSize, 2);

      // Faux characters inside
      p.stroke(245, 243, 238, 200);
      p.strokeWeight(2);
      p.noFill();
      p.line(-sealSize * 0.3, -sealSize * 0.3, sealSize * 0.3, sealSize * 0.3);
      p.line(sealSize * 0.3, -sealSize * 0.3, -sealSize * 0.3, sealSize * 0.3);
      p.rect(0, 0, sealSize * 0.7, sealSize * 0.7);
      p.pop();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
  static_32: (p: any, seed: string) => {
    // Dunhuang (敦煌) - Flying Apsaras, earth tones, oxidization
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noLoop();
    };

    p.draw = () => {
      // 1. Base - Cave Wall Texture
      // Sand/Ochie background (weathered)
      const bgH = p.random(30, 45); // Orange/Yellowish
      const bgS = p.random(20, 40);
      const bgB = p.random(60, 80);
      p.background(bgH, bgS, bgB);

      // Noise texture for wall decay
      p.loadPixels();
      for (let i = 0; i < p.width * p.height * 4; i += 4) {
        if (p.random() > 0.85) {
          // Dark speckles (oxidized mineral pigments)
          p.pixels[i] -= 20;
          p.pixels[i + 1] -= 20;
          p.pixels[i + 2] -= 20;
        }
      }
      p.updatePixels();

      const numSeed = parseInt(seed) || Math.floor(p.random(10000));
      p.randomSeed(numSeed);
      p.noiseSeed(numSeed);

      // Palette: Malachite Green, Azurite Blue, Cinnabar Red, Gold
      const mineralColors = [
        p.color(160, 60, 50, 80), // Faded Azurite
        p.color(120, 50, 40, 80), // Faded Malachite
        p.color(10, 60, 60, 80), // Oxide Red
        p.color(30, 20, 90, 80), // Faded White
      ];

      // 2. Halos / Circular Motifs (Buddhist Influence)
      p.noStroke();
      const numHalos = p.random(1, 3);
      for (let i = 0; i < numHalos; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        const size = p.random(p.width * 0.2, p.width * 0.5);
        for (let r = size; r > 0; r -= 20) {
          p.fill(p.random(mineralColors));
          p.circle(x, y, r);
        }
      }

      // 3. Floating Ribbons (Feitian style)
      p.noFill();
      p.strokeWeight(2);

      const numRibbons = 10;
      for (let n = 0; n < numRibbons; n++) {
        p.stroke(p.random(mineralColors));
        if (p.random() > 0.8) p.stroke(45, 80, 80, 90); // Occasional Gold

        p.beginShape();
        let x = p.random(p.width);
        let y = p.random(p.height);
        p.vertex(x, y);

        let xOff = p.random(100);
        for (let i = 0; i < 200; i += 10) {
          const noiseVal = p.noise(xOff + n, i * 0.01);
          x += p.map(noiseVal, 0, 1, -20, 20);
          y += p.map(p.sin(i * 0.05), -1, 1, -10, 10) + 2; // Drift down
          p.vertex(x, y);
        }
        p.endShape();
      }

      // 4. Gold Leaf flake overlay (Aging)
      p.noStroke();
      p.fill(45, 70, 90, 90); // Gold
      for (let i = 0; i < 50; i++) {
        if (p.random() > 0.5) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          p.circle(x, y, p.random(1, 4));
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
  static_33: (p: any, seed: string) => {
    // Blue & White (青花瓷) - Radial symmetry, recursive patterns
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noLoop();
    };

    p.draw = () => {
      // Porcelain White
      p.background(245, 248, 255);

      // Cobalt Blue styling
      p.stroke(10, 50, 160); // Deep Cobalt
      p.noFill();
      p.strokeWeight(1.5);

      const centerX = p.width / 2;
      const centerY = p.height / 2;
      const maxDist = p.max(p.width, p.height) * 0.55;

      // 1. Central Medallion (Mandala-like)
      const layers = 6;
      for (let i = 1; i <= layers; i++) {
        const r = (maxDist / layers) * i;
        if (i % 2 === 0) {
          // Pattern band
          const segments = 12 * i;
          for (let j = 0; j < segments; j++) {
            const ang1 = p.map(j, 0, segments, 0, p.TWO_PI);
            const ang2 = p.map(j + 1, 0, segments, 0, p.TWO_PI);
            // Arcs
            p.arc(centerX, centerY, r * 2, r * 2, ang1, ang2);
            // Decorative fills inside band
            const mx =
              centerX +
              p.cos(ang1 + (ang2 - ang1) / 2) * (r - maxDist / layers / 2);
            const my =
              centerY +
              p.sin(ang1 + (ang2 - ang1) / 2) * (r - maxDist / layers / 2);
            p.point(mx, my);
          }
        } else {
          // Simple line ring
          p.circle(centerX, centerY, r * 2);
        }
      }

      // 2. Vine / Floral Motifs (Recursive branching)
      // Four corners
      const plantGen = (x: number, y: number, ang: number, len: number) => {
        if (len < 5) return;

        const ex = x + p.cos(ang) * len;
        const ey = y + p.sin(ang) * len;

        p.strokeWeight(p.map(len, 5, 50, 0.5, 3));
        p.line(x, y, ex, ey);

        // Leaf/Flower bud
        if (len < 15) {
          p.fill(10, 50, 160, 100);
          p.circle(ex, ey, len / 2);
          p.noFill();
        }

        plantGen(ex, ey, ang - 0.4, len * 0.7);
        plantGen(ex, ey, ang + 0.4, len * 0.7);
      };

      // Draw vines from corners inward
      p.push();
      p.translate(0, 0);
      plantGen(0, 0, p.QUARTER_PI, 60);
      p.pop();
      p.push();
      p.translate(p.width, 0);
      plantGen(0, 0, p.PI - p.QUARTER_PI, 60);
      p.pop();
      p.push();
      p.translate(0, p.height);
      plantGen(0, 0, -p.QUARTER_PI, 60);
      p.pop();
      p.push();
      p.translate(p.width, p.height);
      plantGen(0, 0, p.PI + p.QUARTER_PI, 60);
      p.pop();

      // Glaze Gloss (Subtle reflection)
      p.noStroke();
      p.fill(255, 255, 255, 150);
      p.circle(centerX - 50, centerY - 50, 100);
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
  static_34: (p: any, seed: string) => {
    // Batik (蜡染) - Wax resist, indigo, crackle texture
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noLoop();
    };

    p.draw = () => {
      // Deep Indigo Background
      p.background(20, 25, 60);

      // 1. Wax Resist Patterns (Light shapes on dark)
      p.noStroke();
      // Off-white / yellow-ish for wax areas
      const waxColor = p.color(240, 230, 200);

      const cols = 8;
      const rows = 8;
      const cw = p.width / cols;
      const ch = p.height / rows;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const cx = ix * cw + cw / 2;
          const cy = iy * ch + ch / 2;

          p.push();
          p.translate(cx, cy);

          // Organic motif
          p.fill(waxColor);
          if ((ix + iy) % 2 === 0) {
            // Flower-like
            for (let k = 0; k < 8; k++) {
              p.rotate(p.PI / 4);
              p.ellipse(10, 0, 15, 6);
            }
          } else {
            // Diamond / Geo
            p.rotate(p.PI / 4);
            p.rectMode(p.CENTER);
            p.rect(0, 0, cw * 0.6, ch * 0.6, 5);
          }
          p.pop();
        }
      }

      // 2. Crackle Effect (Fine spiderweb lines of dye penetrating wax)
      p.stroke(20, 25, 60, 180); // Dye color
      p.strokeWeight(0.5);
      p.noFill();

      const numCracks = 200;
      for (let i = 0; i < numCracks; i++) {
        let x = p.random(p.width);
        let y = p.random(p.height);
        p.beginShape();
        for (let j = 0; j < 10; j++) {
          p.vertex(x, y);
          x += p.random(-15, 15);
          y += p.random(-15, 15);
        }
        p.endShape();
      }

      // 3. Dye Bleed (Soft overlay)
      p.fill(20, 30, 80, 50);
      p.noStroke();
      p.rect(0, 0, p.width, p.height);
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
  static_35: (p: any, seed: string) => {
    // Dot Painting (Indigenous Australian)
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noLoop();
    };

    p.draw = () => {
      // Red Earth Background
      p.background(100, 40, 30);

      // Palette
      const colors = [
        p.color(220, 180, 50), // Yellow Ochre
        p.color(200, 80, 40), // Red Ochre
        p.color(240, 240, 240), // White
        p.color(20, 20, 20), // Black
      ];

      // 1. Main Symbols (Concentric circles / Waterholes)
      const features = [];
      const numFeatures = p.random(3, 6);

      for (let i = 0; i < numFeatures; i++) {
        features.push({
          x: p.random(p.width * 0.2, p.width * 0.8),
          y: p.random(p.height * 0.2, p.height * 0.8),
          r: p.random(30, 80),
        });
      }

      // 2. Connect features with "Songlines" (dotted lines)
      p.noStroke();
      for (let i = 0; i < features.length; i++) {
        const next = features[(i + 1) % features.length];
        const dist = p.dist(features[i].x, features[i].y, next.x, next.y);
        const dots = Math.floor(dist / 8);

        p.fill(240, 240, 240); // White connection lines
        for (let d = 0; d < dots; d++) {
          const lerpAmt = d / dots;
          const lx = p.lerp(features[i].x, next.x, lerpAmt);
          const ly = p.lerp(features[i].y, next.y, lerpAmt);
          p.circle(lx, ly, 4);
        }
      }

      // 3. Draw Concentric Circles and Background Stippling
      // Background stippling first (fill empty space)
      // Done by a grid for performance vs random packing
      /* We'll simulate dense dots by just doing random clusters or grid-ish approach */
      const dotSize = 4;
      const spacing = 8;

      // Draw Feature Circles
      features.forEach((f) => {
        let currentR = f.r;
        let colIdx = 0;
        while (currentR > 5) {
          p.fill(colors[colIdx % colors.length]);
          // Draw ring of dots
          const circumference = p.TWO_PI * currentR;
          const dotsCount = Math.floor(circumference / spacing);
          for (let k = 0; k < dotsCount; k++) {
            const angle = p.map(k, 0, dotsCount, 0, p.TWO_PI);
            const dx = f.x + p.cos(angle) * currentR;
            const dy = f.y + p.sin(angle) * currentR;
            p.circle(dx, dy, dotSize);
          }
          currentR -= spacing;
          colIdx++;
        }
        // Center dot
        p.fill(colors[0]);
        p.circle(f.x, f.y, dotSize * 1.5);
      });

      // Field of patches (random zones with uniform dots)
      // Simply fill the rest with random dots of earth colors
      for (let i = 0; i < 500; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        // Check distance to features
        let tooClose = false;
        for (const f of features) {
          if (p.dist(x, y, f.x, f.y) < f.r + 10) tooClose = true;
        }

        if (!tooClose) {
          p.fill(p.random(colors));
          p.circle(x, y, dotSize);
        }
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
};
