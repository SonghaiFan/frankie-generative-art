import { ArtCardData } from "./types";

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
  {
    id: "static_31",
    term: "Ink Wash (水墨)",
    era: "Ancient China",
    shortDefinition:
      "黑白虚实之间，气韵生动。计白当黑，用极简的笔墨表现无限的意境。",
    evocativeQuestion: "如果没有颜色，你会如何描绘世界的灵魂？",
    visualElements: ["Flow", "Void", "Brushstroke"],
  },
  {
    id: "static_32",
    term: "Dunhuang (敦煌)",
    era: "Various Dynasties",
    shortDefinition:
      "沙漠中的佛国，飞天飘带与矿物颜料的交响，历史的层叠与风化。",
    evocativeQuestion: "在时间的沙漠中，什么颜色能永不褪色？",
    visualElements: ["Earth Tones", "Ribbons", "Gold"],
  },
  {
    id: "static_33",
    term: "Blue & White (青花)",
    era: "Ming/Qing Dynasty",
    shortDefinition: "钴蓝与白瓷的永恒对话，精致的缠枝花纹与几何边界。",
    evocativeQuestion: "纯粹的蓝与白，是否足以讲述万物？",
    visualElements: ["Cobalt Blue", "Pattern", "Ceramic"],
  },
  {
    id: "static_34",
    term: "Batik (蜡染)",
    era: "Traditional / SE Asia",
    shortDefinition:
      "蜡与染料的艺术，冰裂纹的偶然之美，靛蓝与大地色的深沉纹理。",
    evocativeQuestion: "在被阻挡的地方，是否藏着最美的纹理？",
    visualElements: ["Resist", "Crackle", "Indigo"],
  },
  {
    id: "static_35",
    term: "Dot Painting (点画)",
    era: "Indigenous Australian",
    shortDefinition: "大地的梦径，用无数的点编织古老的故事与地图。",
    evocativeQuestion: "如果要画出大地的梦，你会从哪里开始落点？",
    visualElements: ["Dots", "Earth Pigments", "Dreamtime"],
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

export const FALLBACK_CREATIVE_RESULT = {
  styleName: "Static Void",
  explanation: "The oracle is silent. Only the void remains.",
  p5Code:
    "function setup(){createCanvas(windowWidth, windowHeight);background(0);} function draw(){stroke(255);point(random(width), random(height));}",
};
