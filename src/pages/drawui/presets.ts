// drawui 官网演示图形：全部由真实图形数据渲染，避免使用与产品无关的占位图。
import { calcUmlClassSize, createTableCells, layoutMindMap } from 'drawui-core';
import type {
  MindMapNode,
  Shape,
  ShapeStyle,
  TableCell,
  UmlAttribute,
  UmlMethod,
} from 'drawui-core';

const BLUE = '#3370ff';
const BLUE_FILL = '#eef4ff';
const GREEN = '#12994f';
const GREEN_FILL = '#eafbf1';
const ORANGE = '#d97706';
const ORANGE_FILL = '#fff6e8';
const PURPLE = '#7c3aed';
const PURPLE_FILL = '#f4efff';
const RED = '#d14343';
const RED_FILL = '#fff1f1';
const GRAY = '#5b6472';

function style(
  stroke: string,
  fill: string,
  strokeWidth = 1.6,
  strokeDash: number[] | null = null,
): ShapeStyle {
  return { strokeColor: stroke, fillColor: fill, strokeWidth, strokeDash };
}

function base(
  id: string,
  type: Shape['type'],
  x: number,
  y: number,
  extra: Record<string, unknown>,
): Shape {
  return {
    id,
    type,
    x,
    y,
    rotation: 0,
    style: style(BLUE, '#ffffff'),
    ...extra,
  } as Shape;
}

/* ------------------------------------------------------------------ */
/* 流程图                                                              */
/* ------------------------------------------------------------------ */

export const flowchartShapes: Shape[] = [
  {
    ...base('flow-start', 'stadium', 96, 104, { width: 120, height: 50 }),
    style: style(GREEN, GREEN_FILL),
    text: '开始',
    textColor: '#0f6b39',
    fontSize: 14,
  },
  {
    ...base('flow-read', 'rectangle', 286, 104, { width: 140, height: 56 }),
    style: style(BLUE, BLUE_FILL),
    text: '读取参数',
    textColor: '#1e4fd6',
    fontSize: 14,
  },
  {
    ...base('flow-check', 'diamond', 486, 104, { width: 180, height: 104 }),
    style: style(ORANGE, ORANGE_FILL),
    text: '校验通过？',
    textColor: '#a15c05',
    fontSize: 14,
  },
  {
    ...base('flow-run', 'rectangle', 696, 104, { width: 140, height: 56 }),
    style: style(BLUE, BLUE_FILL),
    text: '执行任务',
    textColor: '#1e4fd6',
    fontSize: 14,
  },
  {
    ...base('flow-end', 'stadium', 886, 104, { width: 120, height: 50 }),
    style: style(GREEN, GREEN_FILL),
    text: '完成',
    textColor: '#0f6b39',
    fontSize: 14,
  },
  {
    ...base('flow-error', 'rectangle', 486, 260, { width: 150, height: 54 }),
    style: style(RED, RED_FILL),
    text: '记录异常',
    textColor: '#a52b2b',
    fontSize: 14,
  },
  // 连线必须绑定两端图形（startBinding / endBinding），否则拖动盒子时线留在原地，
  // 整个流程图当场散架。handle 是连线的接入边，endBinding 加 auto 让接入边随位置自动重选。
  ...[
    ['start-read', 156, 104, 216, 104, 'flow-start', 'right', 'flow-read', 'left'],
    ['read-check', 356, 104, 396, 104, 'flow-read', 'right', 'flow-check', 'left'],
    ['check-run', 576, 104, 626, 104, 'flow-check', 'right', 'flow-run', 'left'],
    ['run-end', 766, 104, 826, 104, 'flow-run', 'right', 'flow-end', 'left'],
    ['check-error', 486, 156, 486, 233, 'flow-check', 'bottom', 'flow-error', 'top'],
  ].map(([id, x1, y1, x2, y2, from, fromHandle, to, toHandle], index) =>
    base(`flow-arrow-${id}`, 'arrow', Number(x1), Number(y1), {
      points: [
        { x: Number(x1), y: Number(y1) },
        { x: Number(x2), y: Number(y2) },
      ],
      arrowHead: 'end',
      connectionType: 'straight',
      startBinding: { toShapeId: from, handle: fromHandle },
      endBinding: { toShapeId: to, handle: toHandle, auto: true },
      style: style(index === 4 ? RED : GRAY, '#ffffff', 1.8),
    }),
  ),
];

/* ------------------------------------------------------------------ */
/* 思维导图                                                            */
/* ------------------------------------------------------------------ */

const mindMapRoot: MindMapNode = {
  id: 'mm-root',
  text: 'AI 笔记产品',
  children: [
    {
      id: 'mm-research',
      text: '用户研究',
      direction: 'right',
      children: [
        { id: 'mm-interview', text: '访谈提纲' },
        { id: 'mm-competitor', text: '竞品拆解' },
      ],
    },
    {
      id: 'mm-tech',
      text: '技术方案',
      direction: 'left',
      children: [
        { id: 'mm-canvas', text: '画布引擎' },
        { id: 'mm-sync', text: '实时同步' },
      ],
    },
    { id: 'mm-design', text: '设计规范', direction: 'up' },
    { id: 'mm-release', text: '发布计划', direction: 'down' },
  ],
};

const mindMapLayout = layoutMindMap(mindMapRoot);

export const mindMapShapes: Shape[] = [
  base('mindmap-main', 'mind-map', mindMapLayout.width / 2, mindMapLayout.height / 2, {
    width: mindMapLayout.width,
    height: mindMapLayout.height,
    root: mindMapRoot,
    style: style(BLUE, '#ffffff'),
  }),
];

/* ------------------------------------------------------------------ */
/* 表格                                                               */
/* ------------------------------------------------------------------ */

const tableRows = [
  ['模块', '接口', '状态', '负责人'],
  ['画布', 'shapes.add', '稳定', '林可'],
  ['导出', 'shapes.png', '测试中', '周舟'],
];

const tableCells: TableCell[][] = createTableCells(3, 4, true).map((row, rowIndex) =>
  row.map((cell, colIndex) => ({
    ...cell,
    text: tableRows[rowIndex]?.[colIndex] ?? '',
    align: colIndex === 2 ? 'center' : 'left',
  })),
);

const tableColWidths = [128, 158, 110, 110];
const tableRowHeights = [48, 50, 50];

export const tableShapes: Shape[] = [
  base('table-main', 'table', 253, 74, {
    width: tableColWidths.reduce((sum, w) => sum + w, 0),
    height: tableRowHeights.reduce((sum, h) => sum + h, 0),
    colWidths: tableColWidths,
    rowHeights: tableRowHeights,
    cells: tableCells,
    style: style('#d5dbe6', '#ffffff', 1.2),
  }),
];

/* ------------------------------------------------------------------ */
/* UML 类图                                                            */
/* ------------------------------------------------------------------ */

const boardAttributes: UmlAttribute[] = [
  { id: 'ua-theme', visibility: '+', name: 'themeColor', type: 'string' },
  { id: 'ua-lang', visibility: '+', name: 'language', type: 'Language' },
];

const boardMethods: UmlMethod[] = [
  { id: 'um-change', visibility: '+', name: 'onChange', params: 'data', returnType: 'void' },
  { id: 'um-ready', visibility: '+', name: 'onReady', params: 'editor', returnType: 'void' },
];

const editorAttributes: UmlAttribute[] = [
  { id: 'ea-camera', visibility: '-', name: 'camera', type: 'Camera' },
  { id: 'ea-shapes', visibility: '-', name: 'shapes', type: 'Shape[]' },
];

const editorMethods: UmlMethod[] = [
  { id: 'em-undo', visibility: '+', name: 'undo', params: '', returnType: 'void' },
  { id: 'em-json', visibility: '+', name: 'exportJSON', params: '', returnType: 'string' },
];

// 两个类比 calcUmlClassSize 多留 24px，避免最长的「属性: 类型」文本贴到边框被裁切
const boardSize = calcUmlClassSize('CanvasBoard', boardAttributes, boardMethods);
const editorSize = calcUmlClassSize('Editor', editorAttributes, editorMethods);
const boardWidth = boardSize.width + 24;
const editorWidth = editorSize.width + 24;
const boardHeight = boardSize.height;
const editorHeight = editorSize.height;

// 画布坐标是中心点：先按包围盒排好左右两个类，箭头端点严格落在两个边框上
const UML_MARGIN = 24;
const UML_GAP = 96;
const boardCx = UML_MARGIN + boardWidth / 2;
const editorCx = UML_MARGIN + boardWidth + UML_GAP + editorWidth / 2;
const umlRowCy = UML_MARGIN + Math.max(boardHeight, editorHeight) / 2;

export const umlShapes: Shape[] = [
  {
    ...base('uml-board', 'uml-class', boardCx, umlRowCy, {
      className: 'CanvasBoard',
      attributes: boardAttributes,
      methods: boardMethods,
      width: boardWidth,
      height: boardHeight,
    }),
    style: style(PURPLE, PURPLE_FILL),
  },
  {
    ...base('uml-editor', 'uml-class', editorCx, umlRowCy, {
      className: 'Editor',
      attributes: editorAttributes,
      methods: editorMethods,
      width: editorWidth,
      height: editorHeight,
    }),
    style: style(BLUE, BLUE_FILL),
  },
  base('uml-arrow', 'arrow', boardCx + boardWidth / 2, umlRowCy, {
    points: [
      { x: UML_MARGIN + boardWidth, y: umlRowCy },
      { x: UML_MARGIN + boardWidth + UML_GAP, y: umlRowCy },
    ],
    arrowHead: 'inheritance',
    connectionType: 'straight',
    // 绑定两个类：拖动任意一个，继承线跟着走
    startBinding: { toShapeId: 'uml-board', handle: 'right' },
    endBinding: { toShapeId: 'uml-editor', handle: 'left', auto: true },
    style: style(GRAY, '#ffffff', 1.8),
  }),
];

/* ------------------------------------------------------------------ */
/* 便签与图形库                                                        */
/* ------------------------------------------------------------------ */

export const stickyShapes: Shape[] = [
  {
    ...base('sticky-1', 'sticky-note', 110, 110, { width: 150, height: 130 }),
    rotation: -4,
    style: style('#e6b422', '#fff3bf', 1.2),
    text: '拖拽即可移动\n双击编辑文字',
    textColor: '#5a4305',
    fontSize: 13,
  },
  {
    ...base('sticky-2', 'sticky-note', 300, 110, { width: 150, height: 130 }),
    rotation: 3,
    style: style('#d97a9c', '#ffe3ee', 1.2),
    text: '支持分组、锁定\n与层级调整',
    textColor: '#7d2b49',
    fontSize: 13,
  },
  {
    ...base('sticky-3', 'sticky-note', 490, 110, { width: 150, height: 130 }),
    rotation: -2,
    style: style('#5aa9d6', '#e3f4ff', 1.2),
    text: 'SVG / PNG / PDF\n一键导出',
    textColor: '#134f74',
    fontSize: 13,
  },
  base('sticky-label', 'text', 300, 218, {
    width: 220,
    height: 34,
    text: '便签 · 随手记录灵感',
    fontSize: 13,
    textColor: GRAY,
    style: style('transparent', 'transparent', 0),
  }),
];

export const shapeGallery: Shape[] = [
  ['g-rect', 'rectangle', '矩形', 100, 76, { width: 118, height: 64 }],
  [
    'g-rounded',
    'rounded-rectangle',
    '圆角矩形',
    258,
    76,
    { width: 118, height: 64, borderRadius: 16 },
  ],
  ['g-circle', 'circle', '圆形', 414, 76, { radius: 34 }],
  ['g-diamond', 'diamond', '菱形', 570, 76, { width: 112, height: 64 }],
  ['g-hexagon', 'hexagon', '六边形', 726, 76, { width: 112, height: 64 }],
  ['g-star', 'star', '五角星', 878, 76, { width: 86, height: 86 }],
  ['g-triangle', 'triangle', '三角形', 100, 206, { width: 96, height: 76 }],
  ['g-cylinder', 'cylinder', '圆柱体', 258, 206, { width: 100, height: 82 }],
  ['g-cloud', 'cloud', '云朵', 414, 206, { width: 112, height: 70 }],
  ['g-heart', 'heart', '心形', 570, 206, { width: 100, height: 84 }],
  ['g-arrow', 'block-arrow-right', '块箭头', 726, 206, { width: 112, height: 64 }],
  ['g-stadium', 'stadium', '胶囊', 878, 206, { width: 118, height: 58 }],
].map(([id, type, text, x, y, extra]) => ({
  ...base(
    String(id),
    type as Shape['type'],
    Number(x),
    Number(y),
    extra as Record<string, unknown>,
  ),
  style: style(BLUE, BLUE_FILL),
  text: String(text),
  textColor: '#1e4fd6',
  fontSize: 13,
})) as Shape[];

/* ------------------------------------------------------------------ */
/* 紧凑预设：卡片缩略图用，控制在一屏内看清文字                        */
/* ------------------------------------------------------------------ */

export const compactFlow: Shape[] = [
  {
    ...base('cf-start', 'stadium', 70, 64, { width: 100, height: 44 }),
    style: style(GREEN, GREEN_FILL),
    text: '开始',
    textColor: '#0f6b39',
    fontSize: 13,
  },
  {
    ...base('cf-check', 'diamond', 220, 64, { width: 132, height: 86 }),
    style: style(ORANGE, ORANGE_FILL),
    text: '校验通过？',
    textColor: '#a15c05',
    fontSize: 13,
  },
  {
    ...base('cf-run', 'rectangle', 370, 64, { width: 124, height: 48 }),
    style: style(BLUE, BLUE_FILL),
    text: '执行任务',
    textColor: '#1e4fd6',
    fontSize: 13,
  },
  {
    ...base('cf-error', 'rectangle', 220, 172, { width: 124, height: 46 }),
    style: style(RED, RED_FILL),
    text: '记录异常',
    textColor: '#a52b2b',
    fontSize: 13,
  },
  {
    ...base('cf-end', 'stadium', 370, 172, { width: 100, height: 44 }),
    style: style(GREEN, GREEN_FILL),
    text: '完成',
    textColor: '#0f6b39',
    fontSize: 13,
  },
  // 每根线都绑到两端图形，拖动任何一个盒子，线都跟着走（不再散架）
  ...[
    ['1', 122, 64, 152, 64, 'cf-start', 'right', 'cf-check', 'left'],
    ['2', 288, 64, 306, 64, 'cf-check', 'right', 'cf-run', 'left'],
    ['3', 220, 108, 220, 147, 'cf-check', 'bottom', 'cf-error', 'top'],
    ['4', 370, 90, 370, 148, 'cf-run', 'bottom', 'cf-end', 'top'],
  ].map(([id, x1, y1, x2, y2, from, fromHandle, to, toHandle]) =>
    base(`cf-arrow-${id}`, 'arrow', Number(x1), Number(y1), {
      points: [
        { x: Number(x1), y: Number(y1) },
        { x: Number(x2), y: Number(y2) },
      ],
      arrowHead: 'end',
      connectionType: 'straight',
      startBinding: { toShapeId: from, handle: fromHandle },
      endBinding: { toShapeId: to, handle: toHandle, auto: true },
      style: style(GRAY, '#ffffff', 1.6),
    }),
  ),
];

export const compactGallery: Shape[] = [
  ['cg-rect', 'rectangle', '矩形', 92, 68, { width: 118, height: 64 }],
  [
    'cg-rounded',
    'rounded-rectangle',
    '圆角矩形',
    254,
    68,
    { width: 118, height: 64, borderRadius: 16 },
  ],
  ['cg-circle', 'circle', '圆形', 406, 68, { radius: 33 }],
  ['cg-diamond', 'diamond', '菱形', 92, 190, { width: 110, height: 64 }],
  ['cg-hexagon', 'hexagon', '六边形', 254, 190, { width: 110, height: 64 }],
  ['cg-star', 'star', '五角星', 406, 190, { width: 78, height: 78 }],
].map(([id, type, text, x, y, extra]) => ({
  ...base(
    String(id),
    type as Shape['type'],
    Number(x),
    Number(y),
    extra as Record<string, unknown>,
  ),
  style: style(BLUE, BLUE_FILL),
  text: String(text),
  textColor: '#1e4fd6',
  fontSize: 12.5,
})) as Shape[];

/* ------------------------------------------------------------------ */
/* 组合场景（首页 Hero / 在线体验）                                     */
/* ------------------------------------------------------------------ */

// Hero 窗口只有 ~450px 宽，宽流程图缩进去文字会糊成一片；
// 这里用紧凑预设，保证示例图里的文字和箭头都能看清。
export const heroShapes: Shape[] = compactFlow;

export const playgroundPresets: { id: string; name: string; shapes: Shape[] }[] = [
  { id: 'flow', name: '流程图', shapes: flowchartShapes },
  { id: 'mindmap', name: '思维导图', shapes: mindMapShapes },
  { id: 'table', name: '表格', shapes: tableShapes },
  { id: 'uml', name: 'UML 类图', shapes: umlShapes },
  { id: 'sticky', name: '图形库', shapes: [...shapeGallery, ...stickyShapes] },
];
