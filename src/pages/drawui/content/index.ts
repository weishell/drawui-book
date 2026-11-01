// drawui 文档内容入口：按当前界面语言取对应文案，缺失时回退简体中文。
import { useLanguage } from '@/context/LanguageContext';
import type { AppLanguage } from '@/i18n';
import type { DocsContent } from './types';
import zh from './zh';
import zhTW from './zh-TW';
import en from './en';
import ja from './ja';
import ko from './ko';
import fr from './fr';
import de from './de';

const CONTENT: Record<AppLanguage, DocsContent> = {
  zh,
  'zh-TW': zhTW,
  en,
  ja,
  ko,
  fr,
  de,
};

export function useDocsContent(): DocsContent {
  const { language } = useLanguage();
  return CONTENT[language] ?? zh;
}

export type { DocsContent } from './types';
