// drawui 文档站的多语言内容结构。
// 页面只读这里的数据，代码示例、图形数据（presets.ts）与路由不参与翻译。
import type { AppLanguage } from '@/i18n';

export interface NavItem {
  label: string;
  to: string;
  end?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface AnchorItem {
  label: string;
  hash: string;
}

export interface PageSectionCopy {
  title: string;
  desc?: string;
}

export interface FeatureCopy {
  title: string;
  desc: string;
}

export interface StatCopy {
  value: string;
  label: string;
}

export interface SceneCopy {
  title: string;
  desc: string;
  points: string[];
}

export interface ChangelogCopy {
  version: string;
  date: string;
  points: string[];
}

export interface OverviewContent {
  eyebrow: string;
  heroTitleLines: [string, string];
  heroLead: string;
  badges: string[];
  heroActions: { startReact: string; learnCore: string; openPlayground: string };
  floatCards: { undoTitle: string; undoDesc: string; dragTitle: string; dragDesc: string };
  stats: StatCopy[];
  featuresSection: PageSectionCopy;
  features: FeatureCopy[];
  packagesSection: PageSectionCopy;
  packages: {
    coreTag: string;
    coreDesc: string;
    corePoints: string[];
    reactTag: string;
    reactDesc: string;
    reactPoints: string[];
  };
  gallerySection: PageSectionCopy;
  gallery: FeatureCopy[];
  quickstartSection: PageSectionCopy;
  quickstart: { installTitle: string; renderTitle: string; callout: string };
  scenesSection: PageSectionCopy;
  scenes: SceneCopy[];
  end: { title: string; desc: string; open: string; react: string };
}

export interface CoreContent {
  pageTitle: string;
  pageLead: string;
  badges: string[];
  split: { title: string; body: string; points: string[] };
  featuresSection: PageSectionCopy;
  features: FeatureCopy[];
  quickstartSection: PageSectionCopy;
  quickstart: {
    optionsTitle: string;
    tableHead: string[];
    tableRows: string[][];
  };
  apiSection: {
    title: string;
    exportsTitle: string;
    exportsHead: string[];
    exportsRows: string[][];
    methodsTitle: string;
    methodsHead: string[];
    methodsRows: string[][];
  };
  image: PageSectionCopy & {
    channelA: string;
    channelB: string;
    callout: string;
  };
  changelogSection: PageSectionCopy;
  changelog: ChangelogCopy[];
  next: { title: string; desc: string; link: string };
}

export interface ReactContent {
  pageTitle: string;
  pageLead: string;
  badges: string[];
  heroActions: { openPlayground: string; npm: string };
  split: { title: string; body: string; points: string[] };
  featuresSection: PageSectionCopy;
  features: FeatureCopy[];
  quickstartSection: PageSectionCopy;
  quickstart: { callout: string };
  props: {
    title: string;
    tableHead: string[];
    tableRows: string[][];
    exportsTitle: string;
    exportsHead: string[];
    exportsRows: string[][];
  };
  image: PageSectionCopy & { channelA: string; channelB: string; callout: string };
  changelogSection: PageSectionCopy;
  changelog: ChangelogCopy[];
  next: { title: string; desc: string; button: string };
}

export interface LayoutContent {
  brandTag: string;
  navGroups: NavGroup[];
  pageContentsLabel: string;
  anchorsByPath: Record<string, AnchorItem[]>;
  npmLabel: string;
}

export interface PlaygroundContent {
  title: string;
  /** 用 {count} 占位，渲染时替换为当前图形数量 */
  hint: string;
  reset: string;
  clear: string;
  closeAria: string;
  presetNames: Record<string, string>;
}

export interface CommonContent {
  copy: string;
  copied: string;
}

export interface DocsContent {
  layout: LayoutContent;
  playground: PlaygroundContent;
  common: CommonContent;
  overview: OverviewContent;
  core: CoreContent;
  react: ReactContent;
}

export type DocsContentMap = Record<AppLanguage, DocsContent>;
