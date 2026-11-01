// 数据访问层：开发环境走本地 API，生产环境走静态 JSON
// 两者形状完全一致，页面只认这里暴露的函数
import type { Descendant } from 'slate';
import type { Article, ArticleIndex, ArticleInput, Category, Tag } from './types';
import {
  canWrite,
  clearArticleCache,
  getCachedArticle,
  getDataState,
  setCachedArticle,
  setDataState,
} from './store';
import { ARTICLE_BASE_LANG } from './localize';

/** 开发：/api/*（Vite 代理到本地 3001）｜生产：/data/*.json（构建产物） */
const IS_DEV = import.meta.env.DEV;
const API_BASE = '/api';
const STATIC_BASE = '/data';

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      /* 非 JSON 响应，保留状态码信息 */
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

const toIndex = (article: Article): ArticleIndex => ({
  id: article.id,
  title: article.title,
  summary: article.summary,
  category: article.category,
  tags: article.tags ?? [],
  date: article.date,
  reads: article.reads,
  updatedAt: article.updatedAt,
  translations: article.translations,
});

/** 启动时灌一次快照：失败则进入只读空状态，不再回退到任何示例内容 */
export async function bootstrapData(): Promise<void> {
  try {
    const [meta, articles] = await Promise.all([
      fetchJson<{ categories: Category[]; tags: Tag[] }>(
        IS_DEV ? `${API_BASE}/meta` : `${STATIC_BASE}/meta.json`,
      ),
      fetchJson<ArticleIndex[]>(IS_DEV ? `${API_BASE}/articles` : `${STATIC_BASE}/articles.json`),
    ]);
    setDataState({
      categories: meta.categories ?? [],
      tags: meta.tags ?? [],
      articles: Array.isArray(articles) ? articles : [],
      source: IS_DEV ? 'api' : 'static',
    });
  } catch (err) {
    console.warn('[data] 数据源不可用，进入只读空状态：', err);
    clearArticleCache();
    setDataState({ categories: [], tags: [], articles: [], source: 'offline' });
  }
}

/** 取单篇：先看缓存，未命中再请求（线上按篇拆文件，本地走 API） */
export async function loadArticle(id: string): Promise<Article> {
  const cached = getCachedArticle(id);
  if (cached) return cached;

  const article = await fetchJson<Article>(
    IS_DEV ? `${API_BASE}/articles/${id}` : `${STATIC_BASE}/articles/${id}.json`,
  );
  const next: Article = { ...article, content: article.content ?? [] };
  setCachedArticle(id, next);
  return next;
}

export async function loadArticleContent(id: string): Promise<Descendant[]> {
  const article = await loadArticle(id);
  return article.content;
}

/** 新建文档（仅本地后端可用） */
export async function createArticle(input: ArticleInput): Promise<ArticleIndex> {
  if (!canWrite()) throw new Error('当前为只读模式，无法新建文档');
  const created = await fetchJson<Article>(`${API_BASE}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: input.title,
      summary: input.summary ?? '',
      categoryId: input.categoryId,
      tagIds: input.tagIds ?? [],
      content: input.content ?? [
        {
          type: 'heading-title',
          id: crypto.randomUUID(),
          attrs: { author: '青柠脉动', date: new Date().toISOString().slice(0, 10) },
          children: [{ text: input.title || '未命名文档' }],
        },
        { type: 'paragraph', id: crypto.randomUUID(), children: [{ text: '' }] },
      ],
    }),
  });
  const createdNext: Article = { ...created, content: created.content ?? [] };
  setCachedArticle(created.id, createdNext);
  setDataState({ articles: [toIndex(created), ...getDataState().articles] });
  return toIndex(created);
}

/** 自动保存：只提交正文；lang 非默认语言时写进该语言的 translations 变体 */
export async function saveArticleContent(
  id: string,
  content: Descendant[],
  lang: string = ARTICLE_BASE_LANG,
): Promise<void> {
  if (!canWrite()) return;
  const res = await fetchJson<{ ok: boolean; updatedAt: string }>(
    `${API_BASE}/articles/${id}/autosave`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, lang }),
    },
  );
  const cached = getCachedArticle(id);
  if (cached) {
    if (lang === ARTICLE_BASE_LANG) {
      setCachedArticle(id, { ...cached, content });
    } else {
      const variant = cached.translations?.[lang];
      setCachedArticle(id, {
        ...cached,
        translations: {
          ...(cached.translations ?? {}),
          [lang]: { title: variant?.title ?? cached.title, ...variant, content },
        },
      });
    }
  }
  setDataState({
    articles: getDataState().articles.map((a) =>
      a.id === id ? { ...a, updatedAt: res.updatedAt } : a,
    ),
  });
}

/** 阅读计数去重：同一篇 2 秒内只记一次，避免 StrictMode 下 effect 双跑重复计数 */
const readMarks = new Map<string, number>();

/**
 * 记一次阅读（服务端 reads +1，文件与 SQLite 同步更新）。
 * 仅本地 API 模式生效；线上纯静态站点没有后端，直接忽略。
 */
export async function recordArticleRead(id: string): Promise<number | null> {
  if (!IS_DEV || !canWrite()) return null;
  const now = Date.now();
  if (now - (readMarks.get(id) ?? 0) < 2000) return null;
  readMarks.set(id, now);
  try {
    const res = await fetchJson<{ reads: number }>(`${API_BASE}/articles/${id}/reads`, {
      method: 'POST',
    });
    setDataState({
      articles: getDataState().articles.map((a) => (a.id === id ? { ...a, reads: res.reads } : a)),
    });
    return res.reads;
  } catch {
    return null;
  }
}

/** 删除（服务端直接从磁盘移除） */
export async function deleteArticleById(id: string): Promise<void> {
  if (!canWrite()) throw new Error('当前为只读模式，无法删除文档');
  await fetchJson<{ ok: boolean }>(`${API_BASE}/articles/${id}`, { method: 'DELETE' });
  clearArticleCache();
  setDataState({ articles: getDataState().articles.filter((a) => a.id !== id) });
}

// ---------------------------------------------------------------------------
// 分类 / 标签维护（仅本地可写模式）
// 服务端每次都会回传完整 meta，直接覆盖内存态，避免两边漂移
// ---------------------------------------------------------------------------

interface TaxonomyResponse {
  categories: Category[];
  tags: Tag[];
}

const applyTaxonomy = (res: TaxonomyResponse) => {
  setDataState({ categories: res.categories ?? [], tags: res.tags ?? [] });
  return res;
};

const ensureWritable = () => {
  if (!canWrite()) throw new Error('当前为只读模式，无法修改分类或标签');
};

const jsonInit = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export interface CategoryInput {
  name: string;
  color?: string;
  icon?: string;
  desc?: string;
}

export async function createCategory(input: CategoryInput): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/categories`, jsonInit('POST', input)),
  );
}

export async function updateCategory(
  id: string,
  patch: Partial<CategoryInput> & { cover?: string | null },
): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/categories/${id}`, jsonInit('PUT', patch)),
  );
}

export async function deleteCategory(id: string): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/categories/${id}`, { method: 'DELETE' }),
  );
}

/** 封面：直接把文件当请求体发（服务端按 X-Filename 存盘），省掉 multipart 依赖 */
export async function uploadCategoryCover(id: string, file: File): Promise<TaxonomyResponse> {
  ensureWritable();
  const res = await fetch(`${API_BASE}/categories/${id}/cover`, {
    method: 'POST',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'X-Filename': encodeURIComponent(file.name || 'cover.png'),
    },
    body: file,
  });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      /* 忽略非 JSON 响应 */
    }
    throw new Error(message);
  }
  return applyTaxonomy((await res.json()) as TaxonomyResponse);
}

export interface TagInput {
  name: string;
  color?: string;
}

export async function createTag(input: TagInput): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/tags`, jsonInit('POST', input)),
  );
}

export async function updateTag(id: string, patch: Partial<TagInput>): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/tags/${id}`, jsonInit('PUT', patch)),
  );
}

export async function deleteTag(id: string): Promise<TaxonomyResponse> {
  ensureWritable();
  return applyTaxonomy(
    await fetchJson<TaxonomyResponse>(`${API_BASE}/tags/${id}`, { method: 'DELETE' }),
  );
}
