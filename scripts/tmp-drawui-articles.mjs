// 生成器：按编辑器真实 Slate 结构写 drawui-core 教程（7 语言变体）
// 事实依据：E:/company/huabu/drawui README + packages/core/src（Editor / BaseShape / export）
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = 'e:/company/drawui-book/data/articles';
const DRAWBOARDS = 'e:/company/drawui-book/data/media/drawboards';
const ZWS = '\u200B';
const JINSHU = '"ChillJinshuSong", "寒蝉锦书宋", serif';
const id = () => crypto.randomUUID();
const t = (text, marks = {}) => ({ text, ...marks });
const gradient = (colors) => JSON.stringify({ type: 'gradient', colors, direction: 'left-to-right' });

const para = (children, attrs = {}) => ({ type: 'paragraph', id: id(), attrs, children });
const heading = (text, level = 2) => ({
  type: 'heading',
  id: id(),
  attrs: { level },
  children: [{ text }],
});
const title = (text, icon = '🧩') => ({
  type: 'heading-title',
  id: id(),
  attrs: {
    author: 'drawui team',
    date: '2026-10-31',
    icon: JSON.stringify({ kind: 'emoji', value: icon }),
  },
  children: [{ text }],
});
const image = (url, width, height, name) => ({
  type: 'image-block',
  id: id(),
  attrs: { url, width, height, align: 'center', name },
  children: [{ text: '' }],
});
const code = (language, lines, height) => ({
  type: 'code-block',
  id: id(),
  attrs: { language, wrap: true, height },
  children: lines.map((line) => ({
    type: 'code-line',
    id: id(),
    children: [{ text: line }, { text: ZWS }],
  })),
});
const hint = (type, label, children) => ({
  type: 'hint-block',
  id: id(),
  attrs: { type, label },
  children: [para(children)],
});
const listItem = (children, listId, n) =>
  para(children, {
    lilist: { list_type: 'ul', list_id: listId, list_number: n, list_custom: true },
  });
const table = (rows, colWidths) => ({
  type: 'table',
  id: id(),
  attrs: { colWidths },
  children: rows.map((cells) => ({
    type: 'table-row',
    id: id(),
    attrs: {},
    children: cells.map((children) => ({
      type: 'table-cell',
      id: id(),
      attrs: { width: '160px' },
      children: [para(children)],
    })),
  })),
});
const drawboard = (src) => ({
  type: 'drawboard',
  id: id(),
  attrs: { width: 760, height: 420, src },
  children: [{ text: ZWS }],
});
// 表头行：传入 [左列名, 右列名]，返回一行两格（每格一个加粗文本节点）
const head = ([first, second]) => [[t(first, { bold: true })], [t(second, { bold: true })]];

// ---------------------------------------------------------------- 画板数据
// 文章二用的画板：两个圆角矩形 + 一根绑定箭头，直观展示「连图形不连坐标」
const BOX_W = 220;
const BOX_H = 100;
const BOX_Y = 170;

const sourceBox = {
  id: 'src-box',
  type: 'rounded-rectangle',
  x: 60,
  y: BOX_Y,
  width: BOX_W,
  height: BOX_H,
  borderRadius: 14,
  rotation: 0,
  text: 'Source shape',
  style: {
    strokeColor: '#3b82f6',
    fillColor: '#eef4ff',
    fillOpacity: 0.95,
    strokeWidth: 2,
    strokeDash: null,
  },
  fontSize: 16,
  textColor: '#141b2d',
};

const targetBox = {
  id: 'tgt-box',
  type: 'rounded-rectangle',
  x: 480,
  y: BOX_Y,
  width: BOX_W,
  height: BOX_H,
  borderRadius: 14,
  rotation: 0,
  text: 'Target shape',
  style: {
    strokeColor: '#0f9d74',
    fillColor: '#ecfdf5',
    fillOpacity: 0.95,
    strokeWidth: 2,
    strokeDash: null,
  },
  fontSize: 16,
  textColor: '#141b2d',
};

const bindingArrow = {
  id: 'bind-arrow',
  type: 'arrow',
  x: 280,
  y: BOX_Y + BOX_H / 2,
  points: [
    { x: 280, y: BOX_Y + BOX_H / 2 },
    { x: 480, y: BOX_Y + BOX_H / 2 },
  ],
  rotation: 0,
  style: {
    strokeColor: '#7c8db5',
    fillColor: 'transparent',
    strokeWidth: 2,
    strokeDash: null,
  },
  startBinding: { toShapeId: 'src-box', handle: 'right' },
  endBinding: { toShapeId: 'tgt-box', handle: 'left', auto: false },
  connectionType: 'polyline',
  arrowHead: 'end',
  dashed: false,
};

fs.mkdirSync(DRAWBOARDS, { recursive: true });
fs.writeFileSync(
  path.join(DRAWBOARDS, 'drawui-core-bindings.json'),
  JSON.stringify([sourceBox, targetBox, bindingArrow]),
);

// ---------------------------------------------------------------- 共享块（代码/图片/画板，与语言无关）
const IMG_PIPELINE = image(
  'media/images/drawui-core-architecture.svg',
  1000,
  433,
  'drawui-core pipeline',
);
const BOARD_BINDINGS = drawboard('media/drawboards/drawui-core-bindings.json');
const IMG_REACT = image(
  'media/images/drawui-react-architecture.svg',
  1000,
  433,
  'drawui-react architecture',
);

const CODE_INSTALL = code('bash', ['npm install drawui-core', 'pnpm add drawui-core'], 90);

const CODE_SETUP = code(
  'javascript',
  [
    "import { Editor } from 'drawui-core'",
    '',
    '// 1. 准备一块画布：宽高由你决定，引擎会自己适配高分屏（DPR）',
    '//    也可以直接在页面里写 <canvas id="board" style="width:100%;height:480px">',
    'const canvas = document.createElement("canvas")',
    'canvas.style.width = "100%"',
    'canvas.style.height = "480px"',
    'document.getElementById("app").appendChild(canvas)',
    '',
    '// 2. 一个画布只创建一个 Editor，不要每次渲染都 new',
    '//    language 只影响引擎内置文案（右键菜单、提示等），默认 zh-CN',
    'const editor = new Editor(canvas, { language: "zh-CN" })',
  ],
  300,
);

const CODE_SHAPES = code(
  'javascript',
  [
    '// 3. 写入第一份文档：一个蓝色圆角矩形',
    '//    x / y 是图形【中心点】，不是左上角 —— 这是最容易踩的坑',
    'editor.setShapes([',
    '  {',
    '    id: "card-1",              // 唯一 id：绑定、选中、删除都靠它',
    '    type: "rounded-rectangle", // 图形类型，完整清单见后文表格',
    '    x: 320, y: 240,            // 中心点坐标（世界坐标）',
    '    width: 200, height: 100,',
    '    rotation: 0,               // 旋转角度（度）',
    '    text: "Hello drawui",      // 双击图形可以改文字',
    '    fontSize: 16,',
    '    style: {',
    '      strokeColor: "#3b82f6",  // 边框色',
    '      fillColor: "#eff6ff",    // 填充色',
    '      fillOpacity: 1,',
    '      strokeWidth: 2,',
    '      strokeDash: null,        // [6, 4] 就是虚线',
    '    },',
    '  },',
    '])',
  ],
  420,
);

const CODE_SUBSCRIBE = code(
  'javascript',
  [
    '// 4. 订阅变化：拖动 / 缩放 / 改文字 / 撤销都会触发',
    'const unsubscribe = editor.subscribe(() => {',
    '  // 每次变化后拿最新文档；真实项目一般在这里做自动保存',
    '  const shapes = editor.getShapes()',
    '  console.log("shape count:", shapes.length)',
    '})',
    '',
    '// 5. 解绑：subscribe 返回的函数就是「注销器」，调用一次即注销',
    '//    什么时候调？组件卸载 / 页面离开 / 弹窗关闭 / 销毁或重建编辑器之前',
    '//    不调会怎样？监听器一直留着 → 重复保存、内存泄漏、回调打到已销毁的画布',
    '// unsubscribe()   ← 真实项目在卸载或清理阶段调用这一行',
  ],
  270,
);

const CODE_REACT = code(
  'tsx',
  [
    "import { CanvasBoard } from 'drawui-react'",
    "import 'drawui-react/styles.css'   // 忘记这行，工具栏会没有样式",
    '',
    'export function App() {',
    '  return (',
    '    <CanvasBoard',
    '      style={{ height: 520 }}     // 画板撑满父容器，给它一个高度即可',
    '      themeColor="#3b82f6"        // 选中框 / 手柄的强调色',
    '      language="zh-CN"            // 界面语言，7 种可选',
    '      // onReady 拿到 Editor 实例：可以 setShapes / undo / exportJSON',
    '      onReady={(editor) => editor.setShapes([])}',
    '      // onChange 在图形或相机变化时触发，可用于自动保存',
    '      onChange={(data) => console.log(data.shapes.length)}',
    '    />',
    '  )',
    '}',
  ],
  360,
);

const CODE_R_INSTALL = code(
  'bash',
  [
    '# drawui-react 负责 React 组件，drawui-core 是它依赖的引擎',
    'pnpm add drawui-react drawui-core react react-dom',
    '',
    '# npm / yarn 同理；react 与 react-dom 是 peer 依赖，请保持项目现有版本',
  ],
  130,
);

const CODE_R_REF = code(
  'tsx',
  [
    'const board = useRef<Editor | null>(null)',
    '',
    '<CanvasBoard',
    '  // 挂载完成时拿到引擎实例，之后随时可用',
    '  onReady={(editor) => { board.current = editor }}',
    '/>',
    '',
    '// 按钮点击、快捷键里调用 core 的任何能力',
    'board.current?.setShapes(nextShapes)   // 整体替换文档',
    'board.current?.undo()                  // 撤销一步',
    'board.current?.downloadImage("board", "png")',
  ],
  290,
);

const CODE_R_DATA = code(
  'tsx',
  [
    '// 非受控：data 只在首次挂载时灌入，之后文档由画板自己维护',
    '<CanvasBoard data={initialShapes} />',
    '',
    '// 受控：把最新文档存进 state，再用 onChange 写回来',
    'const [shapes, setShapes] = useState(initialShapes)',
    '<CanvasBoard',
    '  data={shapes}',
    '  onChange={(next) => setShapes(next.shapes)}',
    '/>',
  ],
  280,
);

const CODE_R_SUBSCRIBE = code(
  'tsx',
  [
    'useEffect(() => {',
    '  const editor = board.current',
    '  if (!editor) return',
    '',
    '  // 订阅：注册监听器，画布每次变化都会调用它',
    '  const unsubscribe = editor.subscribe(() => {',
    '    autosave(editor.getShapes())   // 这里拿到的是最新文档',
    '  })',
    '',
    '  // 解绑：useEffect 的清理函数会在组件卸载时执行',
    '  // 页面跳走、弹窗关闭、热更新重挂载都会走到这里',
    '  return unsubscribe',
    '}, [])',
  ],
  330,
);

const CODE_R_THEME = code(
  'tsx',
  [
    '<CanvasBoard',
    '  themeColor="#7c3aed"   // 选中框、手柄的强调色',
    '  theme="dark"          // light / dark',
    '  language="zh-CN"      // 界面语言：zh / zh-TW / en / ja / ko / fr / de',
    '/>',
  ],
  160,
);

const CODE_R_EXPORT = code(
  'tsx',
  [
    'const editor = board.current',
    '',
    '// 触发浏览器下载：png / svg / pdf',
    'await editor?.downloadImage("board", "png")',
    '',
    '// 只要二进制数据：自己上传或塞进 <img>',
    'const blob = await editor?.exportImage("png", { scale: 2, padding: 24 })',
  ],
  210,
);

const CODE_JSON = code(
  'javascript',
  [
    '// 保存：图形 + 相机（平移/缩放）一起序列化成一个字符串',
    'const json = editor.exportJSON()',
    '',
    '// 存哪儿都行：localStorage / 数据库 / 文件',
    'localStorage.setItem("board-v1", json)',
    '',
    '// 恢复：格式不对时返回 false，不会抛异常',
    'const ok = editor.importJSON(localStorage.getItem("board-v1"))',
    'console.log(ok ? "恢复成功" : "数据不可用")',
  ],
  250,
);

const CODE_EXPORT_IMAGE = code(
  'javascript',
  [
    '// 直接触发浏览器下载：png / svg / pdf',
    'await editor.downloadImage("board", "png")',
    '',
    '// 也可以只拿数据（Blob），自己上传或塞进 <img>',
    'const blob = await editor.exportImage("png", {',
    '  scale: 2,             // 2 倍图，文字更清晰',
    '  padding: 40,          // 四周留白',
    '  background: "#ffffff", // null 表示透明背景',
    '})',
  ],
  230,
);

const CODE_HISTORY = code(
  'javascript',
  [
    'editor.undo()     // 等价于 Ctrl / Cmd + Z',
    'editor.redo()     // 等价于 Ctrl / Cmd + Shift + Z',
    'editor.canUndo()  // 工具栏按钮置灰用：还有没有可撤销的步骤',
  ],
  110,
);

const CODE_COORD = code(
  'javascript',
  [
    '// 图形位置就是世界坐标，x / y 是中心点（不是左上角）',
    'editor.setShapes([',
    '  { id: "a", type: "rectangle", x: 200, y: 200, width: 160, height: 80, ... },',
    '])',
    '',
    '// 想让它往右挪 120px：改 x 再写回去（这一步也会进撤销历史）',
    'const shapes = editor.getShapes()',
    'shapes[0].x += 120',
    'editor.setShapes(shapes)',
  ],
  220,
);

const CODE_SHAPE = code(
  'javascript',
  [
    '{',
    '  id: "s1",                    // 必填且唯一：连线绑定、选中都靠它',
    '  type: "rectangle",           // 图形类型，见下方清单',
    '  x: 300, y: 200,              // 中心点坐标',
    '  width: 220, height: 96,',
    '  rotation: 0,                 // 旋转角度（度）',
    '  text: "Process step",',
    '  fontSize: 16,                // 不写就用默认字号',
    '  textColor: "#141b2d",',
    '  style: {',
    '    strokeColor: "#3b82f6",',
    '    fillColor: "#eff6ff",',
    '    strokeWidth: 2,',
    '    strokeDash: null,',
    '  },',
    '  locked: false,               // true = 锁住，不可拖动',
    '  groupId: undefined,          // 相同 groupId 的图形整组移动',
    '}',
  ],
  400,
);

const CODE_ARROW = code(
  'javascript',
  [
    '// 两个矩形 a、b，再加一根连线',
    'const a = { id: "a", type: "rectangle", x: 200, y: 200, width: 160, height: 80, ... }',
    'const b = { id: "b", type: "rectangle", x: 520, y: 200, width: 160, height: 80, ... }',
    '',
    '{',
    '  id: "link-1",',
    '  type: "arrow",',
    '  points: [                        // 初始端点；绑定后引擎会按图形位置重算',
    '    { x: 280, y: 200 },',
    '    { x: 440, y: 200 },',
    '  ],',
    '  // 绑定两端图形：拖动 a / b，线始终连着，不会散架',
    '  startBinding: { toShapeId: "a", handle: "right" },',
    '  endBinding:   { toShapeId: "b", handle: "left", auto: true },',
    '  // auto: 接入边随相对位置自动重选（b 拖到下方时会从顶部接入）',
    '  connectionType: "orthogonal", // "straight" 直线 / "orthogonal" 正交折线',
    '  arrowHead: "end",',
    '  style: { strokeColor: "#64748b", fillColor: "transparent", strokeWidth: 2, strokeDash: null },',
    '}',
  ],
  400,
);

const CODE_GROUP = code(
  'javascript',
  [
    '// 分组：给几个图形同一个 groupId，拖动任一个整组一起走',
    'editor.setShapes([',
    '  { ...card,  groupId: "g1" },',
    '  { ...label, groupId: "g1" },',
    '  { ...link,  groupId: "g1" },  // 连线也可以一起进组',
    '])',
  ],
  150,
);

const CODE_STYLE = code(
  'javascript',
  [
    'style: {',
    '  strokeColor: "#3b82f6",  // 边框颜色',
    '  fillColor: "#eff6ff",    // 填充颜色',
    '  fillOpacity: 0.9,        // 填充透明度：0 全透明，1 不透明',
    '  strokeWidth: 2,          // 边框粗细（px）',
    '  strokeDash: [6, 4],      // 虚线：[实线长度, 间隔]；null = 实线',
    '}',
  ],
  190,
);

// ---------------------------------------------------------------- 文章一：快速上手
const article1 = (L) => [
  title(L.title),
  para(L.lead),
  IMG_PIPELINE,
  para([t(L.jinshu, { fontFamily: JINSHU })]),
  heading(L.hGoal),
  hint('info', L.goalLabel, [t(L.goalText)]),
  heading(L.hInstall),
  CODE_INSTALL,
  hint('info', L.installHintLabel, [t(L.installHint)]),
  heading(L.hStep1),
  CODE_SETUP,
  para([t(L.step1Para)]),
  heading(L.hStep2),
  CODE_SHAPES,
  para([t(L.step2Para)]),
  hint('tip', L.centerLabel, [t(L.centerText)]),
  heading(L.hStep3),
  CODE_SUBSCRIBE,
  para([t(L.step3Para)]),
  hint('tip', L.unsubLabel, [t(L.unsubText)]),
  heading(L.hStep4),
  CODE_JSON,
  para([t(L.savePara)]),
  heading(L.hStep5),
  CODE_EXPORT_IMAGE,
  para([t(L.exportPara)]),
  heading(L.hStep6),
  CODE_HISTORY,
  para([t(L.historyPara)]),
  // 给初学者一张「做完每步会看到什么」的速查表：不用对着屏幕猜自己是不是做对了
  heading(L.hSee),
  table(
    [
      head(L.seeHead),
      [[t(L.hStep1)], [t(L.see1)]],
      [[t(L.hStep2)], [t(L.see2)]],
      [[t(L.hStep3)], [t(L.see3)]],
      [[t(L.hStep4)], [t(L.see4)]],
      [[t(L.hStep5)], [t(L.see5)]],
      [[t(L.hStep6)], [t(L.see6)]],
    ],
    [220, 500],
  ),
  para([t(L.artText, { artText: gradient(['#2f6fed', '#7c3aed']), bold: true })]),
  heading(L.hApi),
  table(
    [
      head(L.apiHead),
      [[t(L.api1Name, { code: true })], [t(L.api1Desc)]],
      [[t(L.api2Name, { code: true })], [t(L.api2Desc)]],
      [[t(L.api3Name, { code: true })], [t(L.api3Desc)]],
      [[t(L.api4Name, { code: true })], [t(L.api4Desc)]],
      [[t(L.api5Name, { code: true })], [t(L.api5Desc)]],
      [[t(L.api6Name, { code: true })], [t(L.api6Desc)]],
    ],
    [220, 500],
  ),
  heading(L.hNext),
  para([t(L.nextPara)]),
];

// ---------------------------------------------------------------- 文章二：图形、样式与连线
const article2 = (L) => [
  title(L.title, '📐'),
  para(L.lead),
  heading(L.hCoord),
  CODE_COORD,
  para([t(L.coordPara)]),
  hint('tip', L.centerLabel, [t(L.centerText)]),
  heading(L.hShape),
  CODE_SHAPE,
  para([t(L.shapePara)]),
  heading(L.hFields),
  table(
    [
      head(L.fieldHead),
      [[t(L.f1Name, { code: true })], [t(L.f1Desc)]],
      [[t(L.f2Name, { code: true })], [t(L.f2Desc)]],
      [[t(L.f3Name, { code: true })], [t(L.f3Desc)]],
      [[t(L.f4Name, { code: true })], [t(L.f4Desc)]],
      [[t(L.f5Name, { code: true })], [t(L.f5Desc)]],
      [[t(L.f6Name, { code: true })], [t(L.f6Desc)]],
      [[t(L.f7Name, { code: true })], [t(L.f7Desc)]],
      [[t(L.f8Name, { code: true })], [t(L.f8Desc)]],
    ],
    [220, 500],
  ),
  heading(L.hStyle),
  CODE_STYLE,
  para([t(L.stylePara, { fontFamily: JINSHU })]),
  heading(L.hCatalog),
  table(
    [
      head(L.catHead),
      [[t(L.cat1)], [t(L.cat1Ex, { code: true })]],
      [[t(L.cat2)], [t(L.cat2Ex, { code: true })]],
      [[t(L.cat3)], [t(L.cat3Ex, { code: true })]],
      [[t(L.cat4)], [t(L.cat4Ex, { code: true })]],
      [[t(L.cat5)], [t(L.cat5Ex, { code: true })]],
      [[t(L.cat6)], [t(L.cat6Ex, { code: true })]],
    ],
    [220, 500],
  ),
  heading(L.hArrow),
  CODE_ARROW,
  para([t(L.arrowPara)]),
  BOARD_BINDINGS,
  hint('tip', L.handleLabel, [t(L.handleText)]),
  heading(L.hGroup),
  CODE_GROUP,
  para([t(L.groupPara)]),
  heading(L.hNext),
  para([t(L.nextPara)]),
];

// ---------------------------------------------------------------- 文章三：drawui-react 组件指南
const article3 = (L) => [
  title(L.title, '⚛️'),
  para(L.lead),
  IMG_REACT,
  heading(L.hInstall),
  CODE_R_INSTALL,
  hint('info', L.installHintLabel, [t(L.installHint)]),
  heading(L.hBasic),
  CODE_REACT,
  para([t(L.basicPara)]),
  hint('tip', L.basicHintLabel, [t(L.basicHintText)]),
  heading(L.hProps),
  table(
    [
      head(L.propHead),
      [[t(L.p1n, { code: true })], [t(L.p1d)]],
      [[t(L.p2n, { code: true })], [t(L.p2d)]],
      [[t(L.p3n, { code: true })], [t(L.p3d)]],
      [[t(L.p4n, { code: true })], [t(L.p4d)]],
      [[t(L.p5n, { code: true })], [t(L.p5d)]],
      [[t(L.p6n, { code: true })], [t(L.p6d)]],
    ],
    [220, 500],
  ),
  heading(L.hControl),
  CODE_R_REF,
  para([t(L.controlPara)]),
  heading(L.hData),
  CODE_R_DATA,
  para([t(L.dataPara)]),
  heading(L.hLifecycle),
  CODE_R_SUBSCRIBE,
  para([t(L.lifePara)]),
  hint('warning', L.lifeHintLabel, [t(L.lifeHintText)]),
  heading(L.hTheme),
  CODE_R_THEME,
  para([t(L.themePara)]),
  heading(L.hExport),
  CODE_R_EXPORT,
  para([t(L.exportPara)]),
  heading(L.hDemo),
  BOARD_BINDINGS,
  hint('info', L.demoHintLabel, [t(L.demoHintText)]),
  heading(L.hNext),
  para([t(L.nextPara)]),
];

// ---------------------------------------------------------------- 7 语言文案
const docs = {
  en: {
    a1: {
      title: 'Getting started with drawui-core',
      summary:
        'A runnable walkthrough: create a canvas, draw a shape, subscribe to changes, save the document and export an image.',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' is a whiteboard engine for the browser. You give it a canvas plus an array of shapes; it renders them, handles dragging and zooming, keeps an undo history and exports the result. This tutorial builds one small board step by step and says exactly what you should see after each step.',
        ),
      ],
      jinshu: 'The board is data. Pixels only exist while the engine paints.',
      hGoal: 'What you will end up with',
      goalLabel: 'End result',
      goalText:
        'A 480-pixel-tall canvas with one blue rounded rectangle in the middle that says “Hello drawui”. You can drag it around. Every change prints the shape count to the console. After a reload the same board comes back, and one call exports it as a PNG.',
      hInstall: 'Install',
      installHintLabel: 'No framework required',
      installHint:
        'drawui-core does not depend on React or Vue. The only runtime requirement is an HTML canvas. If you work in React, read the component guide in the “drawui-react” category instead — CanvasBoard wraps the engine, toolbar and panels for you.',
      hStep1: 'Step 1 · Create the canvas and the editor',
      step1Para:
        'One canvas gets exactly one Editor. A second editor on the same canvas means two render loops fighting over the same pixels. The language option only changes built-in text such as the context menu; the text you draw is untouched. The editor reads its size from CSS, so setting width and height on the element is enough — retina screens are handled internally.',
      hStep2: 'Step 2 · Put the first shape in',
      step2Para:
        'setShapes replaces the whole document. Coordinates are world coordinates, and x / y address the center of the shape, not its top-left corner. This is the number one reason people think their rectangle disappeared: the position they wrote is its middle, not its left edge.',
      centerLabel: 'Center, not top-left',
      centerText:
        'A shape with x: 320, y: 240 and width: 200 has its center at (320, 240). Its left edge sits at 320 − 100 = 220. To place something by its corner, compute the center yourself: x = left + width / 2.',
      hStep3: 'Step 3 · Subscribe, and unsubscribe when you leave',
      step3Para:
        'subscribe() registers a listener: the engine calls it after every change — dragging, resizing, text editing, undo and each setShapes call. Inside that callback getShapes() returns the current document, which makes it the natural place for autosave. Registering this listener is “subscribing”; removing it again is “unsubscribing”.',
      unsubLabel: 'Always keep the unsubscribe function',
      unsubText:
        'Unsubscribing means removing that listener — it does not mean closing the canvas. Call the function returned by subscribe() when the canvas is no longer your responsibility: your React component unmounts, the page or modal closes, or you destroy / recreate the editor. If you never call it, listeners pile up: duplicate saves, growing memory, and callbacks firing against a destroyed canvas. In React, return it from useEffect and the cleanup runs automatically.',
      hStep4: 'Step 4 · Save and restore the document',
      savePara:
        'exportJSON returns a readable string containing shapes, the camera (x, y, zoom) and a version number. Store it wherever you like. importJSON validates the payload and returns false instead of throwing, so corrupt data becomes an ordinary error branch.',
      hStep5: 'Step 5 · Export a picture',
      exportPara:
        'downloadImage triggers the browser download; exportImage resolves to a Blob you can upload or preview. Use scale: 2 for crisp text on retina screens and in slide decks, and padding to add breathing room around the board.',
      hStep6: 'Step 6 · Undo and redo',
      historyPara:
        'Undo history is built in and keyboard shortcuts work out of the box. canUndo() and canRedo() let a toolbar button disable itself instead of silently doing nothing.',
      hSee: 'What you see after each step',
      seeHead: ['Step', 'What you see'],
      see1: 'An empty 480-pixel canvas — no shapes yet. That is expected.',
      see2: 'A blue rounded rectangle labelled “Hello drawui” sits in the middle and follows the mouse when you drag it.',
      see3: 'Open the browser console (F12) and drag the rectangle: every change prints a line such as “shape count: 1”.',
      see4: 'After a reload the shape is still there, provided you pass the saved JSON back to importJSON.',
      see5: 'The browser downloads board.png at twice the canvas resolution.',
      see6: 'Ctrl / Cmd + Z steps back one change; Ctrl / Cmd + Shift + Z steps forward again.',
      artText: 'Document in, pixels out.',
      hReact: 'Use it from React',
      reactPara:
        'drawui-react packages the editor, toolbar, zoom control and style panel into one component. Import the CSS file, otherwise the toolbar renders unstyled. onReady gives you the Editor instance for setShapes, undo or export; onChange fires with the current document and camera and is the easiest autosave hook.',
      hApi: 'Editor methods at a glance',
      apiHead: ['Method', 'What it does'],
      api1Name: 'setShapes(shapes)',
      api1Desc: 'Replace the whole document. Used for initial data and programmatic edits. It also pushes an undo step.',
      api2Name: 'getShapes()',
      api2Desc: 'Read the current shapes. Call it inside the subscribe callback to get fresh data.',
      api3Name: 'subscribe(fn)',
      api3Desc: 'Register a change listener. Returns the unsubscribe function; call it on unmount or when you no longer need notifications.',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc: 'Serialise the document (shapes + camera) and restore it later; importJSON returns a boolean.',
      api5Name: 'exportImage(format, opts)',
      api5Desc: 'Promise<Blob> for png, svg or pdf. Options: scale, padding, background.',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc: 'Step through history; canUndo and canRedo drive disabled button states.',
      hNext: "What's next",
      nextPara:
        'Read “Shapes, styles and connections”. It documents every field of a shape, what each style key changes visually, and how bindings keep arrows glued to shapes while you drag them.',
    },
    a2: {
      title: 'Shapes, styles and connections',
      summary:
        'The shape object is the whole model: coordinates, rotation, text, style, grouping and arrow bindings.',
      lead: [
        t('Every board is an array of shapes in '),
        t('world coordinates', { highlight: '#fff3bf', bold: true }),
        t(
          '. Once these fields make sense, rendering, editing and export stop surprising you. Everything below is plain JSON — no hidden editor state.',
        ),
      ],
      hCoord: 'Coordinates: x / y is the center',
      coordPara:
        'Positions are stored in world coordinates; there are no nested offsets. Reading the shapes, changing one number and writing them back is a normal workflow, and it creates an undo step like any other edit.',
      centerLabel: 'x / y is the center',
      centerText:
        'A shape at x: 200, y: 200 with width: 160 spans 120 → 280 horizontally. Add 120 to x and its center becomes 320; what moves is always the center, never the top-left corner.',
      hShape: 'One shape, every field',
      shapePara:
        'You only need the fields that matter to you; the engine fills in type-specific defaults for size and style at render time. What you pass to setShapes is exactly what exportJSON writes back.',
      hFields: 'Field reference',
      fieldHead: ['Field', 'What it does'],
      f1Name: 'id',
      f1Desc: 'Unique id. Bindings, selection, undo and delete all point at it — never reuse one.',
      f2Name: 'type',
      f2Desc: 'Shape type such as rectangle, diamond or arrow. See the catalogue below.',
      f3Name: 'x / y',
      f3Desc: 'Center point in world coordinates. Not the top-left corner.',
      f4Name: 'width / height',
      f4Desc: 'Size in pixels. Circles use radius instead; text shapes can omit sizes.',
      f5Name: 'rotation',
      f5Desc: 'Rotation in degrees around the shape center. 0 means upright.',
      f6Name: 'text / textColor / fontSize',
      f6Desc: 'Label drawn inside the shape and its typography. Double-click edits it in the editor.',
      f7Name: 'locked / groupId',
      f7Desc: 'locked: true selects but never drags. Shapes sharing a groupId move together.',
      f8Name: 'style',
      f8Desc: 'Stroke and fill object; each key is explained in the next section.',
      hStyle: 'Style: what each key changes',
      stylePara:
        'Canvas, SVG and PNG all read the same style object, so what you see while editing is what lands in the export. Reusing one style object across shapes is the fastest way to keep a board visually consistent.',
      hCatalog: 'Built-in shapes',
      catHead: ['Group', 'Examples of type'],
      cat1: 'Basic',
      cat1Ex: 'rectangle, rounded-rectangle, circle, ellipse, diamond, triangle, hexagon',
      cat2: 'Flow and document',
      cat2Ex: 'stadium, parallelogram, document, delay, predefined-process, cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class, uml-interface',
      cat4: 'Diagrams',
      cat4Ex: 'mind-map, table, sticky-note',
      cat5: 'Media',
      cat5Ex: 'image, icon, draw',
      cat6: 'Lines',
      cat6Ex: 'line, arrow, text',
      hArrow: 'Connections: bind shapes, not coordinates',
      arrowPara:
        'An arrow is also a shape, but its endpoints should be bindings. points is only the initial geometry: once startBinding and endBinding exist, the engine recomputes both endpoints from the shapes, which is why a bound arrow follows a box when you drag it and never falls apart.',
      handleLabel: 'handle and auto',
      handleText:
        'handle picks the side to attach to: top, bottom, left or right. Add auto: true to the end binding and the engine re-picks the best side whenever the two shapes move — the board below still looks right after you drag Target under Source.',
      hGroup: 'Groups and locking',
      groupPara:
        'The same groupId on several shapes makes them select and move as one unit; locked: true keeps a shape out of dragging while remaining selectable. Both are document fields, so you can toggle them from code without touching the UI.',
      hNext: "What's next",
      nextPara:
        'Next article: exporting and serialising a document in depth (camera, versioning, import validation), then themes and the seven built-in UI languages.',
    },
  },

  zh: {
    a1: {
      title: 'drawui-core 快速上手',
      summary: '一份能跑起来的逐步教程：建画布、画第一个图形、订阅变化、保存文档、导出图片。',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' 是浏览器里的白板引擎。你给它一块画布和一组图形数据，它负责绘制、拖拽缩放、撤销历史和导出。这篇教程一步一步搭出一块小画板，并说清楚每一步做完之后应该看到什么。',
        ),
      ],
      jinshu: '画板就是数据，像素只在引擎绘制的那一瞬间存在。',
      hGoal: '做完你会得到什么',
      goalLabel: '最终效果',
      goalText:
        '一块高 480px 的画布，中间一个写着「Hello drawui」的蓝色圆角矩形。它能被拖动；每次变动控制台都会打印图形数量；刷新后能恢复同一块画板；再调用一次就能导出 PNG。',
      hInstall: '安装',
      installHintLabel: '不需要任何框架',
      installHint:
        'drawui-core 不依赖 React 或 Vue，运行时只需要一块 canvas。如果你用 React，请直接读「drawui-react」分类下的组件指南——CanvasBoard 已经把引擎、工具栏和面板都包好了。',
      hStep1: '第 1 步 · 创建画布和编辑器',
      step1Para:
        '一块画布只能对应一个 Editor。同一块画布上建两个编辑器，会有两套渲染循环抢同一批像素。language 只影响右键菜单这类内置文案，不会动你画上去的文字。编辑器从 CSS 读取画布尺寸，所以给元素设好宽高就够了，高分屏（DPR）由引擎内部处理。',
      hStep2: '第 2 步 · 放入第一个图形',
      step2Para:
        'setShapes 会整体替换文档。坐标是世界坐标，x / y 指的是图形中心，不是左上角。这也是最常见的困惑来源：写下的位置是图形中点，看起来就像「矩形跑到别处去了」。',
      centerLabel: '是中心，不是左上角',
      centerText:
        'x: 320、y: 240、width: 200 的图形，中心在 (320, 240)，左边缘在 320 − 100 = 220。想按左上角摆放，就自己换算中心：x = 左边 + 宽 / 2。',
      hStep3: '第 3 步 · 订阅变化，并在离开时解绑',
      step3Para:
        'subscribe() 做的事就是「注册一个监听器」：画布每次变化——拖动、缩放、改文字、撤销、调用 setShapes——引擎都会回调它一次。回调里用 getShapes() 拿到的是最新文档，这也是做自动保存最自然的位置。注册这个监听器叫「订阅」，把它移除掉叫「解绑」。',
      unsubLabel: '一定要保留取消订阅函数',
      unsubText:
        '解绑不是「把画布关掉」，而是「这块画布将来不再由你负责」：React 组件卸载、页面跳走、弹窗关闭，或者你要销毁、重建编辑器之前。调用 subscribe() 返回的那个函数即可注销；不调用的话监听器会一直留在内存里，导致重复保存、内存一路上涨，甚至回调打到已经销毁的画布上。React 里把它作为 useEffect 的 return 值，卸载时会自动执行。',
      hStep4: '第 4 步 · 保存与恢复文档',
      savePara:
        'exportJSON 返回一个可读字符串，里面有图形、相机（x、y、zoom）和版本号，存哪里都行。importJSON 会校验数据，遇到坏数据返回 false 而不是抛异常，于是「数据损坏」就变成一条普通的错误分支。',
      hStep5: '第 5 步 · 导出图片',
      exportPara:
        'downloadImage 直接触发浏览器下载；exportImage 返回 Blob，可以自己上传或预览。scale: 2 让文字在高分屏和演示文稿里更清晰，padding 给画板四周留白。',
      hStep6: '第 6 步 · 撤销与重做',
      historyPara:
        '撤销历史是内置的，快捷键开箱即用。canUndo() / canRedo() 可以让工具栏按钮正确置灰，而不是点了没反应。',
      hSee: '每一步做完会看到什么',
      seeHead: ['步骤', '你会看到'],
      see1: '页面出现一块 480px 高的空白画布，还没有任何图形 —— 这是正常的。',
      see2: '画布中央出现一个蓝色圆角矩形，写着「Hello drawui」，用鼠标就能拖着走。',
      see3: '打开浏览器控制台（F12），拖动一下矩形：每动一次就打印一行「shape count: 1」。',
      see4: '刷新页面后图形还在（前提是把存下的 json 交给 importJSON）。',
      see5: '浏览器弹出下载，得到一个 board.png，分辨率是画布的两倍。',
      see6: '按 Ctrl / Cmd + Z 图形退回上一步，按 Ctrl / Cmd + Shift + Z 再前进回去。',
      artText: '文档进，像素出。',
      hReact: '在 React 项目中使用',
      reactPara:
        'drawui-react 把编辑器、工具栏、缩放控件、样式面板打成一个组件。记得引入 CSS，否则工具栏没有样式。onReady 拿到 Editor，可继续 setShapes / undo / exportJSON；onChange 会在文档或相机变化时回调，是最省事的自动保存入口。',
      hApi: 'Editor 常用方法一览',
      apiHead: ['方法', '作用'],
      api1Name: 'setShapes(shapes)',
      api1Desc: '整体替换文档。初始数据和程序化编辑都用它，也会写入一步撤销历史。',
      api2Name: 'getShapes()',
      api2Desc: '读取当前图形；在 subscribe 回调里调用才能拿到最新数据。',
      api3Name: 'subscribe(fn)',
      api3Desc: '注册变化监听器，返回「解绑函数」；组件卸载或不再需要通知时调用它。',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc: '序列化文档（图形 + 相机）并可稍后恢复；importJSON 返回布尔值。',
      api5Name: 'exportImage(format, opts)',
      api5Desc: '返回 Promise<Blob>，支持 png / svg / pdf，选项有 scale、padding、background。',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc: '在历史里前后跳；canUndo / canRedo 用于按钮置灰。',
      hNext: '接下来读什么',
      nextPara:
        '继续读《图形、样式与连线》：逐个讲清图形的每个字段、样式里每个键的视觉效果，以及绑定如何让箭头在拖动图形时始终粘住。',
    },
    a2: {
      title: '图形、样式与连线',
      summary: '图形对象就是全部模型：坐标、旋转、文字、样式、分组和箭头绑定。',
      lead: [
        t('每块画板都是一个位于 '),
        t('世界坐标', { highlight: '#fff3bf', bold: true }),
        t(' 下的图形数组。把这些字段吃透，渲染、编辑和导出就不会再出乎意料。下面全部是普通 JSON，没有隐藏的编辑器状态。'),
      ],
      hCoord: '坐标：x / y 是中心点',
      coordPara:
        '位置直接存世界坐标，没有层层嵌套的偏移。读出来、改一个数字、再写回去，就是正常用法，而且和手动编辑一样会生成一步撤销历史。',
      centerLabel: 'x / y 就是中心点',
      centerText:
        'x: 200、y: 200、width: 160 的图形，横向范围是 120 ~ 280。把 x 加 120，中心就变成 320 —— 动的始终是中心，不是左上角。',
      hShape: '一个图形包含哪些字段',
      shapePara:
        '只写你关心的字段就行，尺寸和样式在渲染时由引擎按类型补默认值。传给 setShapes 的内容，就是 exportJSON 原样写回的内容。',
      hFields: '字段说明',
      fieldHead: ['字段', '作用'],
      f1Name: 'id',
      f1Desc: '唯一标识。绑定、选中、撤销、删除都指着它，千万不要复用。',
      f2Name: 'type',
      f2Desc: '图形类型，例如 rectangle、diamond、arrow，完整清单见下方表格。',
      f3Name: 'x / y',
      f3Desc: '世界坐标中的中心点，不是左上角。',
      f4Name: 'width / height',
      f4Desc: '像素尺寸。圆形用 radius；纯文字图形可以省略尺寸。',
      f5Name: 'rotation',
      f5Desc: '绕图形中心旋转的角度（度），0 表示不旋转。',
      f6Name: 'text / textColor / fontSize',
      f6Desc: '画在图形里的文字及其排版；编辑器里双击即可修改。',
      f7Name: 'locked / groupId',
      f7Desc: 'locked 为 true 时可选但拖不动；相同 groupId 的图形一起移动。',
      f8Name: 'style',
      f8Desc: '边框与填充对象，每个键的视觉效果在下一节说明。',
      hStyle: '样式：每个键改变什么',
      stylePara:
        '画布、SVG、PNG 读的是同一份样式对象，所以编辑时看到的就是导出得到的。多个图形共用一个 style 对象，是让整块画板风格统一的最快办法。',
      hCatalog: '内置图形清单',
      catHead: ['类别', '常见 type'],
      cat1: '基础图形',
      cat1Ex: 'rectangle、rounded-rectangle、circle、ellipse、diamond、triangle、hexagon',
      cat2: '流程图与文档',
      cat2Ex: 'stadium、parallelogram、document、delay、predefined-process、cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class、uml-interface',
      cat4: '图表',
      cat4Ex: 'mind-map、table、sticky-note',
      cat5: '媒体',
      cat5Ex: 'image、icon、draw',
      cat6: '线条',
      cat6Ex: 'line、arrow、text',
      hArrow: '连线：绑图形，不绑坐标',
      arrowPara:
        '箭头本身也是一个图形，但两端应该用绑定。points 只是初始几何：一旦写了 startBinding 和 endBinding，引擎会根据图形当前位置重算两个端点——所以你拖动盒子时，绑定过的箭头会跟着走，永远不会散架。',
      handleLabel: 'handle 与 auto',
      handleText:
        'handle 指定接入哪条边：top、bottom、left、right。给终点绑定加 auto: true，引擎会在两个图形移动后重新挑最优接入边——下面这块画板把 Target 拖到 Source 下方，线依然是对的。',
      hGroup: '分组与锁定',
      groupPara:
        '多个图形用同一个 groupId，就能整体选中和移动；locked: true 让图形可选但不可拖动。两者都是文档字段，代码里就能切换，不需要碰界面。',
      hNext: '接下来读什么',
      nextPara: '下一篇：深入导出与序列化（相机、版本号、导入校验），然后是主题与 7 种内置界面语言。',
    },
  },

  'zh-TW': {
    a1: {
      title: 'drawui-core 快速上手',
      summary: '一份能跑起來的逐步教學：建立畫布、畫第一個圖形、訂閱變化、儲存文件、匯出圖片。',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' 是瀏覽器裡的白板引擎。你給它一塊畫布和一組圖形資料，它負責繪製、拖曳縮放、復原歷史和匯出。這篇教學一步一步搭出一塊小畫板，並說清楚每一步做完之後應該看到什麼。',
        ),
      ],
      jinshu: '畫板就是資料，像素只在引擎繪製的那一瞬間存在。',
      hGoal: '做完你會得到什麼',
      goalLabel: '最終效果',
      goalText:
        '一塊高 480px 的畫布，中間一個寫著「Hello drawui」的藍色圓角矩形。它能被拖曳；每次變動主控台都會印出圖形數量；重新整理後能還原同一塊畫板；再呼叫一次就能匯出 PNG。',
      hInstall: '安裝',
      installHintLabel: '不需要任何框架',
      installHint:
        'drawui-core 不依賴 React 或 Vue，執行環境只需要一塊 canvas。如果你用 React，請直接讀「drawui-react」分類下的元件指南——CanvasBoard 已經把引擎、工具列和面板都包好了。',
      hStep1: '第 1 步 · 建立畫布和編輯器',
      step1Para:
        '一塊畫布只能對應一個 Editor。同一塊畫布上建立兩個編輯器，會有兩套渲染迴圈搶同一批像素。language 只影響右鍵選單這類內建文案，不會動你畫上去的文字。編輯器從 CSS 讀取畫布尺寸，所以給元素設好寬高就夠了，高解析螢幕（DPR）由引擎內部處理。',
      hStep2: '第 2 步 · 放入第一個圖形',
      step2Para:
        'setShapes 會整體替換文件。座標是世界座標，x / y 指的是圖形中心，不是左上角。這也是最常見的困惑來源：寫下的位置是圖形中點，看起來就像「矩形跑到別處去了」。',
      centerLabel: '是中心，不是左上角',
      centerText:
        'x: 320、y: 240、width: 200 的圖形，中心在 (320, 240)，左邊緣在 320 − 100 = 220。想按左上角擺放，就自己換算中心：x = 左邊 + 寬 / 2。',
      hStep3: '第 3 步 · 訂閱變化，並在離開時解除訂閱',
      step3Para:
        'subscribe() 做的事就是「註冊一個監聽器」：畫布每次變化——拖曳、縮放、改文字、復原、呼叫 setShapes——引擎都會回呼它一次。回呼裡用 getShapes() 拿到的是最新文件，這也是做自動儲存最自然的位置。註冊這個監聽器叫「訂閱」，把它移除掉叫「解除訂閱」。',
      unsubLabel: '一定要保留解除訂閱函式',
      unsubText:
        '解除訂閱不是「把畫布關掉」，而是「這塊畫布將來不再由你負責」：React 元件卸載、頁面跳走、彈窗關閉，或者你要銷毀、重建編輯器之前。呼叫 subscribe() 回傳的那個函式即可註銷；不呼叫的話監聽器會一直留在記憶體裡，導致重複儲存、記憶體一路上漲，甚至回呼打到已經銷毀的畫布上。React 裡把它作為 useEffect 的 return 值，卸載時會自動執行。',
      hStep4: '第 4 步 · 儲存與還原文件',
      savePara:
        'exportJSON 回傳一個可讀字串，裡面有圖形、相機（x、y、zoom）和版本號，存哪裡都行。importJSON 會驗證資料，遇到壞資料回傳 false 而不是拋出例外，於是「資料損毀」就變成一條普通的錯誤分支。',
      hStep5: '第 5 步 · 匯出圖片',
      exportPara:
        'downloadImage 直接觸發瀏覽器下載；exportImage 回傳 Blob，可以自己上傳或預覽。scale: 2 讓文字在高解析螢幕和簡報裡更清晰，padding 給畫板四周留白。',
      hStep6: '第 6 步 · 復原與重做',
      historyPara:
        '復原歷史是內建的，快速鍵開箱即用。canUndo() / canRedo() 可以讓工具列按鈕正確變灰，而不是點了沒反應。',
      hSee: '每一步做完會看到什麼',
      seeHead: ['步驟', '你會看到'],
      see1: '頁面出現一塊 480px 高的空白畫布，還沒有任何圖形 —— 這是正常的。',
      see2: '畫布中央出現一個藍色圓角矩形，寫著「Hello drawui」，用滑鼠就能拖著走。',
      see3: '打開瀏覽器主控台（F12），拖曳一下矩形：每動一次就印出一行「shape count: 1」。',
      see4: '重新整理頁面後圖形還在（前提是把存下的 json 交給 importJSON）。',
      see5: '瀏覽器彈出下載，得到一個 board.png，解析度是畫布的兩倍。',
      see6: '按 Ctrl / Cmd + Z 圖形退回上一步，按 Ctrl / Cmd + Shift + Z 再前進回去。',
      artText: '文件進，像素出。',
      hReact: '在 React 專案中使用',
      reactPara:
        'drawui-react 把編輯器、工具列、縮放控制、樣式面板打成一個元件。記得引入 CSS，否則工具列沒有樣式。onReady 拿到 Editor，可繼續 setShapes / undo / exportJSON；onChange 會在文件或相機變化時回呼，是最省事的自動儲存入口。',
      hApi: 'Editor 常用方法一覽',
      apiHead: ['方法', '作用'],
      api1Name: 'setShapes(shapes)',
      api1Desc: '整體替換文件。初始資料和程式化編輯都用它，也會寫入一步復原歷史。',
      api2Name: 'getShapes()',
      api2Desc: '讀取目前圖形；在 subscribe 回呼裡呼叫才能拿到最新資料。',
      api3Name: 'subscribe(fn)',
      api3Desc: '註冊變化監聽器，回傳「解除訂閱函式」；元件卸載或不再需要通知時呼叫它。',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc: '序列化文件（圖形 + 相機）並可稍後還原；importJSON 回傳布林值。',
      api5Name: 'exportImage(format, opts)',
      api5Desc: '回傳 Promise<Blob>，支援 png / svg / pdf，選項有 scale、padding、background。',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc: '在歷史裡前後跳；canUndo / canRedo 用於按鈕變灰。',
      hNext: '接下來讀什麼',
      nextPara:
        '繼續讀《圖形、樣式與連線》：逐個講清圖形的每個欄位、樣式裡每個鍵的視覺效果，以及綁定如何讓箭頭在拖曳圖形時始終黏住。',
    },
    a2: {
      title: '圖形、樣式與連線',
      summary: '圖形物件就是全部模型：座標、旋轉、文字、樣式、分組和箭頭綁定。',
      lead: [
        t('每塊畫板都是一個位於 '),
        t('世界座標', { highlight: '#fff3bf', bold: true }),
        t(' 下的圖形陣列。把這些欄位吃透，渲染、編輯和匯出就不會再出乎意料。下面全部是普通 JSON，沒有隱藏的編輯器狀態。'),
      ],
      hCoord: '座標：x / y 是中心點',
      coordPara:
        '位置直接存世界座標，沒有層層嵌套的偏移。讀出來、改一個數字、再寫回去，就是正常用法，而且和手動編輯一樣會產生一步復原歷史。',
      centerLabel: 'x / y 就是中心點',
      centerText:
        'x: 200、y: 200、width: 160 的圖形，橫向範圍是 120 ~ 280。把 x 加 120，中心就變成 320 —— 動的始終是中心，不是左上角。',
      hShape: '一個圖形包含哪些欄位',
      shapePara:
        '只寫你關心的欄位就行，尺寸和樣式在渲染時由引擎按類型補預設值。傳給 setShapes 的內容，就是 exportJSON 原樣寫回的內容。',
      hFields: '欄位說明',
      fieldHead: ['欄位', '作用'],
      f1Name: 'id',
      f1Desc: '唯一識別碼。綁定、選取、復原、刪除都指著它，千萬不要重複使用。',
      f2Name: 'type',
      f2Desc: '圖形類型，例如 rectangle、diamond、arrow，完整清單見下方表格。',
      f3Name: 'x / y',
      f3Desc: '世界座標中的中心點，不是左上角。',
      f4Name: 'width / height',
      f4Desc: '像素尺寸。圓形用 radius；純文字圖形可以省略尺寸。',
      f5Name: 'rotation',
      f5Desc: '繞圖形中心旋轉的角度（度），0 表示不旋轉。',
      f6Name: 'text / textColor / fontSize',
      f6Desc: '畫在圖形裡的文字及其排版；編輯器裡雙擊即可修改。',
      f7Name: 'locked / groupId',
      f7Desc: 'locked 為 true 時可選但拖不動；相同 groupId 的圖形一起移動。',
      f8Name: 'style',
      f8Desc: '邊框與填充物件，每個鍵的視覺效果在下一節說明。',
      hStyle: '樣式：每個鍵改變什麼',
      stylePara:
        '畫布、SVG、PNG 讀的是同一份樣式物件，所以編輯時看到的就是匯出得到的。多個圖形共用一個 style 物件，是讓整塊畫板風格統一的最快辦法。',
      hCatalog: '內建圖形清單',
      catHead: ['類別', '常見 type'],
      cat1: '基礎圖形',
      cat1Ex: 'rectangle、rounded-rectangle、circle、ellipse、diamond、triangle、hexagon',
      cat2: '流程圖與文件',
      cat2Ex: 'stadium、parallelogram、document、delay、predefined-process、cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class、uml-interface',
      cat4: '圖表',
      cat4Ex: 'mind-map、table、sticky-note',
      cat5: '媒體',
      cat5Ex: 'image、icon、draw',
      cat6: '線條',
      cat6Ex: 'line、arrow、text',
      hArrow: '連線：綁圖形，不綁座標',
      arrowPara:
        '箭頭本身也是一個圖形，但兩端應該用綁定。points 只是初始幾何：一旦寫了 startBinding 和 endBinding，引擎會根據圖形目前位置重算兩個端點——所以你拖曳方塊時，綁定過的箭頭會跟著走，永遠不會散架。',
      handleLabel: 'handle 與 auto',
      handleText:
        'handle 指定接入哪條邊：top、bottom、left、right。給終點綁定加 auto: true，引擎會在兩個圖形移動後重新挑最佳接入邊——下面這塊畫板把 Target 拖到 Source 下方，線依然是對的。',
      hGroup: '分組與鎖定',
      groupPara:
        '多個圖形用同一個 groupId，就能整體選取和移動；locked: true 讓圖形可選但不可拖曳。兩者都是文件欄位，程式碼裡就能切換，不需要碰介面。',
      hNext: '接下來讀什麼',
      nextPara: '下一篇：深入匯出與序列化（相機、版本號、匯入驗證），然後是主題與 7 種內建介面語言。',
    },
  },

  ja: {
    a1: {
      title: 'drawui-core 入門',
      summary: '実際に動かせるチュートリアル：キャンバス作成、図形の描画、変更の購読、保存、画像エクスポート。',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' はブラウザ向けのホワイトボードエンジンです。キャンバスと図形の配列を渡すと、描画・ドラッグ・ズーム・元に戻す・エクスポートを担当します。この記事では小さなボードを手順ごとに作り、各ステップの後に何が見えるべきかを説明します。',
        ),
      ],
      jinshu: 'ボードはデータです。ピクセルはエンジンが描く一瞬だけ存在します。',
      hGoal: '完成すると何ができるか',
      goalLabel: '最終結果',
      goalText:
        '高さ 480px のキャンバスに、「Hello drawui」と書かれた青い角丸四角形が 1 つ表示されます。ドラッグでき、変更のたびにコンソールへ図形数が出力されます。再読み込みで同じボードが復元され、1 回の呼び出しで PNG を書き出せます。',
      hInstall: 'インストール',
      installHintLabel: 'フレームワーク不要',
      installHint:
        'drawui-core は React / Vue に依存しません。実行時に必要なのは HTML の canvas だけです。React の場合は「drawui-react」カテゴリのコンポーネントガイドを読んでください。CanvasBoard がエンジン・ツールバー・パネルをまとめてくれます。',
      hStep1: 'ステップ 1 · キャンバスとエディタを作る',
      step1Para:
        '1 つのキャンバスに対して Editor は 1 つだけ。同じ canvas に 2 つ作ると、2 つの描画ループが同じピクセルを取り合います。language は右クリックメニューなどの組み込み文言だけを変え、描いた文字には影響しません。サイズは CSS から読み取るので、要素に幅と高さを指定すれば十分です（高解像度は内部で処理）。',
      hStep2: 'ステップ 2 · 最初の図形を置く',
      step2Para:
        'setShapes はドキュメント全体を置き換えます。座標はワールド座標で、x / y は図形の中心です（左上ではありません）。「四角形が消えた」と感じる最大の原因はこれで、書いた位置は左端ではなく中央です。',
      centerLabel: '中心であり、左上ではない',
      centerText:
        'x: 320、y: 240、width: 200 の図形は中心が (320, 240)、左端は 320 − 100 = 220 です。左上で配置したい場合は中心へ換算してください：x = 左 + 幅 / 2。',
      hStep3: 'ステップ 3 · 購読し、離れるときに解除する',
      step3Para:
        'subscribe() は「リスナーを登録する」操作です。キャンバスが変化するたび（ドラッグ、リサイズ、テキスト編集、元に戻す、setShapes の呼び出し）にエンジンがコールバックを呼びます。コールバック内で getShapes() を呼ぶと最新のドキュメントが取れ、自動保存に最適です。この登録が「購読」、リスナーを外すのが「解除」です。',
      unsubLabel: '解除関数を必ず保持する',
      unsubText:
        '解除は「キャンバスを閉じる」ことではなく、「このキャンバスを今後あなたが管理しない」ときに行います。React コンポーネントのアンマウント、ページ遷移、モーダルを閉じる、エディタを破棄・再作成する前、などです。subscribe() が返す関数を呼ぶだけで解除できます。呼ばないとリスナーが残り、保存の重複、メモリ増加、破棄済みキャンバスへのコールバックが発生します。React では useEffect の return 値にすればアンマウント時に自動実行されます。',
      hStep4: 'ステップ 4 · ドキュメントを保存して復元',
      savePara:
        'exportJSON は図形・カメラ（x, y, zoom）・バージョン番号を含む読みやすい文字列を返します。保存先はどこでも構いません。importJSON は内容を検証し、壊れたデータでは例外ではなく false を返すので、普通のエラー分岐として扱えます。',
      hStep5: 'ステップ 5 · 画像を書き出す',
      exportPara:
        'downloadImage はブラウザのダウンロードを開始し、exportImage は Blob を返します。scale: 2 で高解像度画面やスライドでも文字が鮮明になり、padding で余白を付けられます。',
      hStep6: 'ステップ 6 · 元に戻す・やり直す',
      historyPara:
        '履歴は組み込みで、キーボードショートカットもそのまま使えます。canUndo() / canRedo() でツールバーのボタンを正しく無効化できます。',
      hSee: '各ステップの後に見えるもの',
      seeHead: ['ステップ', '見えるもの'],
      see1: '高さ 480px の空のキャンバスが表示されます。図形はまだありません（正常です）。',
      see2: '中央に「Hello drawui」と書かれた青い角丸四角形が現れ、ドラッグで動かせます。',
      see3: 'ブラウザのコンソール（F12）を開いて四角形をドラッグすると、変更のたびに「shape count: 1」が出力されます。',
      see4: '再読み込みしても図形は残ります（保存した JSON を importJSON に渡した場合）。',
      see5: 'board.png がダウンロードされ、解像度はキャンバスの 2 倍になります。',
      see6: 'Ctrl / Cmd + Z で 1 手戻り、Ctrl / Cmd + Shift + Z でやり直せます。',
      artText: 'ドキュメントを入力、ピクセルを出力。',
      hReact: 'React での使い方',
      reactPara:
        'drawui-react はエディタ・ツールバー・ズーム・スタイルパネルを 1 つのコンポーネントにまとめます。CSS を読み込まないとツールバーにスタイルが付きません。onReady で Editor を取得し、onChange で最新のドキュメントとカメラを受け取れます（自動保存に最適）。',
      hApi: 'Editor の主なメソッド',
      apiHead: ['メソッド', '役割'],
      api1Name: 'setShapes(shapes)',
      api1Desc: 'ドキュメント全体を置き換えます。初期データやプログラム編集に使用。元に戻す履歴も 1 段追加されます。',
      api2Name: 'getShapes()',
      api2Desc: '現在の図形を読み取ります。subscribe のコールバック内で呼ぶと最新が取れます。',
      api3Name: 'subscribe(fn)',
      api3Desc: '変更リスナーを登録し、解除用の関数を返します。コンポーネントのアンマウント時や通知が不要になった時に呼びます。',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc: 'ドキュメント（図形 + カメラ）を文字列化し、後で復元。importJSON は真偽値を返します。',
      api5Name: 'exportImage(format, opts)',
      api5Desc: 'png / svg / pdf の Promise<Blob>。オプションは scale、padding、background。',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc: '履歴を前後に移動。canUndo / canRedo はボタンの無効化に使用。',
      hNext: '次に読む',
      nextPara:
        '「図形・スタイル・接続」へ。各フィールド、スタイルの各キーの見た目の変化、ドラッグしても矢印が外れないバインディングの仕組みを説明します。',
    },
    a2: {
      title: '図形・スタイル・接続',
      summary: '図形オブジェクトがモデルのすべてです。座標・回転・テキスト・スタイル・グループ・矢印バインディング。',
      lead: [
        t('ボードは '),
        t('ワールド座標', { highlight: '#fff3bf', bold: true }),
        t(' にある図形の配列です。これらのフィールドを理解すれば、描画・編集・エクスポートは予想どおりに動きます。以下はすべてただの JSON で、隠れたエディタ状態はありません。'),
      ],
      hCoord: '座標：x / y は中心',
      coordPara:
        '位置はワールド座標で直接保存され、入れ子のオフセットはありません。読み取って 1 つの数値を変えて書き戻すのは普通の使い方で、手動編集と同じく履歴に 1 段残ります。',
      centerLabel: 'x / y は中心',
      centerText:
        'x: 200、y: 200、width: 160 の図形は横方向に 120 〜 280 を占めます。x に 120 を足すと中心は 320 になり、動くのは常に中心で、左上ではありません。',
      hShape: '1 つの図形にあるフィールド',
      shapePara:
        '必要なフィールドだけ書けば十分です。サイズやスタイルは描画時に型ごとの既定値で補完されます。setShapes に渡した内容が exportJSON でそのまま書き戻されます。',
      hFields: 'フィールド一覧',
      fieldHead: ['フィールド', '役割'],
      f1Name: 'id',
      f1Desc: '一意な ID。バインディング・選択・元に戻す・削除が参照するので再利用しない。',
      f2Name: 'type',
      f2Desc: 'rectangle、diamond、arrow などの図形タイプ。下の一覧を参照。',
      f3Name: 'x / y',
      f3Desc: 'ワールド座標の中心点。左上ではない。',
      f4Name: 'width / height',
      f4Desc: 'ピクセルサイズ。円は radius を使用。テキスト図形は省略可。',
      f5Name: 'rotation',
      f5Desc: '図形中心まわりの回転角（度）。0 で正立。',
      f6Name: 'text / textColor / fontSize',
      f6Desc: '図形内に描くラベルと組版。エディタではダブルクリックで編集。',
      f7Name: 'locked / groupId',
      f7Desc: 'locked: true は選択可・ドラッグ不可。同じ groupId はまとめて移動。',
      f8Name: 'style',
      f8Desc: '線と塗りのオブジェクト。各キーは次の節で説明。',
      hStyle: 'スタイル：各キーが変えるもの',
      stylePara:
        'キャンバス・SVG・PNG は同じスタイルオブジェクトを読みます。編集時の見た目がそのまま出力されます。複数の図形で 1 つの style を共有すると、見た目を揃えられます。',
      hCatalog: '組み込み図形',
      catHead: ['分類', 'type の例'],
      cat1: '基本図形',
      cat1Ex: 'rectangle、rounded-rectangle、circle、ellipse、diamond、triangle、hexagon',
      cat2: 'フローとドキュメント',
      cat2Ex: 'stadium、parallelogram、document、delay、predefined-process、cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class、uml-interface',
      cat4: 'ダイアグラム',
      cat4Ex: 'mind-map、table、sticky-note',
      cat5: 'メディア',
      cat5Ex: 'image、icon、draw',
      cat6: '線',
      cat6Ex: 'line、arrow、text',
      hArrow: '接続：座標ではなく図形をバインド',
      arrowPara:
        '矢印も図形ですが、両端はバインディングにすべきです。points は初期の幾何情報にすぎません。startBinding と endBinding があると、エンジンが図形の現在位置から両端を再計算します。だからバインドされた矢印はドラッグしても付いてきて、決してバラバラになりません。',
      handleLabel: 'handle と auto',
      handleText:
        'handle は接続する辺（top / bottom / left / right）。終点に auto: true を付けると、2 つの図形が動くたびに最適な辺を選び直します。下のボードで Target を Source の下へドラッグしても線は正しいままです。',
      hGroup: 'グループとロック',
      groupPara:
        '複数の図形に同じ groupId を与えると 1 単位で選択・移動できます。locked: true は選択可のままドラッグを禁止します。どちらもドキュメントのフィールドなので、UI を触らずコードから切り替えられます。',
      hNext: '次に読む',
      nextPara:
        '次の記事：エクスポートとシリアライズの詳細（カメラ、バージョン、インポート検証）、その後にテーマと 7 つの組み込み UI 言語。',
    },
  },

  ko: {
    a1: {
      title: 'drawui-core 시작하기',
      summary:
        '실행해 볼 수 있는 단계별 튜토리얼: 캔버스 만들기, 첫 도형 그리기, 변경 구독, 문서 저장, 이미지 내보내기.',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' 는 브라우저용 화이트보드 엔진입니다. 캔버스와 도형 배열을 넘기면 그림을 그리고, 드래그와 줌을 처리하며, 되돌리기 기록과 내보내기를 제공합니다. 이 튜토리얼은 작은 보드를 한 단계씩 만들고, 각 단계를 마친 뒤 무엇이 보여야 하는지 설명합니다.',
        ),
      ],
      jinshu: '보드는 데이터입니다. 픽셀은 엔진이 그리는 순간에만 존재합니다.',
      hGoal: '완성하면 무엇이 보이나요',
      goalLabel: '최종 결과',
      goalText:
        '높이 480px 캔버스 가운데에 "Hello drawui"라고 적힌 파란색 둥근 사각형이 하나 보입니다. 드래그할 수 있고, 변경할 때마다 콘솔에 도형 개수가 출력됩니다. 새로고침하면 같은 보드가 복원되고, 호출 한 번으로 PNG를 내보낼 수 있습니다.',
      hInstall: '설치',
      installHintLabel: '프레임워크 필요 없음',
      installHint:
        'drawui-core는 React나 Vue에 의존하지 않습니다. 실행에 필요한 것은 HTML canvas 하나뿐입니다. React 프로젝트라면 「drawui-react」 카테고리의 컴포넌트 가이드를 읽으세요. CanvasBoard가 엔진, 툴바, 패널을 모두 감싸 줍니다.',
      hStep1: '단계 1 · 캔버스와 에디터 만들기',
      step1Para:
        '하나의 캔버스에는 Editor 하나만 만드세요. 같은 canvas에 두 개를 만들면 두 개의 렌더 루프가 같은 픽셀을 두고 다툽니다. language 옵션은 오른쪽 클릭 메뉴 같은 내장 문구만 바꾸고, 여러분이 그린 텍스트에는 영향을 주지 않습니다. 에디터는 CSS에서 크기를 읽으므로 요소에 너비와 높이를 지정하면 충분하고, 고해상도(DPR)는 내부에서 처리합니다.',
      hStep2: '단계 2 · 첫 번째 도형 넣기',
      step2Para:
        'setShapes는 문서 전체를 교체합니다. 좌표는 월드 좌표이고 x / y는 왼쪽 위 모서리가 아니라 도형의 중심입니다. "사각형이 사라졌다"라고 느끼는 가장 흔한 이유가 이 부분입니다. 적은 값은 왼쪽 끝이 아니라 중앙입니다.',
      centerLabel: '중심이며, 왼쪽 위가 아님',
      centerText:
        'x: 320, y: 240, width: 200인 도형의 중심은 (320, 240)이고 왼쪽 가장자리는 320 − 100 = 220입니다. 왼쪽 위 기준으로 배치하려면 중심으로 환산하세요: x = 왼쪽 + 너비 / 2.',
      hStep3: '단계 3 · 구독하고, 떠날 때 해제하기',
      step3Para:
        'subscribe()는 「리스너를 등록하는」 동작입니다. 캔버스가 바뀔 때마다(드래그, 크기 조절, 텍스트 편집, 되돌리기, setShapes 호출) 엔진이 콜백을 호출합니다. 콜백 안에서 getShapes()를 호출하면 최신 문서를 얻을 수 있어 자동 저장에 가장 알맞습니다. 이 등록이 「구독」, 리스너를 제거하는 것이 「해제」입니다.',
      unsubLabel: '구독 해제 함수를 반드시 보관하세요',
      unsubText:
        '해제는 「캔버스를 닫는」 일이 아니라, 「이 캔버스를 더 이상 당신이 관리하지 않을 때」 합니다. React 컴포넌트 언마운트, 페이지 이동, 모달 닫기, 에디터를 폐기하거나 다시 만들기 직전 등입니다. subscribe()가 돌려준 함수를 호출하면 해제됩니다. 호출하지 않으면 리스너가 계속 남아 저장 중복, 메모리 증가, 이미 폐기된 캔버스로의 콜백이 발생합니다. React에서는 useEffect의 return 값으로 두면 언마운트 시 자동 실행됩니다.',
      hStep4: '단계 4 · 문서 저장과 복원',
      savePara:
        'exportJSON은 도형, 카메라(x, y, zoom), 버전 번호를 담은 읽기 쉬운 문자열을 돌려줍니다. 어디에든 저장하면 됩니다. importJSON은 데이터를 검증하고 잘못된 데이터에는 예외를 던지는 대신 false를 돌려주므로 "데이터 손상"이 일반적인 에러 분기가 됩니다.',
      hStep5: '단계 5 · 이미지 내보내기',
      exportPara:
        'downloadImage는 브라우저 다운로드를 바로 실행하고, exportImage는 Blob을 돌려줍니다. scale: 2는 고해상도 화면과 발표 자료에서 텍스트를 선명하게 만들고, padding은 보드 주변에 여백을 줍니다.',
      hStep6: '단계 6 · 되돌리기와 다시 실행',
      historyPara:
        '되돌리기 기록은 내장되어 있고 키보드 단축키도 바로 쓸 수 있습니다. canUndo() / canRedo()로 툴바 버튼을 올바르게 비활성화할 수 있습니다.',
      hSee: '각 단계를 마치면 보이는 것',
      seeHead: ['단계', '보이는 것'],
      see1: '높이 480px의 빈 캔버스가 나타납니다. 아직 도형은 없습니다 — 정상입니다.',
      see2: '가운데에 「Hello drawui」라고 쓰인 파란 둥근 사각형이 나타나고, 마우스로 드래그할 수 있습니다.',
      see3: '브라우저 콘솔(F12)을 열고 사각형을 드래그하면 변경할 때마다 「shape count: 1」이 출력됩니다.',
      see4: '새로고침 후에도 도형이 남습니다(저장한 JSON을 importJSON에 넘긴 경우).',
      see5: 'board.png가 다운로드되며 해상도는 캔버스의 두 배입니다.',
      see6: 'Ctrl / Cmd + Z로 한 단계 되돌리고, Ctrl / Cmd + Shift + Z로 다시 진행합니다.',
      artText: '문서가 들어가고, 픽셀이 나옵니다.',
      hReact: 'React에서 사용하기',
      reactPara:
        'drawui-react는 에디터, 툴바, 줌 컨트롤, 스타일 패널을 하나의 컴포넌트로 묶습니다. CSS를 불러오지 않으면 툴바에 스타일이 적용되지 않습니다. onReady로 Editor를 받아 setShapes / undo / exportJSON을 쓸 수 있고, onChange는 문서나 카메라가 바뀔 때 호출되어 자동 저장에 가장 편합니다.',
      hApi: 'Editor 주요 메서드',
      apiHead: ['메서드', '역할'],
      api1Name: 'setShapes(shapes)',
      api1Desc: '문서 전체를 교체합니다. 초기 데이터와 코드로 하는 편집에 쓰며, 되돌리기 한 단계도 추가합니다.',
      api2Name: 'getShapes()',
      api2Desc: '현재 도형을 읽습니다. subscribe 콜백 안에서 호출해야 최신 데이터를 얻습니다.',
      api3Name: 'subscribe(fn)',
      api3Desc: '변경 리스너를 등록하고 해제 함수를 돌려줍니다. 컴포넌트 언마운트나 더 이상 알림이 필요 없을 때 호출하세요.',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc: '문서(도형 + 카메라)를 문자열로 만들고 나중에 복원합니다. importJSON은 불리언을 돌려줍니다.',
      api5Name: 'exportImage(format, opts)',
      api5Desc: 'png / svg / pdf를 Promise<Blob>으로 돌려줍니다. 옵션은 scale, padding, background.',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc: '기록을 앞뒤로 이동합니다. canUndo / canRedo는 버튼 비활성화에 씁니다.',
      hNext: '다음에 읽을 것',
      nextPara:
        '《도형, 스타일, 연결》을 이어서 읽으세요. 도형의 모든 필드, 스타일 키 각각의 시각 효과, 그리고 드래그할 때 화살표가 도형에 붙어 있도록 만드는 바인딩을 설명합니다.',
    },
    a2: {
      title: '도형, 스타일, 연결',
      summary: '도형 객체가 곧 모델입니다: 좌표, 회전, 텍스트, 스타일, 그룹, 화살표 바인딩.',
      lead: [
        t('모든 보드는 '),
        t('월드 좌표', { highlight: '#fff3bf', bold: true }),
        t(
          ' 아래의 도형 배열입니다. 이 필드를 이해하면 렌더링, 편집, 내보내기가 예상과 어긋나지 않습니다. 아래 내용은 모두 평범한 JSON이며 숨은 에디터 상태가 없습니다.',
        ),
      ],
      hCoord: '좌표: x / y는 중심',
      coordPara:
        '위치는 월드 좌표로 직접 저장되며 중첩된 오프셋이 없습니다. 읽어서 숫자 하나를 바꾸고 다시 쓰는 것이 일반적인 사용법이고, 직접 편집할 때처럼 되돌리기 한 단계가 생깁니다.',
      centerLabel: 'x / y가 곧 중심',
      centerText:
        'x: 200, y: 200, width: 160인 도형은 가로로 120 ~ 280을 차지합니다. x에 120을 더하면 중심이 320이 되며, 움직이는 것은 항상 중심이고 왼쪽 위 모서리가 아닙니다.',
      hShape: '도형 하나에 들어가는 필드',
      shapePara:
        '관심 있는 필드만 쓰면 됩니다. 크기와 스타일은 렌더링할 때 엔진이 타입별 기본값으로 채웁니다. setShapes에 넘긴 내용이 exportJSON에 그대로 기록됩니다.',
      hFields: '필드 설명',
      fieldHead: ['필드', '역할'],
      f1Name: 'id',
      f1Desc: '고유 식별자. 바인딩, 선택, 되돌리기, 삭제가 모두 이 값을 가리키므로 재사용하지 마세요.',
      f2Name: 'type',
      f2Desc: 'rectangle, diamond, arrow 같은 도형 타입. 전체 목록은 아래 표를 참고하세요.',
      f3Name: 'x / y',
      f3Desc: '월드 좌표의 중심점. 왼쪽 위 모서리가 아님.',
      f4Name: 'width / height',
      f4Desc: '픽셀 단위 크기. 원은 radius를 쓰고, 텍스트 도형은 생략할 수 있습니다.',
      f5Name: 'rotation',
      f5Desc: '도형 중심을 기준으로 한 회전 각도(도). 0은 회전 없음.',
      f6Name: 'text / textColor / fontSize',
      f6Desc: '도형 안에 그리는 텍스트와 그 타이포그래피. 에디터에서 더블 클릭으로 수정합니다.',
      f7Name: 'locked / groupId',
      f7Desc: 'locked: true이면 선택은 되지만 드래그는 안 됩니다. 같은 groupId는 함께 이동합니다.',
      f8Name: 'style',
      f8Desc: '선과 채움 객체. 각 키의 시각 효과는 다음 절에서 설명합니다.',
      hStyle: '스타일: 각 키가 바꾸는 것',
      stylePara:
        '캔버스, SVG, PNG는 같은 스타일 객체를 읽으므로 편집할 때 보는 모습이 곧 내보내기 결과입니다. 여러 도형이 하나의 style 객체를 공유하면 보드 전체 스타일을 가장 빠르게 통일할 수 있습니다.',
      hCatalog: '내장 도형',
      catHead: ['분류', 'type 예시'],
      cat1: '기본 도형',
      cat1Ex: 'rectangle, rounded-rectangle, circle, ellipse, diamond, triangle, hexagon',
      cat2: '플로우와 문서',
      cat2Ex: 'stadium, parallelogram, document, delay, predefined-process, cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class, uml-interface',
      cat4: '다이어그램',
      cat4Ex: 'mind-map, table, sticky-note',
      cat5: '미디어',
      cat5Ex: 'image, icon, draw',
      cat6: '선',
      cat6Ex: 'line, arrow, text',
      hArrow: '연결: 좌표가 아니라 도형을 바인딩하세요',
      arrowPara:
        '화살표도 도형이지만 양 끝은 바인딩을 써야 합니다. points는 초기 기하 정보일 뿐이고, startBinding과 endBinding이 있으면 엔진이 도형의 현재 위치에서 두 끝점을 다시 계산합니다. 그래서 바인딩된 화살표는 상자를 드래그할 때 따라가며 절대 흩어지지 않습니다.',
      handleLabel: 'handle과 auto',
      handleText:
        'handle은 연결할 변을 고릅니다: top, bottom, left, right. 끝점 바인딩에 auto: true를 더하면 두 도형이 움직일 때마다 엔진이 가장 알맞은 변을 다시 고릅니다. 아래 보드에서 Target을 Source 아래로 끌어도 선은 여전히 올바릅니다.',
      hGroup: '그룹과 잠금',
      groupPara:
        '여러 도형에 같은 groupId를 주면 하나의 단위로 선택·이동합니다. locked: true는 선택은 유지하면서 드래그를 막습니다. 둘 다 문서 필드이므로 UI를 만질 필요 없이 코드에서 바꿀 수 있습니다.',
      hNext: '다음에 읽을 것',
      nextPara:
        '다음 글: 내보내기와 직렬화 심화(카메라, 버전, 가져오기 검증), 그다음 테마와 7가지 내장 UI 언어.',
    },
  },

  fr: {
    a1: {
      title: 'Premiers pas avec drawui-core',
      summary:
        'Un tutoriel exécutable, étape par étape : créer un canvas, dessiner une forme, écouter les changements, sauvegarder le document et exporter une image.',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          " est un moteur de tableau blanc pour le navigateur. Vous lui donnez un canvas et un tableau de formes ; il les dessine, gère le glisser-zoom, tient un historique d'annulation et exporte le résultat. Ce tutoriel construit un petit board pas à pas et indique précisément ce que vous devez voir après chaque étape.",
        ),
      ],
      jinshu: "Le board est une donnée. Les pixels n'existent que pendant que le moteur peint.",
      hGoal: 'Le résultat final',
      goalLabel: 'Résultat',
      goalText:
        "Un canvas de 480 px de haut avec un rectangle arrondi bleu au centre, portant « Hello drawui ». Vous pouvez le déplacer. Chaque changement affiche le nombre de formes dans la console. Après un rechargement, le même board revient, et un seul appel l'exporte en PNG.",
      hInstall: 'Installation',
      installHintLabel: 'Aucun framework requis',
      installHint:
        "drawui-core ne dépend ni de React ni de Vue. Le seul prérequis à l'exécution est un canvas HTML. Avec React, lisez plutôt le guide du composant dans la catégorie « drawui-react » : CanvasBoard enveloppe déjà l'engine, la barre d'outils et les panneaux.",
      hStep1: 'Étape 1 · Créer le canvas et l’éditeur',
      step1Para:
        "Un canvas correspond à un seul Editor. Un second éditeur sur le même canvas signifie deux boucles de rendu qui se disputent les mêmes pixels. L'option language ne change que les textes intégrés, comme le menu contextuel ; vos propres textes restent intacts. L'éditeur lit sa taille depuis le CSS : définir la largeur et la hauteur de l'élément suffit, et les écrans haute densité sont gérés en interne.",
      hStep2: 'Étape 2 · Placer la première forme',
      step2Para:
        "setShapes remplace tout le document. Les coordonnées sont des coordonnées monde, et x / y désignent le centre de la forme, pas son coin supérieur gauche. C'est la première raison pour laquelle on croit que son rectangle a disparu : la position écrite est son milieu, pas son bord gauche.",
      centerLabel: 'Le centre, pas le coin supérieur gauche',
      centerText:
        "Une forme avec x: 320, y: 240 et width: 200 a son centre en (320, 240). Son bord gauche est à 320 − 100 = 220. Pour placer par le coin, calculez le centre : x = gauche + width / 2.",
      hStep3: 'Étape 3 · S’abonner, puis se désabonner en partant',
      step3Para:
        "subscribe() enregistre un listener : l'engine l'appelle à chaque changement — glisser, redimensionner, éditer un texte, annuler, appeler setShapes. Dans ce callback, getShapes() renvoie le document à jour, c'est donc l'endroit naturel pour l'autosauvegarde. Enregistrer ce listener s'appelle « s'abonner » ; le retirer s'appelle « se désabonner ».",
      unsubLabel: 'Conservez toujours la fonction de désabonnement',
      unsubText:
        "Se désabonner ne veut pas dire « fermer le canvas », mais « ce canvas ne sera plus sous votre responsabilité » : démontage du composant React, changement de page, fermeture d'une modale, ou destruction / recréation de l'éditeur. Appelez simplement la fonction renvoyée par subscribe(). Si vous ne le faites pas, les listeners s'accumulent : sauvegardes en double, mémoire qui gonfle, callbacks sur un canvas détruit. En React, renvoyez-la depuis useEffect : elle s'exécute automatiquement au démontage.",
      hStep4: 'Étape 4 · Sauvegarder et restaurer le document',
      savePara:
        "exportJSON renvoie une chaîne lisible contenant les formes, la caméra (x, y, zoom) et un numéro de version. Stockez-la où vous voulez. importJSON valide le contenu et renvoie false au lieu de lever une exception : des données corrompues deviennent une simple branche d'erreur.",
      hStep5: 'Étape 5 · Exporter une image',
      exportPara:
        "downloadImage déclenche le téléchargement dans le navigateur ; exportImage renvoie un Blob que vous pouvez téléverser ou prévisualiser. Utilisez scale: 2 pour un texte net sur écran haute densité et dans les diaporamas, et padding pour aérer autour du board.",
      hStep6: 'Étape 6 · Annuler et rétablir',
      historyPara:
        "L'historique est intégré et les raccourcis clavier fonctionnent d'emblée. canUndo() et canRedo() permettent à un bouton de barre d'outils de se désactiver correctement au lieu de ne rien faire.",
      hSee: 'Ce que vous voyez après chaque étape',
      seeHead: ['Étape', 'Ce que vous voyez'],
      see1: 'Un canevas vide de 480 px de haut : aucune forme pour l’instant, c’est normal.',
      see2: 'Un rectangle bleu arrondi « Hello drawui » apparaît au centre et suit la souris quand vous le glissez.',
      see3: 'Ouvrez la console du navigateur (F12) et glissez le rectangle : chaque changement affiche une ligne « shape count: 1 ».',
      see4: 'Après un rechargement, la forme est toujours là — à condition de transmettre le JSON sauvegardé à importJSON.',
      see5: 'Le navigateur télécharge board.png à deux fois la résolution du canevas.',
      see6: 'Ctrl / Cmd + Z revient d’un pas, Ctrl / Cmd + Shift + Z avance à nouveau.',
      artText: 'Le document entre, les pixels sortent.',
      hReact: 'Utiliser depuis React',
      reactPara:
        "drawui-react regroupe l'éditeur, la barre d'outils, le zoom et le panneau de style dans un seul composant. Importez le fichier CSS, sinon la barre d'outils s'affiche sans style. onReady fournit l'instance Editor pour setShapes, undo ou export ; onChange reçoit le document et la caméra courants et constitue le hook d'autosauvegarde le plus simple.",
      hApi: "Les méthodes de l'Editor en un coup d'œil",
      apiHead: ['Méthode', 'Ce qu’elle fait'],
      api1Name: 'setShapes(shapes)',
      api1Desc:
        "Remplace tout le document. À utiliser pour les données initiales et les modifications programmées ; ajoute aussi une étape d'annulation.",
      api2Name: 'getShapes()',
      api2Desc:
        'Lit les formes courantes. À appeler dans le callback de subscribe pour obtenir des données à jour.',
      api3Name: 'subscribe(fn)',
      api3Desc:
        "Enregistre un listener de changement. Renvoie la fonction de désabonnement ; à appeler au démontage du composant ou quand les notifications ne sont plus utiles.",
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc:
        'Sérialise le document (formes + caméra) et le restaure plus tard ; importJSON renvoie un booléen.',
      api5Name: 'exportImage(format, opts)',
      api5Desc:
        'Promise<Blob> pour png, svg ou pdf. Options : scale, padding, background.',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc:
        'Parcourt l’historique ; canUndo et canRedo pilotent l’état désactivé des boutons.',
      hNext: 'Pour aller plus loin',
      nextPara:
        "Lisez « Formes, styles et connexions ». Il détaille chaque champ d'une forme, ce que change visuellement chaque clé de style, et comment les bindings gardent les flèches collées aux formes quand vous les déplacez.",
    },
    a2: {
      title: 'Formes, styles et connexions',
      summary:
        "L'objet forme constitue tout le modèle : coordonnées, rotation, texte, style, groupes et bindings de flèches.",
      lead: [
        t('Chaque board est un tableau de formes en '),
        t('coordonnées monde', { highlight: '#fff3bf', bold: true }),
        t(
          '. Une fois ces champs compris, le rendu, l’édition et l’export cessent de surprendre. Tout ce qui suit est du JSON ordinaire — aucun état caché de l’éditeur.',
        ),
      ],
      hCoord: 'Coordonnées : x / y est le centre',
      coordPara:
        "Les positions sont stockées en coordonnées monde ; il n'y a pas de décalages imbriqués. Lire les formes, changer un nombre et les réécrire est un flux normal, et cela crée une étape d'annulation comme toute autre édition.",
      centerLabel: 'x / y, c’est le centre',
      centerText:
        'Une forme à x: 200, y: 200 avec width: 160 occupe 120 → 280 en largeur. Ajoutez 120 à x : son centre passe à 320 — c’est toujours le centre qui bouge, jamais le coin.',
      hShape: 'Une forme, tous ses champs',
      shapePara:
        "Indiquez uniquement les champs qui vous concernent ; le moteur complète à l'export les valeurs par défaut de taille et de style selon le type. Ce que vous passez à setShapes est exactement ce que exportJSON réécrit.",
      hFields: 'Référence des champs',
      fieldHead: ['Champ', 'Ce qu’il fait'],
      f1Name: 'id',
      f1Desc:
        "Identifiant unique. Les bindings, la sélection, l'annulation et la suppression pointent vers lui — ne le réutilisez jamais.",
      f2Name: 'type',
      f2Desc: 'Type de forme comme rectangle, diamond ou arrow. Voir le catalogue ci-dessous.',
      f3Name: 'x / y',
      f3Desc: 'Point central en coordonnées monde. Pas le coin supérieur gauche.',
      f4Name: 'width / height',
      f4Desc:
        'Taille en pixels. Les cercles utilisent radius ; les formes texte peuvent omettre les tailles.',
      f5Name: 'rotation',
      f5Desc: 'Rotation en degrés autour du centre de la forme. 0 signifie droit.',
      f6Name: 'text / textColor / fontSize',
      f6Desc:
        'Libellé dessiné dans la forme et sa typographie. Un double-clic le modifie dans l’éditeur.',
      f7Name: 'locked / groupId',
      f7Desc:
        'locked: true sélectionne sans jamais déplacer. Les formes partageant un groupId bougent ensemble.',
      f8Name: 'style',
      f8Desc:
        'Objet contour et remplissage ; chaque clé est expliquée dans la section suivante.',
      hStyle: 'Style : ce que change chaque clé',
      stylePara:
        "Canvas, SVG et PNG lisent le même objet style, donc ce que vous voyez en édition est ce qui arrive dans l'export. Réutiliser un objet style entre formes est le moyen le plus rapide de garder un board cohérent.",
      hCatalog: 'Formes intégrées',
      catHead: ['Groupe', 'Exemples de type'],
      cat1: 'Base',
      cat1Ex:
        'rectangle, rounded-rectangle, circle, ellipse, diamond, triangle, hexagon',
      cat2: 'Flux et document',
      cat2Ex:
        'stadium, parallelogram, document, delay, predefined-process, cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class, uml-interface',
      cat4: 'Diagrammes',
      cat4Ex: 'mind-map, table, sticky-note',
      cat5: 'Médias',
      cat5Ex: 'image, icon, draw',
      cat6: 'Lignes',
      cat6Ex: 'line, arrow, text',
      hArrow: 'Connexions : binder les formes, pas les coordonnées',
      arrowPara:
        "Une flèche est aussi une forme, mais ses extrémités devraient être des bindings. points n'est que la géométrie initiale : dès que startBinding et endBinding existent, le moteur recalcule les deux extrémités à partir des formes, c'est pourquoi une flèche liée suit une boîte quand vous la déplacez et ne se défait jamais.",
      handleLabel: 'handle et auto',
      handleText:
        "handle choisit le côté d'accroche : top, bottom, left ou right. Ajoutez auto: true au binding de fin et le moteur rechoisit le meilleur côté chaque fois que les deux formes bougent — le board ci-dessous reste correct si vous glissez Target sous Source.",
      hGroup: 'Groupes et verrouillage',
      groupPara:
        "Le même groupId sur plusieurs formes les fait sélectionner et déplacer comme une unité ; locked: true empêche le déplacement tout en gardant la sélection. Les deux sont des champs du document, donc vous pouvez les basculer depuis le code sans toucher à l'interface.",
      hNext: 'Pour aller plus loin',
      nextPara:
        "Prochaine étape : l'export et la sérialisation en profondeur (caméra, versioning, validation à l'import), puis les thèmes et les sept langues d'interface intégrées.",
    },
  },

  de: {
    a1: {
      title: 'Erste Schritte mit drawui-core',
      summary:
        'Ein lauffähiges Schritt-für-Schritt-Tutorial: Canvas anlegen, Form zeichnen, Änderungen abonnieren, Dokument speichern und Bild exportieren.',
      lead: [
        t('drawui-core', { bold: true, color: '#2f6fed' }),
        t(
          ' ist eine Whiteboard-Engine für den Browser. Du gibst ihr einen Canvas und ein Array von Formen; sie rendert, übernimmt Ziehen und Zoomen, führt den Undo-Verlauf und exportiert das Ergebnis. Dieses Tutorial baut Schritt für Schritt ein kleines Board und sagt genau, was du nach jedem Schritt sehen solltest.',
        ),
      ],
      jinshu: 'Ein Board ist Daten. Pixel existieren nur, während die Engine zeichnet.',
      hGoal: 'Das Ergebnis am Ende',
      goalLabel: 'Endergebnis',
      goalText:
        'Ein 480 Pixel hoher Canvas mit einem blauen abgerundeten Rechteck in der Mitte, das „Hello drawui“ anzeigt. Du kannst es verschieben. Jede Änderung schreibt die Anzahl der Formen in die Konsole. Nach einem Reload ist dasselbe Board wieder da, und ein Aufruf exportiert es als PNG.',
      hInstall: 'Installation',
      installHintLabel: 'Kein Framework nötig',
      installHint:
        'drawui-core hängt weder von React noch von Vue ab. Zur Laufzeit genügt ein HTML-Canvas. Bei React lies besser den Komponenten-Guide in der Kategorie „drawui-react“ — CanvasBoard verpackt Engine, Toolbar und Panels bereits.',
      hStep1: 'Schritt 1 · Canvas und Editor anlegen',
      step1Para:
        'Ein Canvas bekommt genau einen Editor. Ein zweiter Editor auf demselben Canvas bedeutet zwei Render-Loops, die um dieselben Pixel streiten. Die Option language ändert nur eingebaute Texte wie das Kontextmenü; deine gezeichneten Texte bleiben unberührt. Der Editor liest seine Größe aus dem CSS, Breite und Höhe am Element genügen also — hochauflösende Displays werden intern berücksichtigt.',
      hStep2: 'Schritt 2 · Die erste Form einsetzen',
      step2Para:
        'setShapes ersetzt das gesamte Dokument. Koordinaten sind Weltkoordinaten, und x / y adressieren den Mittelpunkt der Form, nicht die linke obere Ecke. Das ist der häufigste Grund für die Annahme, das Rechteck sei verschwunden: Die angegebene Position ist seine Mitte, nicht sein linker Rand.',
      centerLabel: 'Mitte, nicht linke obere Ecke',
      centerText:
        'Eine Form mit x: 320, y: 240 und width: 200 hat ihren Mittelpunkt bei (320, 240). Ihr linker Rand liegt bei 320 − 100 = 220. Um an der Ecke zu platzieren, rechne selbst in die Mitte um: x = links + width / 2.',
      hStep3: 'Schritt 3 · Abonnieren und beim Verlassen wieder abmelden',
      step3Para:
        'subscribe() registriert einen Listener: Die Engine ruft ihn bei jeder Änderung auf — Ziehen, Größe ändern, Text bearbeiten, Undo, jeder setShapes-Aufruf. Im Callback liefert getShapes() das aktuelle Dokument, deshalb ist er der natürliche Ort für Autosave. Dieses Registrieren heißt „abonnieren“, das Entfernen „abmelden“.',
      unsubLabel: 'Die Abmeldefunktion immer behalten',
      unsubText:
        'Abmelden heißt nicht „Canvas schließen“, sondern „dieser Canvas gehört nicht mehr zu deiner Zuständigkeit“: Unmount der React-Komponente, Seitenwechsel, Modal schließen oder vor dem Zerstören / Neuerstellen des Editors. Rufe einfach die von subscribe() zurückgegebene Funktion auf. Tust du das nicht, sammeln sich Listener: doppelte Speicherungen, wachsender Speicher, Callbacks auf einem zerstörten Canvas. In React gibst du sie aus useEffect zurück, dann läuft sie beim Unmount automatisch.',
      hStep4: 'Schritt 4 · Dokument speichern und wiederherstellen',
      savePara:
        'exportJSON liefert einen lesbaren String mit Formen, Kamera (x, y, zoom) und Versionsnummer. Speichere ihn, wo du willst. importJSON validiert die Daten und gibt bei fehlerhaften Daten false statt einer Exception zurück, sodass „kaputte Daten“ ein normaler Fehlerzweig wird.',
      hStep5: 'Schritt 5 · Ein Bild exportieren',
      exportPara:
        'downloadImage startet den Download im Browser; exportImage liefert einen Blob, den du hochladen oder anzeigen kannst. Nutze scale: 2 für scharfen Text auf hochauflösenden Displays und in Präsentationen, und padding für Luft um das Board.',
      hStep6: 'Schritt 6 · Rückgängig und Wiederholen',
      historyPara:
        'Der Undo-Verlauf ist eingebaut, Tastaturkürzel funktionieren sofort. canUndo() / canRedo() lassen einen Toolbar-Button korrekt deaktivieren, statt still nichts zu tun.',
      hSee: 'Was Sie nach jedem Schritt sehen',
      seeHead: ['Schritt', 'Was Sie sehen'],
      see1: 'Eine leere Leinwand mit 480 px Höhe – noch keine Form. Das ist normal.',
      see2: 'Ein blaues abgerundetes Rechteck „Hello drawui“ erscheint in der Mitte und folgt der Maus beim Ziehen.',
      see3: 'Öffnen Sie die Browser-Konsole (F12) und ziehen Sie das Rechteck: Bei jeder Änderung erscheint eine Zeile „shape count: 1“.',
      see4: 'Nach einem Neuladen ist die Form noch da – sofern Sie das gespeicherte JSON an importJSON übergeben.',
      see5: 'Der Browser lädt board.png mit doppelter Leinwandauflösung herunter.',
      see6: 'Strg / Cmd + Z geht einen Schritt zurück, Strg / Cmd + Shift + Z wieder vor.',
      artText: 'Dokument rein, Pixel raus.',
      hReact: 'Einsatz in React',
      reactPara:
        'drawui-react bündelt Editor, Toolbar, Zoom-Steuerung und Style-Panel in einer Komponente. Importiere die CSS-Datei, sonst erscheint die Toolbar ohne Styles. onReady liefert die Editor-Instanz für setShapes, undo oder export; onChange feuert mit aktuellem Dokument und Kamera und ist der einfachste Autosave-Hook.',
      hApi: 'Die Editor-Methoden im Überblick',
      apiHead: ['Methode', 'Was sie tut'],
      api1Name: 'setShapes(shapes)',
      api1Desc:
        'Ersetzt das gesamte Dokument. Für Startdaten und programmatische Änderungen; legt außerdem einen Undo-Schritt an.',
      api2Name: 'getShapes()',
      api2Desc:
        'Liest die aktuellen Formen. Im subscribe-Callback aufrufen, um frische Daten zu bekommen.',
      api3Name: 'subscribe(fn)',
      api3Desc:
        'Registriert einen Änderungs-Listener. Gibt die Abmeldefunktion zurück; beim Unmount oder wenn keine Benachrichtigungen mehr nötig sind aufrufen.',
      api4Name: 'exportJSON() / importJSON(json)',
      api4Desc:
        'Serialisiert das Dokument (Formen + Kamera) und stellt es später wieder her; importJSON gibt einen Boolean zurück.',
      api5Name: 'exportImage(format, opts)',
      api5Desc:
        'Promise<Blob> für png, svg oder pdf. Optionen: scale, padding, background.',
      api6Name: 'undo() / redo() / canUndo()',
      api6Desc:
        'Im Verlauf vor- und zurückgehen; canUndo und canRedo steuern deaktivierte Buttons.',
      hNext: 'Wie es weitergeht',
      nextPara:
        'Lies „Formen, Styles und Verbindungen“. Dort stehen jedes Feld einer Form, die visuelle Wirkung jedes Style-Schlüssels und wie Bindings Pfeile beim Ziehen an Formen kleben lassen.',
    },
    a2: {
      title: 'Formen, Styles und Verbindungen',
      summary:
        'Das Formobjekt ist das ganze Modell: Koordinaten, Rotation, Text, Style, Gruppen und Pfeil-Bindings.',
      lead: [
        t('Jedes Board ist ein Array von Formen in '),
        t('Weltkoordinaten', { highlight: '#fff3bf', bold: true }),
        t(
          '. Sind diese Felder klar, überraschen Rendering, Editing und Export nicht mehr. Alles unten ist reines JSON — kein versteckter Editor-Zustand.',
        ),
      ],
      hCoord: 'Koordinaten: x / y ist die Mitte',
      coordPara:
        'Positionen werden in Weltkoordinaten gespeichert; es gibt keine verschachtelten Offsets. Formen lesen, eine Zahl ändern und zurückschreiben ist ein normaler Ablauf und erzeugt wie jede andere Bearbeitung einen Undo-Schritt.',
      centerLabel: 'x / y ist die Mitte',
      centerText:
        'Eine Form bei x: 200, y: 200 mit width: 160 reicht horizontal von 120 bis 280. Addiere 120 auf x, liegt die Mitte bei 320 — es bewegt sich immer die Mitte, nie die Ecke.',
      hShape: 'Eine Form mit allen Feldern',
      shapePara:
        'Du brauchst nur die Felder zu setzen, die dich betreffen; Größe und Style ergänzt die Engine beim Rendern mit typabhängigen Standardwerten. Was du an setShapes übergibst, schreibt exportJSON unverändert zurück.',
      hFields: 'Feldreferenz',
      fieldHead: ['Feld', 'Was es bewirkt'],
      f1Name: 'id',
      f1Desc:
        'Eindeutige ID. Bindings, Auswahl, Undo und Löschen verweisen darauf — niemals wiederverwenden.',
      f2Name: 'type',
      f2Desc: 'Formtyp wie rectangle, diamond oder arrow. Siehe Katalog unten.',
      f3Name: 'x / y',
      f3Desc: 'Mittelpunkt in Weltkoordinaten. Nicht die linke obere Ecke.',
      f4Name: 'width / height',
      f4Desc:
        'Größe in Pixeln. Kreise nutzen radius; Textformen können Größen weglassen.',
      f5Name: 'rotation',
      f5Desc: 'Rotation in Grad um den Formmittelpunkt. 0 heißt aufrecht.',
      f6Name: 'text / textColor / fontSize',
      f6Desc:
        'In der Form gezeichnetes Label und seine Typografie. Doppelklick bearbeitet es im Editor.',
      f7Name: 'locked / groupId',
      f7Desc:
        'locked: true wählt aus, zieht aber nie. Formen mit gleicher groupId bewegen sich gemeinsam.',
      f8Name: 'style',
      f8Desc:
        'Objekt aus Kontur und Füllung; jeder Schlüssel wird im nächsten Abschnitt erklärt.',
      hStyle: 'Style: was jeder Schlüssel ändert',
      stylePara:
        'Canvas, SVG und PNG lesen dasselbe Style-Objekt, was du beim Bearbeiten siehst, landet im Export. Ein Style-Objekt über mehrere Formen wiederzuverwenden ist der schnellste Weg zu einem visuell stimmigen Board.',
      hCatalog: 'Eingebaute Formen',
      catHead: ['Gruppe', 'type-Beispiele'],
      cat1: 'Grundformen',
      cat1Ex:
        'rectangle, rounded-rectangle, circle, ellipse, diamond, triangle, hexagon',
      cat2: 'Fluss und Dokument',
      cat2Ex:
        'stadium, parallelogram, document, delay, predefined-process, cylinder',
      cat3: 'UML',
      cat3Ex: 'uml-class, uml-interface',
      cat4: 'Diagramme',
      cat4Ex: 'mind-map, table, sticky-note',
      cat5: 'Medien',
      cat5Ex: 'image, icon, draw',
      cat6: 'Linien',
      cat6Ex: 'line, arrow, text',
      hArrow: 'Verbindungen: Formen binden, nicht Koordinaten',
      arrowPara:
        'Ein Pfeil ist ebenfalls eine Form, aber seine Enden sollten Bindings sein. points ist nur die anfängliche Geometrie: Sobald startBinding und endBinding existieren, berechnet die Engine beide Enden aus den Formen neu — deshalb folgt ein gebundener Pfeil einer Box beim Ziehen und fällt nie auseinander.',
      handleLabel: 'handle und auto',
      handleText:
        'handle wählt die Seite zum Anhängen: top, bottom, left oder right. Ergänze auto: true am End-Binding, und die Engine wählt bei jeder Bewegung der beiden Formen die beste Seite neu — das Board unten bleibt korrekt, wenn du Target unter Source ziehst.',
      hGroup: 'Gruppen und Sperren',
      groupPara:
        'Gleiche groupId auf mehreren Formen macht sie zu einer Einheit zum Auswählen und Bewegen; locked: true hält eine Form vom Ziehen ab, bleibt aber auswählbar. Beides sind Dokumentfelder, du kannst sie also aus dem Code umschalten, ohne die UI anzufassen.',
      hNext: 'Wie es weitergeht',
      nextPara:
        'Nächster Artikel: Export und Serialisierung im Detail (Kamera, Versionierung, Import-Validierung), danach Themes und die sieben eingebauten UI-Sprachen.',
    },
  },
};

// ---------------------------------------------------------------- 文章三文案（drawui-react）
const docs3 = {
  en: {
    title: 'drawui-react: a real board inside React',
    summary:
      'Add a full drawing board to a React app with one component: props, external control, the data flow and the subscribe / unsubscribe lifecycle.',
    lead: [
      t('This article is for React projects. '),
      t('CanvasBoard', { code: true }),
      t(
        ' already wraps the engine, toolbar, panels, undo history and export, so you write a component instead of another canvas loop. Read it in three passes: get it on screen, learn each prop, then own the lifecycle.',
      ),
    ],
    hInstall: 'Install',
    installHintLabel: 'Peer dependencies',
    installHint:
      'Install drawui-react together with drawui-core. react and react-dom are peer dependencies: keep the versions your app already uses and never bundle a second copy of React.',
    hBasic: 'The smallest working board',
    basicPara:
      'Import styles.css once; without it the toolbar has no styling. CanvasBoard fills its parent, so a height is usually the only style you need. themeColor and language change built-in chrome only — selection outlines, handles, menus — never the shapes you draw.',
    basicHintLabel: 'What you see',
    basicHintText:
      'A grid canvas, a toolbar on the left, undo / redo, zoom controls and the export menu. Draw a rectangle and drag it right away — no extra setup code.',
    hProps: 'Props at a glance',
    propHead: ['Prop', 'What it does'],
    p1n: 'className / style',
    p1d: 'Size and outer styling. The board follows its parent, so a height is usually enough.',
    p2n: 'themeColor / theme',
    p2d: 'Accent color for selection and handles; theme switches the light or dark palette.',
    p3n: 'language',
    p3d: 'Built-in UI language (7 options). The text on your shapes is untouched.',
    p4n: 'data',
    p4d: 'Initial document. Do not pass a fresh array on every render: the document would be reinstalled and fight the user. For a deliberate reload, call setShapes through onReady.',
    p5n: 'onChange',
    p5d: 'Fires after shapes or the camera change with { shapes, camera, version } — the natural autosave hook.',
    p6n: 'onReady',
    p6d: 'Hands you the drawui-core Editor once the canvas is mounted; undo, exportJSON and subscribe all live there.',
    hControl: 'Control the board from outside',
    controlPara:
      'onReady gives you the same Editor that drawui-core exposes, so every core API works: setShapes, undo, exportJSON, downloadImage, subscribe. Keep it in a ref and call it from buttons or shortcuts. A null ref simply means the board is not mounted yet.',
    hData: 'data and onChange: pick one direction',
    dataPara:
      'Non-controlled: pass data once and let the board own the document; onChange is your save hook. Controlled: keep shapes in state and write them back in onChange. Never pass a new array on each render, or the document resets and fights the user. When you really need to re-sync, call editor.setShapes.',
    hLifecycle: 'Subscribe and unsubscribe in React',
    lifePara:
      'onChange is enough for saving; subscribe is the lower-level hook for custom logic. Register the listener inside useEffect and return the unsubscribe function — React calls it on unmount, so the listener never outlives the component.',
    lifeHintLabel: 'Unsubscribing means the component no longer owns the canvas',
    lifeHintText:
      'Unsubscribe on unmount, navigation, closing a modal, or before destroying / recreating the editor. It is not about “closing the canvas” — the element may still be on screen. Registered outside a cleanup scope and never removed, the listener stays forever: duplicate saves, growing memory, callbacks against a destroyed canvas.',
    hTheme: 'Theme and language',
    themePara:
      'Both props are reactive: changing them repaints the board without losing shapes. For a theme picker, keep the value in state and wire onThemeChange back to your state so the built-in panels follow.',
    hExport: 'Export a PNG or get a Blob',
    exportPara:
      'downloadImage triggers a browser download; exportImage resolves a Blob you can upload. Both take scale and padding, so print quality is one option away.',
    hDemo: 'The board below is the component',
    demoHintLabel: 'Live CanvasBoard',
    demoHintText:
      'Drag the two boxes and check that the connector follows, then undo or export with the toolbar. Everything here is rendered by drawui-core inside the React component — there is no second editor.',
    hNext: 'Where to go next',
    nextPara:
      'Read “Shapes, styles and connections” for the document model, and come back here when you need controlled data or custom toolbars.',
  },
  zh: {
    title: 'drawui-react：在 React 里嵌入一块真正的画板',
    summary:
      '一个组件就能把完整画板放进 React 应用：属性、外部控制、数据流，以及订阅 / 解绑的完整生命周期。',
    lead: [
      t('这一篇针对 React 项目。'),
      t('CanvasBoard', { code: true }),
      t(
        ' 已经把引擎、工具栏、面板、撤销历史和导出都包好了——你写的是一个组件，不是又一套画布循环。顺序是：先跑起来，再逐个看属性，最后把订阅与解绑讲透。',
      ),
    ],
    hInstall: '安装',
    installHintLabel: '依赖说明',
    installHint:
      'drawui-react 和 drawui-core 一起装。react / react-dom 是 peer 依赖，保持项目现有版本，不要重复打包第二份 React。',
    hBasic: '最小可跑示例',
    basicPara:
      'styles.css 只引入一次，否则工具栏没有样式。CanvasBoard 撑满父容器，通常只需要给一个高度。themeColor 和 language 只影响选中框、手柄、菜单这些内置界面，不会改你画上去的图形。',
    basicHintLabel: '运行后你会看到',
    basicHintText:
      '一块带网格的画布、左侧工具栏、撤销 / 重做、缩放和导出菜单。你可以马上画一个矩形并拖动它——不需要任何额外初始化代码。',
    hProps: '属性一览',
    propHead: ['属性', '作用'],
    p1n: 'className / style',
    p1d: '控制尺寸和外层样式。画板跟随父容器大小，通常只需要给一个高度。',
    p2n: 'themeColor / theme',
    p2d: '选中框与手柄的强调色；theme 切换浅色或深色配色。',
    p3n: 'language',
    p3d: '内置界面语言（7 种）。你画的图形文字不受影响。',
    p4n: 'data',
    p4d: '初始文档。不要在每次渲染都传一个新数组，否则文档会被反复重置、和用户操作打架；确实要整体替换时，用 onReady 里的 setShapes。',
    p5n: 'onChange',
    p5d: '图形或相机变化后触发，拿到 { shapes, camera, version }，适合自动保存。',
    p6n: 'onReady',
    p6d: '画布挂载完成时给出 drawui-core 的 Editor 实例，之后 undo / exportJSON / subscribe 都能用。',
    hControl: '从外部控制画板',
    controlPara:
      'onReady 拿到的是和 drawui-core 完全相同的 Editor，core 的 API 全部可用：setShapes、undo、exportJSON、downloadImage、subscribe。把它存进 ref，按钮和快捷键里随时调用。ref 为 null 只说明画板还没挂载。',
    hData: 'data 与 onChange：只选一个方向',
    dataPara:
      '非受控：data 只在首次挂载时灌入，之后文档由画板自己维护，onChange 只负责回传。受控：把图形存进 state，并在 onChange 里写回。不要每次渲染都传新数组，否则文档会被重置、和用户操作打架；确实要重新同步时用 editor.setShapes。',
    hLifecycle: '在 React 里订阅和解绑',
    lifePara:
      '只想自动保存，用 onChange 就够了；subscribe 是更底层的钩子，适合自定义逻辑。把监听器注册在 useEffect 里，并把 unsubscribe 作为返回值——组件卸载时 React 会自动调用它，监听器绝不会活得比组件久。',
    lifeHintLabel: '解绑 = 这个组件不再负责这块画布',
    lifeHintText:
      '卸载、页面跳走、弹窗关闭，或者销毁 / 重建编辑器之前，都要解绑。它不是「把画布关掉」——画布元素可能还在屏幕上。如果在 useEffect 之外注册却从不清理，监听器会一直留在内存里：重复保存、内存上涨、回调打到已经销毁的画布。',
    hTheme: '主题与语言',
    themePara:
      '两个属性都是响应式的：改值立即重绘，图形不会丢。做主题切换面板时把值放进 state，再用 onThemeChange 把用户选择写回 state，内置面板会跟着变。',
    hExport: '导出 PNG 或拿到 Blob',
    exportPara:
      'downloadImage 直接触发浏览器下载；exportImage 返回 Blob，可以上传到后端。两者都支持 scale 和 padding，想要印刷级清晰度改一个参数即可。',
    hDemo: '下面这块画板就是这个组件',
    demoHintLabel: '可拖动的 CanvasBoard',
    demoHintText:
      '拖动两个方块看看连线是否跟随，再用工具栏撤销或导出。你看到的一切都由 drawui-core 在 React 组件里渲染，这里没有第二个编辑器。',
    hNext: '接下来读什么',
    nextPara:
      '回去读《图形、样式与连线》补齐文档模型；需要受控数据或自定义工具栏时，再回来看这篇。',
  },
  'zh-TW': {
    title: 'drawui-react：在 React 裡嵌入一塊真正的畫板',
    summary:
      '一個元件就能把完整畫板放進 React 應用：屬性、外部控制、資料流，以及訂閱 / 解除訂閱的完整生命週期。',
    lead: [
      t('這一篇針對 React 專案。'),
      t('CanvasBoard', { code: true }),
      t(
        ' 已經把引擎、工具列、面板、復原歷史和匯出都包好了——你寫的是一個元件，不是又一套畫布迴圈。順序是：先跑起來，再逐個看屬性，最後把訂閱與解除訂閱講透。',
      ),
    ],
    hInstall: '安裝',
    installHintLabel: '依賴說明',
    installHint:
      'drawui-react 和 drawui-core 一起裝。react / react-dom 是 peer 依賴，保持專案現有版本，不要重複打包第二份 React。',
    hBasic: '最小可跑範例',
    basicPara:
      'styles.css 只引入一次，否則工具列沒有樣式。CanvasBoard 撐滿父容器，通常只需要給一個高度。themeColor 和 language 只影響選取框、手柄、選單這些內建介面，不會改你畫上去的圖形。',
    basicHintLabel: '執行後你會看到',
    basicHintText:
      '一塊帶格線的畫布、左側工具列、復原 / 重做、縮放和匯出選單。你可以馬上畫一個矩形並拖曳它——不需要任何額外初始化程式碼。',
    hProps: '屬性一覽',
    propHead: ['屬性', '作用'],
    p1n: 'className / style',
    p1d: '控制尺寸和外層樣式。畫板跟隨父容器大小，通常只需要給一個高度。',
    p2n: 'themeColor / theme',
    p2d: '選取框與手柄的強調色；theme 切換淺色或深色配色。',
    p3n: 'language',
    p3d: '內建介面語言（7 種）。你畫的圖形文字不受影響。',
    p4n: 'data',
    p4d: '初始文件。不要在每次渲染都傳一個新陣列，否則文件會被反覆重設、和使用者操作打架；確實要整體替換時，用 onReady 裡的 setShapes。',
    p5n: 'onChange',
    p5d: '圖形或相機變化後觸發，拿到 { shapes, camera, version }，適合自動儲存。',
    p6n: 'onReady',
    p6d: '畫布掛載完成時給出 drawui-core 的 Editor 實例，之後 undo / exportJSON / subscribe 都能用。',
    hControl: '從外部控制畫板',
    controlPara:
      'onReady 拿到的是和 drawui-core 完全相同的 Editor，core 的 API 全部可用：setShapes、undo、exportJSON、downloadImage、subscribe。把它存進 ref，按鈕和快速鍵裡隨時呼叫。ref 為 null 只說明畫板還沒掛載。',
    hData: 'data 與 onChange：只選一個方向',
    dataPara:
      '非受控：data 只在首次掛載時灌入，之後文件由畫板自己維護，onChange 只負責回傳。受控：把圖形存進 state，並在 onChange 裡寫回。不要每次渲染都傳新陣列，否則文件會被重設、和使用者操作打架；確實要重新同步時用 editor.setShapes。',
    hLifecycle: '在 React 裡訂閱和解除訂閱',
    lifePara:
      '只想自動儲存，用 onChange 就夠了；subscribe 是更底層的鉤子，適合自訂邏輯。把監聽器註冊在 useEffect 裡，並把 unsubscribe 作為回傳值——元件卸載時 React 會自動呼叫它，監聽器絕不會活得比元件久。',
    lifeHintLabel: '解除訂閱 = 這個元件不再負責這塊畫布',
    lifeHintText:
      '卸載、頁面跳走、彈窗關閉，或者銷毀 / 重建編輯器之前，都要解除訂閱。它不是「把畫布關掉」——畫布元素可能還在螢幕上。如果在 useEffect 之外註冊卻從不清理，監聽器會一直留在記憶體裡：重複儲存、記憶體上漲、回呼打到已經銷毀的畫布。',
    hTheme: '主題與語言',
    themePara:
      '兩個屬性都是響應式的：改值立即重繪，圖形不會丟。做主題切換面板時把值放進 state，再用 onThemeChange 把使用者選擇寫回 state，內建面板會跟著變。',
    hExport: '匯出 PNG 或拿到 Blob',
    exportPara:
      'downloadImage 直接觸發瀏覽器下載；exportImage 回傳 Blob，可以上傳到後端。兩者都支援 scale 和 padding，想要印刷級清晰度改一個參數即可。',
    hDemo: '下面這塊畫板就是這個元件',
    demoHintLabel: '可拖曳的 CanvasBoard',
    demoHintText:
      '拖曳兩個方塊看看連線是否跟隨，再用工具列復原或匯出。你看到的一切都由 drawui-core 在 React 元件裡渲染，這裡沒有第二個編輯器。',
    hNext: '接下來讀什麼',
    nextPara:
      '回去讀《圖形、樣式與連線》補齊文件模型；需要受控資料或自訂工具列時，再回來看這篇。',
  },
  ja: {
    title: 'drawui-react：React に本物のボードを組み込む',
    summary:
      'コンポーネント 1 つで完全な描画ボードを React アプリに追加。プロパティ、外部制御、データフロー、購読と解除のライフサイクルを解説します。',
    lead: [
      t('この記事は React プロジェクト向けです。'),
      t('CanvasBoard', { code: true }),
      t(
        ' はエンジン、ツールバー、パネル、Undo 履歴、エクスポートまで包んでいます。書くのはコンポーネント 1 つで、描画ループは不要です。まず動かす、次に各プロパティ、最後に購読と解除を理解する順で読み進めてください。',
      ),
    ],
    hInstall: 'インストール',
    installHintLabel: '依存関係',
    installHint:
      'drawui-react と drawui-core をまとめて導入します。react / react-dom は peer 依存なので、プロジェクト既存のバージョンをそのまま使い、React を二重にバンドルしないでください。',
    hBasic: '最小の動作例',
    basicPara:
      'styles.css は 1 回だけ読み込みます（忘れるとツールバーのスタイルが崩れます）。CanvasBoard は親要素いっぱいに広がるので、通常は高さを与えるだけで十分です。themeColor と language は選択枠・ハンドル・メニューなどの組み込み UI だけを変え、描いた図形には影響しません。',
    basicHintLabel: '表示されるもの',
    basicHintText:
      'グリッド付きキャンバス、左のツールバー、元に戻す / やり直し、ズーム、エクスポートメニュー。四角形を描いてすぐドラッグできます。追加の初期化コードは不要です。',
    hProps: 'プロパティ一覧',
    propHead: ['プロパティ', '役割'],
    p1n: 'className / style',
    p1d: 'サイズと外観。親要素に追従するので、通常は高さだけで足ります。',
    p2n: 'themeColor / theme',
    p2d: '選択枠とハンドルの強調色。theme でライト / ダークを切り替えます。',
    p3n: 'language',
    p3d: '組み込み UI の言語（7 種類）。図形上のテキストには影響しません。',
    p4n: 'data',
    p4d: '初期ドキュメント。毎レンダーで新しい配列を渡すと文書が再読み込みされ操作と衝突します。意図的な再同期は onReady 経由で setShapes を呼んでください。',
    p5n: 'onChange',
    p5d: '図形やカメラの変更後に { shapes, camera, version } を受け取ります。自動保存向き。',
    p6n: 'onReady',
    p6d: 'マウント完了時に drawui-core の Editor を渡します。undo / exportJSON / subscribe はここから使います。',
    hControl: '外部からボードを操作する',
    controlPara:
      'onReady で受け取るのは drawui-core と同じ Editor なので、core の API がすべて使えます：setShapes、undo、exportJSON、downloadImage、subscribe。ref に保存してボタンやショートカットから呼び出します。ref が null なのは、まだマウントされていないだけです。',
    hData: 'data と onChange：どちらか一方に',
    dataPara:
      '非制御：data は初回マウント時のみ渡し、その後はボードが文書を管理します。onChange は保存用。制御：図形を state に置き、onChange で書き戻します。毎レンダーで新しい配列を渡すと文書がリセットされ、ユーザー操作と衝突します。本当に再同期が必要なときは editor.setShapes を呼びます。',
    hLifecycle: 'React での購読と解除',
    lifePara:
      '保存だけなら onChange で十分です。subscribe はより低レベルなフックで、独自ロジック向けです。useEffect 内でリスナーを登録し、unsubscribe を返り値にします。アンマウント時に React が自動で呼ぶため、リスナーがコンポーネントより長生きすることはありません。',
    lifeHintLabel: '解除 = このコンポーネントがボードの管理者でなくなること',
    lifeHintText:
      'アンマウント、ページ遷移、モーダルを閉じる、エディタを破棄・再作成する前に解除します。「キャンバスを閉じる」ことではありません。要素は画面上に残っていてもよいのです。クリーンアップの外で登録して放置すると、リスナーが残り続け、保存の重複、メモリ増加、破棄済みキャンバスへのコールバックが起きます。',
    hTheme: 'テーマと言語',
    themePara:
      'どちらもリアクティブです。値を変えると図形を失わずに再描画されます。テーマ切替 UI では値を state に置き、onThemeChange でユーザーの選択を state に戻すと、組み込みパネルも追従します。',
    hExport: 'PNG を書き出す / Blob を取得する',
    exportPara:
      'downloadImage はブラウザのダウンロードを開始し、exportImage は Blob を返します。どちらも scale と padding を受け取り、印刷品質も 1 つのオプションで実現できます。',
    hDemo: '下のボードがこのコンポーネントです',
    demoHintLabel: '操作できる CanvasBoard',
    demoHintText:
      '2 つの四角形をドラッグして、コネクタが追従するか確認し、ツールバーで元に戻すかエクスポートしてみてください。ここに見えるものはすべて React コンポーネント内の drawui-core が描画しています。',
    hNext: '次に読むもの',
    nextPara:
      '「図形・スタイル・接続」でドキュメントモデルを確認し、制御データや独自ツールバーが必要になったらこの記事に戻ってください。',
  },
  ko: {
    title: 'drawui-react: React에 진짜 보드를 넣기',
    summary:
      '컴포넌트 하나로 완전한 드로잉 보드를 React 앱에 추가합니다. 속성, 외부 제어, 데이터 흐름, 구독/해제 생명주기를 정리합니다.',
    lead: [
      t('이 문서는 React 프로젝트를 위한 것입니다.'),
      t('CanvasBoard', { code: true }),
      t(
        ' 는 엔진, 툴바, 패널, 되돌리기 기록, 내보내기까지 모두 감싸므로 캔버스 루프 대신 컴포넌트 하나를 씁니다. 먼저 실행하고, 각 속성을 살펴본 뒤, 구독과 해제를 이해하는 순서로 읽으세요.',
      ),
    ],
    hInstall: '설치',
    installHintLabel: '의존성',
    installHint:
      'drawui-react와 drawui-core를 함께 설치하세요. react / react-dom은 peer 의존성이라 프로젝트의 기존 버전을 그대로 쓰고 React를 두 번 번들하지 마세요.',
    hBasic: '최소 실행 예제',
    basicPara:
      'styles.css는 한 번만 불러오세요. 빠지면 툴바 스타일이 없습니다. CanvasBoard는 부모를 채우므로 대개 높이만 지정하면 됩니다. themeColor와 language는 선택 테두리, 핸들, 메뉴 같은 내장 UI만 바꾸고 그린 도형은 건드리지 않습니다.',
    basicHintLabel: '실행 후 보이는 것',
    basicHintText:
      '그리드 캔버스, 왼쪽 툴바, 되돌리기/다시 실행, 줌, 내보내기 메뉴가 나타납니다. 사각형을 그리고 바로 드래그할 수 있습니다. 추가 초기화 코드는 필요 없습니다.',
    hProps: '속성 한눈에 보기',
    propHead: ['속성', '하는 일'],
    p1n: 'className / style',
    p1d: '크기와 겉모양. 부모를 따라가므로 대부분 높이만 필요합니다.',
    p2n: 'themeColor / theme',
    p2d: '선택 테두리와 핸들의 강조색. theme으로 라이트/다크를 전환합니다.',
    p3n: 'language',
    p3d: '내장 UI 언어(7종). 도형 위 텍스트에는 영향 없습니다.',
    p4n: 'data',
    p4d: '초기 문서. 렌더마다 새 배열을 넘기면 문서가 다시 설치되어 사용자 조작과 충돌합니다. 의도적 재동기화는 onReady로 setShapes를 호출하세요.',
    p5n: 'onChange',
    p5d: '도형이나 카메라 변경 후 { shapes, camera, version }을 받습니다. 자동 저장에 알맞습니다.',
    p6n: 'onReady',
    p6d: '마운트 완료 시 drawui-core Editor를 줍니다. undo, exportJSON, subscribe가 모두 여기 있습니다.',
    hControl: '외부에서 보드 제어하기',
    controlPara:
      'onReady가 주는 Editor는 drawui-core와 동일하므로 core API를 모두 쓸 수 있습니다: setShapes, undo, exportJSON, downloadImage, subscribe. ref에 담아 버튼이나 단축키에서 호출하세요. ref가 null이면 아직 마운트 전일 뿐입니다.',
    hData: 'data와 onChange: 방향은 하나만',
    dataPara:
      '비제어: data는 첫 마운트에만 넘기고 이후 문서는 보드가 관리합니다. onChange는 저장용입니다. 제어: 도형을 state에 두고 onChange에서 되돌려 씁니다. 렌더마다 새 배열을 넘기면 문서가 초기화되어 사용자 조작과 충돌합니다. 정말 재동기화가 필요하면 editor.setShapes를 호출하세요.',
    hLifecycle: 'React에서 구독과 해제',
    lifePara:
      '저장만 필요하면 onChange로 충분합니다. subscribe는 더 낮은 수준의 훅으로 사용자 정의 로직에 적합합니다. useEffect 안에서 리스너를 등록하고 unsubscribe를 반환하세요. 언마운트 때 React가 자동 호출하므로 리스너가 컴포넌트보다 오래 살지 않습니다.',
    lifeHintLabel: '해제 = 이 컴포넌트가 보드의 관리자가 아님',
    lifeHintText:
      '언마운트, 페이지 이동, 모달 닫기, 에디터 폐기/재생성 전에 해제합니다. 「캔버스를 끄는」 뜻이 아니며 요소는 화면에 남아 있을 수 있습니다. 정리 범위 밖에서 등록하고 방치하면 리스너가 계속 남아 저장 중복, 메모리 증가, 폐기된 캔버스로의 콜백이 생깁니다.',
    hTheme: '테마와 언어',
    themePara:
      '두 속성 모두 반응형입니다. 값을 바꾸면 도형을 잃지 않고 다시 그립니다. 테마 선택 UI라면 값을 state에 두고 onThemeChange로 사용자 선택을 state에 되돌려 내장 패널이 따라오게 하세요.',
    hExport: 'PNG 내보내기 또는 Blob 받기',
    exportPara:
      'downloadImage는 브라우저 다운로드를 시작하고 exportImage는 Blob을 돌려줍니다. 둘 다 scale과 padding을 받으므로 인쇄 품질도 옵션 하나로 가능합니다.',
    hDemo: '아래 보드가 바로 이 컴포넌트입니다',
    demoHintLabel: '조작 가능한 CanvasBoard',
    demoHintText:
      '두 상자를 드래그해 연결선이 따라오는지 확인하고, 툴바로 되돌리기나 내보내기를 해 보세요. 여기 보이는 모든 것은 React 컴포넌트 안의 drawui-core가 그립니다. 두 번째 에디터는 없습니다.',
    hNext: '다음에 읽을 것',
    nextPara:
      '「도형, 스타일, 연결」에서 문서 모델을 확인하고, 제어 데이터나 사용자 정의 툴바가 필요할 때 이 문서로 돌아오세요.',
  },
  fr: {
    title: 'drawui-react : un vrai tableau dans React',
    summary:
      "Ajoutez un tableau de dessin complet à une app React avec un seul composant : props, contrôle externe, flux de données et cycle d'abonnement / désabonnement.",
    lead: [
      t('Cet article vise les projets React. '),
      t('CanvasBoard', { code: true }),
      t(
        " enveloppe déjà l'engine, la barre d'outils, les panneaux, l'historique et l'export : vous écrivez un composant, pas une boucle canvas. L'ordre de lecture : le faire tourner, comprendre chaque prop, puis maîtriser le cycle de vie.",
      ),
    ],
    hInstall: 'Installation',
    installHintLabel: 'Dépendances',
    installHint:
      'Installez drawui-react avec drawui-core. react et react-dom sont des peer dependencies : gardez les versions de votre app et ne bundlez jamais un second React.',
    hBasic: 'Le plus petit tableau qui marche',
    basicPara:
      "Importez styles.css une seule fois, sinon la barre d'outils n'a pas de style. CanvasBoard remplit son parent : une hauteur suffit généralement. themeColor et language ne changent que l'interface intégrée (contour de sélection, poignées, menus), jamais les formes.",
    basicHintLabel: 'Ce que vous voyez',
    basicHintText:
      "Un canevas quadrillé, une barre d'outils à gauche, annuler / rétablir, le zoom et le menu d'export. Dessinez un rectangle et déplacez-le tout de suite, sans code d'initialisation supplémentaire.",
    hProps: 'Les props en un coup d’œil',
    propHead: ['Prop', 'Ce qu’elle fait'],
    p1n: 'className / style',
    p1d: 'Taille et style extérieur. Le tableau suit son parent : une hauteur suffit le plus souvent.',
    p2n: 'themeColor / theme',
    p2d: 'Couleur d’accent de la sélection et des poignées ; theme bascule clair / sombre.',
    p3n: 'language',
    p3d: 'Langue de l’interface intégrée (7 choix). Le texte de vos formes n’est pas touché.',
    p4n: 'data',
    p4d: 'Document initial. Ne passez pas un nouveau tableau à chaque rendu : le document serait réinstallé et entrerait en conflit avec l’utilisateur. Pour resynchroniser volontairement, appelez setShapes via onReady.',
    p5n: 'onChange',
    p5d: 'Déclenché après modification des formes ou de la caméra, avec { shapes, camera, version }. Idéal pour l’autosauvegarde.',
    p6n: 'onReady',
    p6d: 'Fournit l’Editor de drawui-core au montage ; undo, exportJSON et subscribe vivent là.',
    hControl: 'Piloter le tableau depuis l’extérieur',
    controlPara:
      "onReady rend le même Editor que drawui-core, donc toute l'API core est disponible : setShapes, undo, exportJSON, downloadImage, subscribe. Gardez-le dans une ref et appelez-le depuis des boutons ou des raccourcis. Une ref null signifie simplement que le tableau n'est pas encore monté.",
    hData: 'data et onChange : choisissez un sens',
    dataPara:
      "Non contrôlé : passez data une fois et laissez le tableau posséder le document ; onChange sert de hook de sauvegarde. Contrôlé : gardez les formes dans un state et réécrivez-les dans onChange. Ne passez jamais un nouveau tableau à chaque rendu, sinon le document se réinitialise et se bat avec l'utilisateur. Pour resynchroniser, appelez editor.setShapes.",
    hLifecycle: 'S’abonner et se désabonner dans React',
    lifePara:
      "onChange suffit pour sauvegarder ; subscribe est le hook de plus bas niveau pour une logique personnalisée. Enregistrez le listener dans useEffect et renvoyez la fonction de désabonnement : React l'appelle au démontage, le listener ne survit donc jamais au composant.",
    lifeHintLabel: 'Se désabonner = le composant ne possède plus le canvas',
    lifeHintText:
      "Désabonnez au démontage, à la navigation, à la fermeture d'une modale ou avant de détruire / recréer l'éditeur. Ce n'est pas « fermer le canvas » : l'élément peut rester à l'écran. Enregistré hors d'un nettoyage et jamais retiré, le listener reste pour toujours : sauvegardes en double, mémoire qui gonfle, callbacks sur un canvas détruit.",
    hTheme: 'Thème et langue',
    themePara:
      "Les deux props sont réactives : les changer redessine le tableau sans perdre les formes. Pour un sélecteur de thème, gardez la valeur dans un state et renvoyez le choix via onThemeChange pour que les panneaux suivent.",
    hExport: 'Exporter un PNG ou récupérer un Blob',
    exportPara:
      "downloadImage lance le téléchargement ; exportImage renvoie un Blob à uploader. Les deux acceptent scale et padding : la qualité d'impression n'est qu'une option.",
    hDemo: 'Le tableau ci-dessous est ce composant',
    demoHintLabel: 'CanvasBoard en direct',
    demoHintText:
      "Glissez les deux rectangles et vérifiez que le connecteur suit, puis annulez ou exportez avec la barre d'outils. Tout ce que vous voyez est rendu par drawui-core dans le composant React — pas de second éditeur.",
    hNext: 'Pour aller plus loin',
    nextPara:
      "Lisez « Formes, styles et connexions » pour le modèle de document, puis revenez ici quand vous aurez besoin de données contrôlées ou d'une barre d'outils personnalisée.",
  },
  de: {
    title: 'drawui-react: ein echtes Board in React',
    summary:
      'Eine Komponente genügt, um ein vollständiges Zeichenboard in eine React-App einzubauen: Props, externe Steuerung, Datenfluss sowie Abonnieren und Abmelden.',
    lead: [
      t('Dieser Artikel richtet sich an React-Projekte. '),
      t('CanvasBoard', { code: true }),
      t(
        ' verpackt bereits Engine, Toolbar, Panels, Undo-Verlauf und Export – du schreibst eine Komponente statt einer weiteren Canvas-Schleife. Reihenfolge: zum Laufen bringen, jede Prop verstehen, dann den Lifecycle beherrschen.',
      ),
    ],
    hInstall: 'Installation',
    installHintLabel: 'Abhängigkeiten',
    installHint:
      'Installiere drawui-react zusammen mit drawui-core. react und react-dom sind Peer-Abhängigkeiten: Behalte die Versionen deiner App und bündle React nie doppelt.',
    hBasic: 'Das kleinste laufende Board',
    basicPara:
      'styles.css genau einmal importieren, sonst hat die Toolbar keinen Stil. CanvasBoard füllt das Elternelement, meist genügt also eine Höhe. themeColor und language ändern nur die eingebaute Oberfläche – Auswahlrahmen, Griffe, Menüs – niemals deine Formen.',
    basicHintLabel: 'Was du siehst',
    basicHintText:
      'Eine Rasterleinwand, links eine Toolbar, Undo/Redo, Zoom und das Exportmenü. Zeichne sofort ein Rechteck und ziehe es – ohne zusätzlichen Initialisierungscode.',
    hProps: 'Props auf einen Blick',
    propHead: ['Prop', 'Was sie tut'],
    p1n: 'className / style',
    p1d: 'Größe und äußeres Styling. Das Board folgt dem Elternelement, eine Höhe reicht meist.',
    p2n: 'themeColor / theme',
    p2d: 'Akzentfarbe für Auswahl und Griffe; theme schaltet hell / dunkel um.',
    p3n: 'language',
    p3d: 'Sprache der eingebauten Oberfläche (7 Optionen). Der Text auf deinen Formen bleibt unberührt.',
    p4n: 'data',
    p4d: 'Startdokument. Kein neues Array pro Render übergeben – das Dokument würde neu installiert und mit dem Nutzer kollidieren; für bewusstes Neuladen setShapes über onReady aufrufen.',
    p5n: 'onChange',
    p5d: 'Feuert nach Änderungen an Formen oder Kamera mit { shapes, camera, version } – ideal für Autosave.',
    p6n: 'onReady',
    p6d: 'Liefert beim Mounten den drawui-core-Editor; undo, exportJSON und subscribe findest du dort.',
    hControl: 'Das Board von außen steuern',
    controlPara:
      'onReady liefert denselben Editor wie drawui-core, also funktioniert die gesamte Core-API: setShapes, undo, exportJSON, downloadImage, subscribe. In einer Ref ablegen und aus Buttons oder Shortcuts aufrufen. Eine null-Ref heißt nur, dass das Board noch nicht gemountet ist.',
    hData: 'data und onChange: eine Richtung wählen',
    dataPara:
      'Unkontrolliert: data einmal übergeben, danach besitzt das Board das Dokument; onChange ist der Speicher-Hook. Kontrolliert: Formen im State halten und in onChange zurückschreiben. Nie pro Render ein neues Array übergeben, sonst setzt sich das Dokument zurück und kämpft mit dem Nutzer. Für bewusstes Neuladen editor.setShapes aufrufen.',
    hLifecycle: 'Abonnieren und abmelden in React',
    lifePara:
      'Zum Speichern reicht onChange; subscribe ist der tiefer liegende Hook für eigene Logik. Listener in useEffect registrieren und die Abmeldefunktion zurückgeben – React ruft sie beim Unmount auf, der Listener überlebt die Komponente also nie.',
    lifeHintLabel: 'Abmelden heißt: die Komponente besitzt den Canvas nicht mehr',
    lifeHintText:
      'Abmelden bei Unmount, Navigation, Schließen eines Modals oder vor dem Zerstören / Neuerstellen des Editors. Es geht nicht um „Canvas schließen“ – das Element kann weiter am Bildschirm stehen. Außerhalb eines Cleanups registriert und nie entfernt, bleibt der Listener für immer: doppelte Speicherungen, wachsender Speicher, Callbacks auf einem zerstörten Canvas.',
    hTheme: 'Theme und Sprache',
    themePara:
      'Beide Props sind reaktiv: Änderungen zeichnen neu, ohne Formen zu verlieren. Für einen Theme-Umschalter den Wert im State halten und onThemeChange zurückschreiben, damit die eingebauten Panels folgen.',
    hExport: 'PNG exportieren oder Blob erhalten',
    exportPara:
      'downloadImage startet den Browser-Download; exportImage liefert einen Blob zum Hochladen. Beide nehmen scale und padding, Druckqualität ist also eine Option entfernt.',
    hDemo: 'Das Board unten ist diese Komponente',
    demoHintLabel: 'Live-CanvasBoard',
    demoHintText:
      'Ziehe die zwei Rechtecke und prüfe, ob der Verbinder folgt, dann Undo oder Export über die Toolbar. Alles hier rendert drawui-core in der React-Komponente – kein zweiter Editor.',
    hNext: 'Wie es weitergeht',
    nextPara:
      'Lies „Formen, Styles und Verbindungen“ für das Dokumentmodell und komm hierher zurück, wenn du kontrollierte Daten oder eigene Toolbars brauchst.',
  },
};

const writeArticle = (fileId, base, summary, content, translations, categoryId = 'cat_3131bcc5') => {
  const now = new Date('2026-10-31T09:00:00.000Z').toISOString();
  fs.writeFileSync(
    path.join(OUT, `${fileId}.json`),
    JSON.stringify(
      {
        id: fileId,
        title: base.title,
        summary,
        categoryId: categoryId,
        tagIds: [],
        content,
        translations,
        status: 'published',
        reads: 0,
        createdAt: now,
        updatedAt: now,
      },
      null,
      2,
    ),
  );
};

const articleId = '9f3c2b7e-1d4a-4c6f-8b91-2a6f0d7c5e11';
const article2Id = 'b2a8e5c4-7f19-4d03-9a62-5c1e8f4b7d29';
const article3Id = 'c7d1e9a3-4b28-4f50-9a6e-1d3b8c5f2a74';

const langs = ['zh', 'zh-TW', 'ja', 'ko', 'fr', 'de'];

writeArticle(
  articleId,
  docs.en.a1,
  docs.en.a1.summary,
  article1(docs.en.a1),
  Object.fromEntries(
    langs.map((lang) => [
      lang,
      {
        title: docs[lang].a1.title,
        summary: docs[lang].a1.summary,
        content: article1(docs[lang].a1),
      },
    ]),
  ),
);

writeArticle(
  article2Id,
  docs.en.a2,
  docs.en.a2.summary,
  article2(docs.en.a2),
  Object.fromEntries(
    langs.map((lang) => [
      lang,
      {
        title: docs[lang].a2.title,
        summary: docs[lang].a2.summary,
        content: article2(docs[lang].a2),
      },
    ]),
  ),
);

writeArticle(
  article3Id,
  docs3.en,
  docs3.en.summary,
  article3(docs3.en),
  Object.fromEntries(
    langs.map((lang) => [
      lang,
      {
        title: docs3[lang].title,
        summary: docs3[lang].summary,
        content: article3(docs3[lang]),
      },
    ]),
  ),
  'cat_46e85719',
);

console.log('done', articleId, article2Id, article3Id);
