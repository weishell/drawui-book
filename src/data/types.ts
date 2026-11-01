// 站点数据模型：列表用 ArticleIndex（无正文），详情才带 content
import type { Descendant } from 'slate';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
  /** 封面相对地址（media/images/covers/xxx.png）；为空时前端展示默认封面 */
  cover?: string | null;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

/** 语言变体里只需要标题/摘要（列表用），正文只在详情里出现 */
export interface ArticleTranslationMeta {
  title: string;
  summary?: string;
}

/** 语言变体（详情用）：标题 + 摘要 + 该语言的 Slate 正文 */
export interface ArticleTranslation extends ArticleTranslationMeta {
  content?: Descendant[];
}

/** 列表项：索引库/静态索引里的形状，正文不在其中 */
export interface ArticleIndex {
  id: string;
  title: string;
  summary: string;
  /** 分类 id（历史字段名沿用 category，便于页面少改） */
  category: string;
  tags: string[];
  date: string;
  reads: number;
  updatedAt?: string;
  /** 多语言标题/摘要，key 为语言代码（en/zh/zh-TW/ja/ko/fr/de） */
  translations?: Record<string, ArticleTranslationMeta>;
}

/** 单篇：索引 + Slate 正文（translations 里带各语言正文） */
export interface Article extends Omit<ArticleIndex, 'translations'> {
  content: Descendant[];
  translations?: Record<string, ArticleTranslation>;
}

export interface CategoryWithCount extends Category {
  count: number;
}

export interface TagWithCount extends Tag {
  count: number;
}

/** 新建文档时前端提交的入参 */
export interface ArticleInput {
  title: string;
  summary?: string;
  categoryId?: string;
  tagIds?: string[];
  content?: Descendant[];
}

/** 数据来源：api=本地后端（可写）｜static=线上静态 JSON（只读）｜offline=数据源不可用（只读空状态） */
export type DataSource = 'api' | 'static' | 'offline';
