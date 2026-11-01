// 文章多语言：默认语言（base）直接存在文章本体的 title/summary/content 上，
// 其他语言放在 translations 里；这里按当前界面语言做一次"选变体"。
//
// 回退顺序：精确语言 → 同语种（zh-TW → zh）→ 默认语言（en）→ 任意一个变体。
// 文章文件里没有对应语言时始终能显示默认语言，不会出现空标题。
import type { Article, ArticleIndex, ArticleTranslation, ArticleTranslationMeta } from './types';

/** 文章写入时的默认语言：文章本体的 title/summary/content 就是这份 */
export const ARTICLE_BASE_LANG = 'en';

const pickVariant = <T extends ArticleTranslationMeta>(
  variants: Record<string, T> | undefined,
  lang: string,
): T | undefined => {
  if (!variants) return undefined;
  const keys = Object.keys(variants);
  if (keys.length === 0) return undefined;

  if (variants[lang]) return variants[lang];
  const base = lang.split('-')[0];
  if (base !== lang && variants[base]) return variants[base];
  // 请求的就是默认语言时，本体的 title/summary/content 已经是它，不该借用别的变体
  if (lang === ARTICLE_BASE_LANG || base === ARTICLE_BASE_LANG) return undefined;
  return variants[ARTICLE_BASE_LANG];
};

/** 列表项：按语言取标题/摘要 */
export function localizeArticleIndex(article: ArticleIndex, lang: string): ArticleIndex {
  const variant = pickVariant(article.translations, lang);
  if (!variant) return article;
  return {
    ...article,
    title: variant.title || article.title,
    summary: variant.summary ?? article.summary,
  };
}

/** 详情：按语言取标题/摘要/正文；该语言没写正文时退回默认正文 */
export function localizeArticle(article: Article, lang: string): Article {
  const variant = pickVariant<ArticleTranslation>(article.translations, lang);
  if (!variant) return article;
  return {
    ...article,
    title: variant.title || article.title,
    summary: variant.summary ?? article.summary,
    content:
      Array.isArray(variant.content) && variant.content.length ? variant.content : article.content,
  };
}

/** 索引库只存标题/摘要，写入时把正文从各语言变体里剔除，避免索引膨胀 */
export function toTranslationMeta(
  translations: Record<string, ArticleTranslation> | undefined,
): Record<string, ArticleTranslationMeta> | undefined {
  if (!translations) return undefined;
  const out: Record<string, ArticleTranslationMeta> = {};
  for (const [lang, item] of Object.entries(translations)) {
    if (!item?.title) continue;
    out[lang] = { title: item.title, summary: item.summary ?? '' };
  }
  return Object.keys(out).length ? out : undefined;
}
