// 壁纸元数据注册表
// - 每种壁纸是一个独立文件夹，放在 src/components/wallpapers/ 下
// - kind: 'svg' 表示用代码/SVG 绘制（组件渲染）；'image' 表示直接用背景图（可以是 public/ 下的图 URL 或 import 的图）
// - mode: 'dark'（缺省）只在暗黑模式渲染；'light' 只在浅色模式渲染
// - 浅色壁纸建议提供 tint（容器/顶栏染色）与 paper（纸面底色），由 WallpaperHost 写入 CSS 变量
// - 新增壁纸：在对应文件夹下写好组件/图片，再往 WALLPAPER_PRESETS 里追加一条即可
import type { ComponentType } from 'react';
import FireflyNightSky from './firefly-night-sky';
import MeteorNightSky from './meteor-night-sky';
import { GreenEyeWallpaper, MistMorningWallpaper, LakeMorningWallpaper } from './light-tints';
import { LinenWeaveWallpaper, GridPaperWallpaper, LaidPaperWallpaper } from './textures';
import {
  InkMountainWallpaper,
  InkBambooWallpaper,
  BluePorcelainWallpaper,
  DarkTechNeonWallpaper,
  MoonLakeWallpaper,
  AutumnMistWallpaper,
} from './artistic';

export type WallpaperKind = 'svg' | 'image';
export type WallpaperMode = 'dark' | 'light';

export interface WallpaperPreset {
  id: string;
  name: string;
  kind: WallpaperKind;
  /** 适用模式：缺省 'dark'（兼容旧壁纸） */
  mode?: WallpaperMode;
  /** kind='svg' 时必填 */
  component?: ComponentType;
  /** kind='image' 时必填，可以是任意 url() 可用的字符串 */
  imageUrl?: string;
  /** 弹框里的预览缩略图（image/svg 都建议提供，没有则用渲染组件兜底） */
  thumbnail?: string;
  description?: string;
  /** 浅色壁纸：整体色调，染顶栏/容器（CSS 变量 --lw-tint） */
  tint?: string;
  /** 浅色壁纸：编辑纸面底色（CSS 变量 --lw-paper）。
   *  照片类壁纸可给较低不透明度让底图透出来；柔化由 blur/veil 在壁纸层完成。
   *  ⚠️ 不要在纸面上用 backdrop-filter：它会让纸面成为 position:fixed 子元素的
   *     包含块，导致图片选中框 / 缩放手柄脱离图片本体。 */
  paper?: string;
  /** 浅色壁纸：UI 部件底色（CSS 变量 --lw-chrome），供代码块工具条、日历补白格、
   *  画板标题栏等"浮在纸面上的部件"打底。纹理壁纸的 paper 是 transparent，
   *  部件若也透明会显得发白发飘，所以给它们一层偏灰的半透明底。 */
  chrome?: string;
  /** 选择弹框里的缩略图背景（任意 CSS background 值） */
  thumbCss?: string;
  /** 缩略图放大倍数：细线类壁纸（网格/数据流/织物）缩到 200px 宽时线会消失，
   *  放大后裁中间一块，细节才看得出来。默认 1 */
  thumbScale?: number;
  /** kind='image'：覆盖在照片上的柔化遮罩（任意 CSS background 值）。
   *  作用是把照片压柔、降低对正文的干扰，保证可读性 */
  veil?: string;
  /** kind='image'：照片轻微模糊（px），边缘更柔，进一步降低干扰 */
  blur?: number;
  /** 浅色壁纸在设置面板里的分组标题（柔和护眼 / 质感纸纹 / 风景照片） */
  group?: string;
  /** 素材来源（免费商用图库）标注，仅作注释 */
  source?: string;
}

/** 代表"无壁纸"：只保留当前模式纯色底 */
export const WALLPAPER_NONE_ID = 'none';

export const WALLPAPER_PRESETS: WallpaperPreset[] = [
  {
    id: WALLPAPER_NONE_ID,
    name: '默认',
    kind: 'svg',
    component: () => null,
    description: '不显示壁纸，仅保留当前模式底色',
  },

  /* ---------------- 暗黑模式 ---------------- */
  {
    id: 'firefly-night-sky',
    name: '萤火夜空',
    kind: 'svg',
    mode: 'dark',
    component: FireflyNightSky,
    description: '新月、山丘和点点萤火虫',
  },
  {
    id: 'meteor-night-sky',
    name: '流星雨',
    kind: 'svg',
    mode: 'dark',
    component: MeteorNightSky,
    description: '深冷星空，流星不时划过夜空',
  },
  {
    id: 'dark-tech-neon',
    name: '赛博网格',
    kind: 'svg',
    mode: 'dark',
    component: DarkTechNeonWallpaper,
    group: '科技极客',
    description: '深空网格与青色光点，冷峻的科技感',
  },

  /* ---------------- 浅色模式 · 古风雅韵 ----------------
     三款都是"大面积留白 + 局部元素"的构图：首页的文案区（左中）保持干净，
     视觉重量全部压在右下/右侧边缘，这样文字直接压上去也不会糊 */
  {
    id: 'art-ink-mountain',
    name: '水墨远山',
    kind: 'svg',
    mode: 'light',
    component: InkMountainWallpaper,
    group: '古风雅韵',
    description: '宣纸底、三层淡墨山峦，一枚朱印点题',
    tint: '#ece7d9',
    paper: 'rgba(251,249,242,0.62)',
    chrome: 'rgba(251,249,242,0.76)',
    thumbCss:
      'linear-gradient(180deg, transparent 0 56%, rgba(135,151,142,0.42) 56% 72%, rgba(99,115,107,0.5) 72%),' +
      'linear-gradient(180deg, #f8f5ec 0%, #eceee7 100%)',
  },
  {
    id: 'art-ink-bamboo',
    name: '墨竹疏影',
    kind: 'svg',
    mode: 'light',
    component: InkBambooWallpaper,
    group: '古风雅韵',
    description: '淡青纸底，右侧几竿修竹，左侧留白',
    tint: '#e6ebe4',
    paper: 'rgba(247,250,246,0.62)',
    chrome: 'rgba(247,250,246,0.76)',
    thumbCss:
      'repeating-linear-gradient(90deg, transparent 0 76%, rgba(111,138,114,0.5) 76% 78%, transparent 78% 88%, rgba(111,138,114,0.4) 88% 89.5%),' +
      'linear-gradient(180deg, #f3f6f1, #e7ece6)',
  },
  {
    id: 'art-blue-porcelain',
    name: '青花缠枝',
    kind: 'svg',
    mode: 'light',
    component: BluePorcelainWallpaper,
    group: '古风雅韵',
    description: '泛青白瓷底，上下缘缠枝青花',
    tint: '#e6eef5',
    paper: 'rgba(249,252,254,0.6)',
    chrome: 'rgba(249,252,254,0.74)',
    thumbCss:
      'repeating-linear-gradient(0deg, transparent 0 86%, rgba(53,97,140,0.26) 86% 88%, transparent 88% 100%),' +
      'linear-gradient(180deg, #f7fafc, #e9f0f6)',
  },

  /* ---------------- 浅色模式 · 山水意境 ---------------- */
  {
    id: 'art-moon-lake',
    name: '水月清辉',
    kind: 'svg',
    mode: 'light',
    component: MoonLakeWallpaper,
    group: '山水意境',
    description: '冷调月夜，月影落在湖面',
    tint: '#e2ebf4',
    paper: 'rgba(246,250,254,0.64)',
    chrome: 'rgba(246,250,254,0.78)',
    thumbCss:
      'radial-gradient(circle at 70% 22%, #ffffff 0 7%, rgba(255,255,255,0.45) 7% 15%, transparent 16%),' +
      'linear-gradient(180deg, #eef3f8 0%, #e4ecf4 48%, #cfdce9 100%)',
  },
  {
    id: 'art-autumn-mist',
    name: '秋山薄雾',
    kind: 'svg',
    mode: 'light',
    component: AutumnMistWallpaper,
    group: '山水意境',
    description: '暖褐层峦，雾带横在山腰',
    tint: '#f2e5d2',
    paper: 'rgba(253,247,238,0.62)',
    chrome: 'rgba(253,247,238,0.76)',
    thumbCss:
      'linear-gradient(180deg, transparent 0 54%, rgba(201,168,130,0.36) 54% 66%, rgba(181,143,102,0.46) 66% 82%, rgba(142,111,77,0.5) 82%),' +
      'linear-gradient(180deg, #faf3e7, #f0e1ca)',
  },

  /* ---------------- 浅色模式（柔和护眼） ---------------- */
  {
    id: 'green-eye',
    name: '豆沙绿',
    kind: 'svg',
    mode: 'light',
    component: GreenEyeWallpaper,
    description: '经典护眼绿，柔光斑点点',
    tint: '#cfe6d6',
    paper: 'rgba(238,248,241,0.92)',
    thumbCss:
      'radial-gradient(circle at 22% 26%, rgba(255,255,255,0.6), transparent 42%),' +
      'linear-gradient(180deg, #d9efde 0%, #c4e3cd 100%)',
  },
  {
    id: 'mist-morning',
    name: '晨雾青',
    kind: 'svg',
    mode: 'light',
    component: MistMorningWallpaper,
    description: '淡青晨雾，远山与薄日',
    tint: '#d3e7ec',
    paper: 'rgba(242,250,252,0.9)',
    thumbCss: 'linear-gradient(180deg, #e2f0f4 0%, #d8eee6 62%, rgba(154,196,188,0.5) 100%)',
  },
  {
    id: 'lake-morning',
    name: '湖畔清晨',
    kind: 'svg',
    mode: 'light',
    component: LakeMorningWallpaper,
    description: '远山湖面，晨光微澜',
    tint: '#cfe0ea',
    paper: 'rgba(240,248,252,0.72)',
    thumbCss: 'linear-gradient(180deg, #e8f3f8 0%, #dcebf2 62%, rgba(196,222,236,0.8) 100%)',
  },

  /* ---------------- 浅色模式 · 质感纸纹（纯 CSS/SVG 绘制，零图片资源） ----------------
     纸纹类壁纸的 paper 给较低不透明度，让底纹能透到正文纸面和目录面板上（有道云纸纹的效果）；
     纹理本身对比度极低，不影响正文阅读 */
  {
    id: 'texture-linen',
    name: '亚麻织纹',
    kind: 'svg',
    mode: 'light',
    component: LinenWeaveWallpaper,
    group: '质感纸纹',
    description: '米白亚麻布经纬交织，温和素雅',
    tint: '#ece4d2',
    paper: 'transparent', // 纹理壁纸：纸面全透明，让底纹直接透到正文/目录
    chrome: 'rgba(238,240,243,0.88)', // 部件底色：偏灰半透明，让工具条/补白格在纹理上有层次
    thumbCss:
      'repeating-linear-gradient(0deg, rgba(122,100,68,0.09) 0 1px, transparent 1px 3px),' +
      'repeating-linear-gradient(90deg, rgba(122,100,68,0.09) 0 1px, transparent 1px 3px),' +
      'linear-gradient(180deg, #f8f4ec 0%, #ece4d3 100%)',
  },
  {
    id: 'texture-grid',
    name: '手账方格',
    kind: 'svg',
    mode: 'light',
    component: GridPaperWallpaper,
    group: '质感纸纹',
    description: '淡青白底浅绿方格，笔记本内页',
    tint: '#dcebe0',
    paper: 'transparent', // 纹理壁纸：纸面全透明，让底纹直接透到正文/目录
    chrome: 'rgba(238,240,243,0.88)', // 部件底色：偏灰半透明，让工具条/补白格在纹理上有层次
    thumbCss:
      'repeating-linear-gradient(0deg, rgba(96,142,118,0.14) 0 1px, transparent 1px 12px),' +
      'repeating-linear-gradient(90deg, rgba(96,142,118,0.14) 0 1px, transparent 1px 12px),' +
      'linear-gradient(180deg, #f4faf6 0%, #e3efe7 100%)',
  },
  {
    id: 'texture-laid',
    name: '青瓷横纹',
    kind: 'svg',
    mode: 'light',
    component: LaidPaperWallpaper,
    group: '质感纸纹',
    description: '淡青底极细帘纹，传统帘纹纸',
    tint: '#d9e8e3',
    paper: 'transparent', // 纹理壁纸：纸面全透明，让底纹直接透到正文/目录
    chrome: 'rgba(238,240,243,0.88)', // 部件底色：偏灰半透明，让工具条/补白格在纹理上有层次
    thumbCss:
      'repeating-linear-gradient(0deg, rgba(74,112,106,0.1) 0 1px, transparent 1px 4px),' +
      'linear-gradient(180deg, #f0f6f4 0%, #ddeae6 100%)',
  },
];

export function getWallpaperById(id: string): WallpaperPreset | undefined {
  return WALLPAPER_PRESETS.find((w) => w.id === id);
}

/** 按模式取壁纸组（none 永远包含，便于弹框展示"默认"） */
export function getWallpapersByMode(mode: WallpaperMode): WallpaperPreset[] {
  return WALLPAPER_PRESETS.filter((w) => w.id === WALLPAPER_NONE_ID || (w.mode ?? 'dark') === mode);
}

export function presetMode(p: WallpaperPreset): WallpaperMode {
  return p.mode ?? 'dark';
}

export { default as WallpaperHost } from './WallpaperHost';
