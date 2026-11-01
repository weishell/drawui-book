// 数据内存态：启动时灌一次快照，之后页面同步读取
// 这样列表页不需要改成异步组件 —— 保持原来的同步选择器 API
import type { Article, ArticleIndex, Category, DataSource, Tag } from './types';

interface DataState {
  categories: Category[];
  tags: Tag[];
  articles: ArticleIndex[];
  source: DataSource;
}

let state: DataState = { categories: [], tags: [], articles: [], source: 'offline' };

/** 详情缓存：按篇懒加载；缓存整篇（含多语言变体），语言切换时不用重新请求 */
const articleCache = new Map<string, Article>();

export const getDataState = (): DataState => state;

export function setDataState(patch: Partial<DataState>) {
  state = { ...state, ...patch };
}

/** 只有本地后端（api）可写；线上静态快照与内置示例都是只读 */
export const canWrite = () => state.source === 'api';

export const getCachedArticle = (id: string) => articleCache.get(id);
export const setCachedArticle = (id: string, article: Article) => {
  articleCache.set(id, article);
};
export const clearArticleCache = () => articleCache.clear();
