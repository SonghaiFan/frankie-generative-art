import { ArtCardData } from "./types";
import p5 from "p5";

// --- 1. PREDEFINED CARDS LIBRARY ---
export const PREDEFINED_CARDS: ArtCardData[] = [
  // ... (Keep your existing array data exactly as provided in your prompt) ...
  {
    id: "static_1",
    term: "Rhizome (块茎)",
    era: "Post-Structuralism",
    shortDefinition:
      "去中心化的、无等级的连接方式，任何一点都能与其他任何一点相连。",
    evocativeQuestion: "你的思维是像树一样扎根向上，还是像草一样蔓延连接？",
    visualElements: ["Chaos", "Network", "Organic"],
  },
  {
    id: "static_2",
    term: "Sfumato (晕涂法)",
    era: "Renaissance",
    shortDefinition: "色彩与轮廓像烟雾一样消融，以此唤起一种朦胧的诗意。",
    evocativeQuestion:
      "在你的创作中，你是倾向于清晰的界限，还是迷恋模糊的暧昧？",
    visualElements: ["Soft", "Fluid", "Mystery"],
  },
  {
    id: "static_3",
    term: "Glitch (故障)",
    era: "Digital Era",
    shortDefinition: "在系统的错误和崩溃中，发现预料之外的数字美学。",
    evocativeQuestion: "错误是你需要修正的瑕疵，还是天赐的灵感入口？",
    visualElements: ["Chaos", "Noise", "Geometric"],
  },
  {
    id: "static_4",
    term: "Ma (间)",
    era: "Japanese Aesthetics",
    shortDefinition: "物体之间的空白不是无，而是充满了可能性的‘间隙’。",
    evocativeQuestion: "在你的作品或生活中，你敢于留下多少不被填满的空白？",
    visualElements: ["Minimal", "Space", "Structure"],
  },
  {
    id: "static_5",
    term: "Ready-made (现成品)",
    era: "Dadaism",
    shortDefinition: "艺术不在于制作，而在于选择和重新定义语境。",
    evocativeQuestion: "如果剥离了手工劳作，你的创造力还剩下什么？",
    visualElements: ["Geometric", "Industrial", "Cold"],
  },
  {
    id: "static_6",
    term: "Mono-ha (物派)",
    era: "1960s Japan",
    shortDefinition:
      "未被加工的物质本身，以及物体与空间、物体与物体之间的依存关系。",
    evocativeQuestion: "你试图控制材料，还是让材料展示它自己？",
    visualElements: ["Structure", "Raw", "Quiet"],
  },
  {
    id: "static_7",
    term: "Camp (坎普)",
    era: "Modern Culture",
    shortDefinition: "通过夸张、反讽和戏剧化，将平庸转化为一种独特的风格。",
    evocativeQuestion: "你是否愿意为了‘有趣’而牺牲‘严肃’？",
    visualElements: ["Chaos", "Vibrant", "Artificial"],
  },
  {
    id: "static_8",
    term: "Sublime (崇高)",
    era: "Romanticism",
    shortDefinition: "那种巨大到令人感到恐惧、渺小，却又产生敬畏的壮丽感。",
    evocativeQuestion: "美必须是令人愉悦的吗？还是它可以是令人战栗的？",
    visualElements: ["Dark", "Stormy", "Fluid"],
  },
  {
    id: "static_9",
    term: "Automatism (自动主义)",
    era: "Surrealism",
    shortDefinition: "悬置理性控制，让潜意识引导手部运动，记录心灵的原始痕迹。",
    evocativeQuestion: "如果完全放弃思考，你的手会画出什么？",
    visualElements: ["Chaos", "Fluid", "Scribble"],
  },
  {
    id: "static_10",
    term: "Bauhaus (包豪斯)",
    era: "Modernism",
    shortDefinition: "形式追随功能，在工业生产中寻找理性的几何之美。",
    evocativeQuestion:
      "在你的世界里，多余的装饰是必要的浪漫，还是需要切除的累赘？",
    visualElements: ["Geometric", "Structure", "Clean"],
  },
  {
    id: "static_11",
    term: "Wabi-Sabi (侘寂)",
    era: "Traditional Japan",
    shortDefinition: "接受短暂、残缺和不完美，在枯萎的时间痕迹中发现美。",
    evocativeQuestion: "你是否认为只有完整无缺的东西才配称之为完美？",
    visualElements: ["Rough", "Organic", "Decay"],
  },
  {
    id: "static_12",
    term: "Negative Space (负空间)",
    era: "Visual Composition",
    shortDefinition: "环绕在主体周围的空间，它定义了主体，却往往被忽视。",
    evocativeQuestion: "你关注的是‘有’，还是定义了‘有’的‘无’？",
    visualElements: ["Space", "Contrast", "Geometric"],
  },
  {
    id: "static_13",
    term: "Impasto (厚涂法)",
    era: "Painting Technique",
    shortDefinition: "颜料堆叠在画布上，形成浮雕般的物理质感，笔触即是情感。",
    evocativeQuestion: "你希望你的表达是平滑隐形的，还是充满颗粒与痕迹的？",
    visualElements: ["Rough", "Texture", "Chaos"],
  },
  {
    id: "static_14",
    term: "Brutalism (粗野主义)",
    era: "Architecture",
    shortDefinition: "诚实地裸露材料（如混凝土）的粗糙本质，拒绝任何掩饰。",
    evocativeQuestion: "赤裸的真实虽然粗糙，是否比精致的谎言更动人？",
    visualElements: ["Geometric", "Heavy", "Structure"],
  },
  {
    id: "static_15",
    term: "Vaporwave (蒸汽波)",
    era: "Internet Aesthetic",
    shortDefinition: "对旧日消费主义和模拟时代的迷幻怀旧，一种对未来的失落感。",
    evocativeQuestion: "你怀念的是过去本身，还是那个‘从未发生过的未来’？",
    visualElements: ["Soft", "Neon", "Fluid"],
  },
  {
    id: "static_16",
    term: "Gestalt (完形)",
    era: "Psychology/Design",
    shortDefinition: "整体大于部分之和，大脑自动将碎片补全为有意义的形状。",
    evocativeQuestion: "你习惯关注细节的碎片，还是整体的轮廓？",
    visualElements: ["Structure", "Geometric", "Connected"],
  },
  {
    id: "static_17",
    term: "Chiaroscuro (明暗对照)",
    era: "Baroque",
    shortDefinition: "强烈的光明与黑暗对比，营造体积感与戏剧冲突。",
    evocativeQuestion: "你人生剧本里，光是用来照亮舞台，还是为了加深阴影？",
    visualElements: ["Contrast", "Shadow", "Dramatic"],
  },
  {
    id: "static_18",
    term: "Appropriation (挪用)",
    era: "Postmodernism",
    shortDefinition: "借用已有的图像或物品，通过新的语境赋予其新的含义。",
    evocativeQuestion: "原创是一种执念吗？如果在旧物上能开出新花，为何不可？",
    visualElements: ["Collage", "Layered", "Geometric"],
  },
  {
    id: "static_19",
    term: "Fluxus (激浪派)",
    era: "1960s",
    shortDefinition: "艺术是生活的过程，是流动的事件，而非博物馆里的僵死之物。",
    evocativeQuestion: "此时此刻你的呼吸，算不算一件艺术品？",
    visualElements: ["Fluid", "Chaos", "Simple"],
  },
  {
    id: "static_20",
    term: "Pixelation (像素化)",
    era: "Digital Art",
    shortDefinition: "图像的最小原子，当放大到极致，现实便分解为抽象的方块。",
    evocativeQuestion:
      "当现实被拆解到底层逻辑时，它变得更清晰了，还是更陌生了？",
    visualElements: ["Geometric", "Grid", "Digital"],
  },
  {
    id: "static_21",
    term: "Pointillism (点彩派)",
    era: "Post-Impressionism",
    shortDefinition: "纯色的小点在视网膜上混合，形成鲜艳而颤动的光影。",
    evocativeQuestion:
      "如果把你的人生拆解成无数个瞬间，它们能汇聚成完整的画面吗？",
    visualElements: ["Dots", "Vibrant", "Texture"],
  },
  {
    id: "static_22",
    term: "Op Art (欧普艺术)",
    era: "1960s",
    shortDefinition: "利用几何图形的排列，欺骗眼睛，制造颤动、膨胀的视觉错觉。",
    evocativeQuestion: "你所感知的现实，有多少是大脑对你的欺骗？",
    visualElements: ["Geometric", "Illusion", "Contrast"],
  },
  {
    id: "static_23",
    term: "Constructivism (构成主义)",
    era: "Early Soviet",
    shortDefinition:
      "艺术是服务于革命的工程，强调对角线、工业材料和激进的几何结构。",
    evocativeQuestion: "在混乱的时代，你试图建立什么样的秩序？",
    visualElements: ["Structure", "Red", "Industrial"],
  },
  {
    id: "static_24",
    term: "Ukiyo-e (浮世绘)",
    era: "Edo Period",
    shortDefinition:
      "虚浮世界的绘画，用流畅的线条和平面色彩描绘瞬息万变的享乐。",
    evocativeQuestion: "如果生活只是一场短暂的漂流，你会随波逐流还是逆流而上？",
    visualElements: ["Fluid", "Flat", "Lines"],
  },
  {
    id: "static_25",
    term: "Light and Space (光与空间)",
    era: "1960s California",
    shortDefinition:
      "关注光线本身的物质性，消除物体的边界，创造一种沉浸的感知体验。",
    evocativeQuestion: "当物质消失，只剩下光，你看到了什么？",
    visualElements: ["Light", "Gradient", "Ethereal"],
  },
  {
    id: "static_26",
    term: "Action Painting (行动绘画)",
    era: "Abstract Expressionism",
    shortDefinition:
      "画布是行动的竞技场，颜料的滴洒、泼溅记录了身体的能量与爆发。",
    evocativeQuestion: "你渴望精确的控制，还是渴望彻底的释放？",
    visualElements: ["Chaos", "Energy", "Texture"],
  },
  {
    id: "static_27",
    term: "Cubism (立体主义)",
    era: "Early 20th Century",
    shortDefinition:
      "打碎单一视角，将物体分解为碎片，在平面上同时展示多个侧面。",
    evocativeQuestion: "你能在同一时刻理解事物的不同面向吗？",
    visualElements: ["Geometric", "Fragmented", "Layered"],
  },
  {
    id: "static_28",
    term: "ASCII Art (字符艺术)",
    era: "Early Computing",
    shortDefinition: "在受限的字符网格中，用字母和符号的密度来模拟图像的灰度。",
    evocativeQuestion: "在这个高分辨率的世界里，你是否怀念低保真的想象力？",
    visualElements: ["Grid", "Digital", "Text"],
  },
  {
    id: "static_29",
    term: "Kinetic Art (动态艺术)",
    era: "Modernism",
    shortDefinition:
      "艺术品不再静止，而是依靠风、马达或观众的互动产生真实的物理运动。",
    evocativeQuestion: "平衡是一种静态的结果，还是一种动态的过程？",
    visualElements: ["Movement", "Balance", "Physics"],
  },
  {
    id: "static_30",
    term: "Gothic (哥特式)",
    era: "Middle Ages",
    shortDefinition: "尖拱、彩色玻璃和垂直线条，渴望摆脱重力，向上触摸神性。",
    evocativeQuestion: "什么东西能让你的灵魂感到升华？",
    visualElements: ["Structure", "Vertical", "Light"],
  },
];

// --- 2. HELPERS ---
const getRng = (seedStr: string) => {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return () => {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
};

// --- 3. P5.JS VISUAL STYLES (UNIQUE PER CARD ID) ---
export const VISUAL_STYLES: Record<string, (p: p5, seed: string) => void> = {
  // 1. Rhizome (块茎): 去中心化网络，节点动态连接，无主根。
  static_1: (p, seed) => {
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 100);
      for (let i = 0; i < 50; i++) {
        nodes.push({
          x: p.random(p.width),
          y: p.random(p.height),
          vx: p.random(-0.5, 0.5),
          vy: p.random(-0.5, 0.5),
        });
      }
    };
    p.draw = () => {
      p.background(0, 0, 98, 20); // 极淡的拖尾

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > p.width) n.vx *= -1;
        if (n.y < 0 || n.y > p.height) n.vy *= -1;

        // 绘制节点
        p.noStroke();
        p.fill(150, 40, 60, 50);
        p.circle(n.x, n.y, 3);

        // 根茎状连接：只连接附近的点
        nodes.forEach((other, j) => {
          if (i !== j) {
            const d = p.dist(n.x, n.y, other.x, other.y);
            if (d < 120) {
              p.strokeWeight(p.map(d, 0, 120, 2, 0));
              p.stroke(140, 30, 70, 15); // 淡绿色/灰色连接线
              p.line(n.x, n.y, other.x, other.y);
            }
          }
        });
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
          p.height / 2 + Math.sin(a) * r + 50
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
            (p.width / 2) * (p.width / 2) + p.height * p.height
          );
          const normDist = distFromCenterTop / maxDist;

          let brightness;
          if (normDist < 0.3) {
            brightness = p.map(
              Math.pow(nVal, 1.5),
              0,
              1,
              30,
              95 * (1 - normDist * 2)
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
        p.height * 0.1
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
          p.height
        );
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 23. Constructivism
  static_23: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(240);
      p.noLoop();
    };
    p.draw = () => {
      p.background(240);
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(p.QUARTER_PI);
      p.fill(200, 0, 0);
      p.rect(0, 0, 300, 50);
      p.fill(0);
      p.circle(-50, -50, 100);
      p.pop();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },

  // 24. Ukiyo-e
  static_24: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noFill();
      p.stroke(0, 0, 100);
      p.strokeWeight(2);
    };
    p.draw = () => {
      p.background(20, 50, 100);
      for (let y = 100; y < p.height; y += 50) {
        p.beginShape();
        for (let x = 0; x < p.width; x += 10) {
          p.vertex(x, y + Math.sin(x * 0.02 + p.frameCount * 0.05) * 20);
        }
        p.endShape();
      }
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 25. Light and Space
  static_25: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
      p.background(200, 200, 255);
      p.noStroke();
      let c = p.color(255, 100, 200, 50);
      p.fill(c);
      p.rect(
        0,
        0,
        p.width * (0.5 + Math.sin(p.frameCount * 0.01) * 0.2),
        p.height
      );
    };
    (p as any).customResize = (w: number, h: number) => p.resizeCanvas(w, h);
  },

  // 26. Action Painting
  static_26: (p, seed) => {
    let x = 0,
      y = 0;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(240);
      x = p.width / 2;
      y = p.height / 2;
    };
    p.draw = () => {
      for (let i = 0; i < 10; i++) {
        x += p.random(-20, 20);
        y += p.random(-20, 20);
        p.strokeWeight(p.random(1, 5));
        p.stroke(0);
        p.point(x, y);
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.background(240);
    };
  },

  // 27. Cubism
  static_27: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(100);
      p.noLoop();
    };
    p.draw = () => {
      for (let i = 0; i < 20; i++) {
        p.fill(p.random(100, 200), p.random(100, 200), p.random(100, 200), 150);
        p.rect(
          p.random(p.width),
          p.random(p.height),
          p.random(50, 150),
          p.random(50, 150)
        );
      }
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },

  // 28. ASCII Art
  static_28: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.textFont("monospace");
      p.textSize(12);
    };
    p.draw = () => {
      p.background(0);
      p.fill(0, 255, 0);
      for (let y = 12; y < p.height; y += 12) {
        for (let x = 0; x < p.width; x += 8) {
          if (p.random() > 0.5)
            p.text(String.fromCharCode(0x30a0 + p.random(96)), x, y);
        }
      }
      p.noLoop();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.loop();
    };
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

  // 30. Gothic
  static_30: (p, seed) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.stroke(200);
      p.noFill();
    };
    p.draw = () => {
      p.background(20);
      for (let x = 0; x < p.width; x += 100) {
        p.beginShape();
        p.vertex(x, p.height);
        p.vertex(x, p.height / 2);
        (p as any).bezierVertex(
          x + 20,
          p.height / 2 - 50,
          x + 50,
          p.height / 2 - 100,
          x + 50,
          p.height / 2 - 150
        );
        (p as any).bezierVertex(
          x + 50,
          p.height / 2 - 100,
          x + 80,
          p.height / 2 - 50,
          x + 100,
          p.height / 2
        );
        p.vertex(x + 100, p.height);
        p.endShape();
      }
      p.noLoop();
    };
    (p as any).customResize = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      p.redraw();
    };
  },
};

export const FALLBACK_CREATIVE_RESULT = {
  styleName: "Static Void",
  explanation: "The oracle is silent. Only the void remains.",
  p5Code:
    "function setup(){createCanvas(windowWidth, windowHeight);background(0);} function draw(){stroke(255);point(random(width), random(height));}",
};
