// 文章业务层：正文读写走文件（data/articles），索引走 SQLite
// 写入顺序：先落文件，再更新索引 —— 索引丢了能重建，文件丢了才是真丢
import crypto from 'node:crypto';
import * as repo from '../repositories/articles.repo.js';
import {
  listArticleFiles,
  readArticleFile,
  deleteArticleFile,
  writeArticleFile,
} from '../storage/article-files.js';
import { badRequest, conflict, notFound } from '../utils/http-error.js';
import { assertSafeId } from '../utils/validators.js';

/** 索引行 → 前端列表项（ArticleIndex）；translations 只含标题/摘要 */
function toIndex(row) {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary ?? '',
    category: row.categoryId ?? '',
    tags: row.tagIds ?? [],
    date: String(row.createdAt ?? '').slice(0, 10),
    reads: Number(row.reads ?? 0),
    updatedAt: row.updatedAt,
    translations: row.translations,
  };
}

/** 文件 + 索引 → 详情（Article） */
function toDetail(article) {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary ?? '',
    category: article.categoryId ?? '',
    tags: article.tagIds ?? [],
    date: String(article.createdAt ?? '').slice(0, 10),
    reads: Number(article.reads ?? 0),
    updatedAt: article.updatedAt,
    content: article.content ?? [],
    // 详情里带各语言的完整正文，前端切换语言时无需再请求
    translations: article.translations,
  };
}

const emptyDocument = () => [
  { type: 'paragraph', id: crypto.randomUUID(), children: [{ text: '' }] },
];

/** 校验并规整多语言变体：必须是 { [lang]: { title, summary?, content? } } */
function normalizeTranslations(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const out = {};
  for (const [lang, item] of Object.entries(input)) {
    if (!item || typeof item !== 'object') continue;
    const title = String(item.title ?? '').trim();
    if (!title) continue;
    const next = { title, summary: String(item.summary ?? '') };
    if (Array.isArray(item.content)) next.content = item.content;
    out[lang] = next;
  }
  return Object.keys(out).length ? out : undefined;
}

export function listArticles(query = {}) {
  return repo
    .findArticles({
      category: query.category || undefined,
      tag: query.tag || undefined,
      q: query.q || undefined,
    })
    .map(toIndex);
}

export function getArticle(id) {
  assertSafeId(id);
  const row = repo.findArticleById(id);
  const file = readArticleFile(id);
  if (!row && !file) throw notFound('文章不存在');
  // 文件优先：即使索引落后，读到的也是真实内容
  if (file) return toDetail(file);
  throw notFound('文章文件缺失，请检查 data/articles/');
}

export function createArticle(body = {}) {
  const title = String(body.title ?? '').trim();
  if (!title) throw badRequest('标题不能为空');
  if (repo.titleExists(title)) throw conflict('标题已存在');

  const now = new Date().toISOString();
  const article = {
    id: crypto.randomUUID(),
    title,
    summary: String(body.summary ?? ''),
    categoryId: body.categoryId ?? null,
    tagIds: Array.isArray(body.tagIds) ? body.tagIds : [],
    content: Array.isArray(body.content) ? body.content : emptyDocument(),
    translations: normalizeTranslations(body.translations),
    status: body.status ?? 'published',
    reads: Number(body.reads ?? 0),
    createdAt: now,
    updatedAt: now,
  };

  writeArticleFile(article);
  repo.insertArticle({ ...article, relPath: `articles/${article.id}.json` });
  return toDetail(article);
}

export function updateArticle(id, body = {}) {
  assertSafeId(id);
  const current = readArticleFile(id) ?? repo.findArticleById(id);
  if (!current) throw notFound('文章不存在');

  const nextTitle = body.title === undefined ? current.title : String(body.title).trim();
  if (!nextTitle) throw badRequest('标题不能为空');
  if (repo.titleExists(nextTitle, id)) throw conflict('标题已存在');

  const article = {
    ...current,
    title: nextTitle,
    summary: body.summary === undefined ? current.summary : String(body.summary),
    categoryId: body.categoryId === undefined ? current.categoryId : body.categoryId,
    tagIds: Array.isArray(body.tagIds) ? body.tagIds : current.tagIds,
    content: Array.isArray(body.content) ? body.content : current.content,
    translations:
      body.translations === undefined
        ? current.translations
        : normalizeTranslations(body.translations),
    status: body.status === undefined ? current.status : body.status,
    updatedAt: new Date().toISOString(),
  };

  writeArticleFile(article);
  repo.updateArticleIndex(article);
  return toDetail(article);
}

/** 自动保存：只写正文，标题/分类/标签不动；lang 非默认语言时写进对应变体 */
export function autosaveArticle(id, body = {}) {
  assertSafeId(id);
  const content = body.content;
  if (!Array.isArray(content)) throw badRequest('content 必须是数组');

  const current = readArticleFile(id);
  if (!current) throw notFound('文章不存在');

  const lang = typeof body.lang === 'string' ? body.lang.trim() : '';
  const isBaseLang = !lang || lang === 'en';
  const translations = isBaseLang
    ? current.translations
    : {
        ...(current.translations ?? {}),
        [lang]: { ...(current.translations?.[lang] ?? { title: current.title }), content },
      };

  const updatedAt = new Date().toISOString();
  writeArticleFile({
    ...current,
    content: isBaseLang ? content : current.content,
    translations,
    updatedAt,
  });
  repo.touchArticle(id, updatedAt);
  return { ok: true, updatedAt };
}

/** 阅读量 +1：文件与索引都写，正文和 updatedAt 保持不变 */
export function incrementReads(id) {
  assertSafeId(id);
  const current = readArticleFile(id);
  if (!current) throw notFound('文章不存在');

  const reads = Number(current.reads ?? 0) + 1;
  writeArticleFile({ ...current, reads });
  repo.setReads(id, reads);
  return { id, reads };
}

export function removeArticle(id) {
  assertSafeId(id);
  const exists = readArticleFile(id) || repo.findArticleById(id);
  if (!exists) throw notFound('文章不存在');

  deleteArticleFile(id);
  repo.deleteArticle(id);
  return { ok: true };
}

export function countArticles() {
  return repo.countArticles();
}

/** 从 Slate 文档树里抽纯文本（正文全文搜索用） */
export function extractText(nodes) {
  let out = '';
  const walk = (list) => {
    for (const node of list ?? []) {
      if (typeof node.text === 'string') out += `${node.text}\n`;
      if (Array.isArray(node.children)) walk(node.children);
    }
  };
  walk(nodes);
  return out;
}

/** 命中位置前后各取一段，做搜索结果摘要 */
export function excerpt(text, q) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return '';
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + q.length + 90);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`;
}

/**
 * 全文搜索：扫 data/articles 下所有文件，标题 / 摘要 / 正文任一命中即返回。
 * 索引库的 LIKE 只覆盖标题摘要，正文搜索必须走文件层。
 */
export function searchArticles(query = {}) {
  const q = String(query.q ?? '')
    .trim()
    .toLowerCase();
  if (!q) return [];

  const hits = [];
  for (const article of listArticleFiles()) {
    const inTitle = article.title.toLowerCase().includes(q);
    const inSummary = article.summary.toLowerCase().includes(q);
    const bodyText = extractText(article.content);
    const inBody = bodyText.toLowerCase().includes(q);

    // 多语言变体同样参与搜索：标题 / 摘要 / 正文任一命中即可
    const translations =
      article.translations && typeof article.translations === 'object' ? article.translations : {};
    let variant = null;
    let variantPart = '';
    for (const item of Object.values(translations)) {
      if (!item) continue;
      if (
        String(item.title ?? '')
          .toLowerCase()
          .includes(q)
      ) {
        variant = item;
        variantPart = 'title';
        break;
      }
      if (
        String(item.summary ?? '')
          .toLowerCase()
          .includes(q)
      ) {
        variant = item;
        variantPart = 'summary';
        break;
      }
      if (item.content && extractText(item.content).toLowerCase().includes(q)) {
        variant = item;
        variantPart = 'body';
        break;
      }
    }

    if (!inTitle && !inSummary && !inBody && !variant) continue;

    const matchedIn =
      inTitle || variantPart === 'title'
        ? 'title'
        : inSummary || variantPart === 'summary'
          ? 'summary'
          : 'body';
    const sourceText =
      matchedIn === 'summary'
        ? article.summary || String(variant?.summary ?? '') || bodyText
        : bodyText || extractText(variant?.content);

    hits.push({
      id: article.id,
      title: article.title,
      summary: article.summary ?? '',
      category: article.categoryId ?? '',
      tags: article.tagIds ?? [],
      date: String(article.createdAt ?? '').slice(0, 10),
      reads: Number(article.reads ?? 0),
      updatedAt: article.updatedAt,
      translations: translations,
      matchedIn,
      snippet: excerpt(sourceText, q),
    });
  }

  // 标题命中 > 摘要命中 > 正文命中，同分按更新时间倒序
  const weight = { title: 2, summary: 1, body: 0 };
  hits.sort((a, b) => {
    const d = (weight[b.matchedIn] ?? 0) - (weight[a.matchedIn] ?? 0);
    return d !== 0 ? d : String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? ''));
  });
  return hits;
}
