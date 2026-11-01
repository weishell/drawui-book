import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import type { Descendant } from 'slate';
import BookEditor from '@/core';
import { useEditorMode } from '@/context/EditorContext';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_SHORT } from '@/i18n';
import { getArticleById, getCategory, type Article as ArticleData } from '@/data/articles';
import { localizeArticle } from '@/data/localize';
import { canWrite, getCachedArticle } from '@/data/store';
import {
  deleteArticleById,
  loadArticle,
  recordArticleRead,
  saveArticleContent,
} from '@/data/bootstrap';
import NotFound from './NotFound';
import styles from './Article.module.less';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

/** Slate 不接受空数组作为 initialValue，兜一个空段落 */
const EMPTY_DOC: Descendant[] = [
  { type: 'paragraph', id: 'empty', children: [{ text: '' }] } as unknown as Descendant,
];

export default function Article() {
  const { id = '' } = useParams();
  const article = getArticleById(id);
  const { mode } = useEditorMode();
  const navigate = useNavigate();
  const writable = canWrite();
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  // 当前界面语言：文章正文按这个语言取变体，切换语言时整篇即时换正文
  const lang = i18n.language || 'en';

  // 正文不进快照，进页面时才按篇加载（已加载过的会命中缓存）。
  // 连同 id 一起存：切换文章时不会先闪一帧上一篇的正文
  const [loaded, setLoaded] = useState<{ id: string; article: ArticleData } | null>(() => {
    const cached = getCachedArticle(id);
    return cached ? { id, article: cached } : null;
  });
  const detail = loaded && loaded.id === id ? loaded.article : null;
  const content = detail ? localizeArticle(detail, lang).content : null;
  const [loadError, setLoadError] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // 删除后编辑器卸载会触发一次"补交保存"，这里拦住，避免对已删除的文档发 PATCH
  const skipSaveRef = useRef(false);

  useEffect(() => {
    const cached = getCachedArticle(id);
    setLoaded(cached ? { id, article: cached } : null);
    setLoadError('');
    setSaveState('idle');
    setConfirmOpen(false);

    if (cached || !getArticleById(id)) return;
    let alive = true;
    loadArticle(id)
      .then((next) => {
        if (alive) setLoaded({ id, article: next });
      })
      .catch((err: unknown) => {
        if (alive) setLoadError(err instanceof Error ? err.message : '正文加载失败');
      });
    return () => {
      alive = false;
    };
  }, [id]);

  // 真实阅读量：进入文章页记一次（服务端写 SQLite + 文章文件；线上静态站点忽略）
  useEffect(() => {
    if (!getArticleById(id)) return;
    void recordArticleRead(id);
  }, [id]);

  // 编辑器内部已做 400ms 防抖，这里只管提交 + 状态提示
  const handleSave = useCallback(
    async (value: Descendant[]) => {
      if (!writable || skipSaveRef.current) return;
      setSaveState('saving');
      try {
        await saveArticleContent(id, value, lang);
        setSaveState('saved');
      } catch {
        setSaveState('error');
      }
    },
    [id, writable, lang],
  );

  const handleDelete = async () => {
    skipSaveRef.current = true;
    setDeleting(true);
    try {
      await deleteArticleById(id);
      setConfirmOpen(false);
      navigate('/');
    } catch (err) {
      setDeleting(false);
      setConfirmOpen(false);
      setLoadError(err instanceof Error ? err.message : '删除失败');
    }
  };

  if (!article) return <NotFound />;

  const cat = getCategory(article.category);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.crumb}>
          <Link to="/">{t('nav.home')}</Link>
          <span className={styles.crumbSep}>/</span>
          {cat && (
            <>
              <Link to={`/category/${cat.id}`} style={{ color: cat.color }}>
                {cat.name}
              </Link>
              <span className={styles.crumbSep}>/</span>
            </>
          )}
          <span className={styles.crumbCurrent}>{t('articlePage.crumbCurrent')}</span>
        </div>
        <div className={styles.langRow} role="group" aria-label={t('settings.languageTitle')}>
          {SUPPORTED_LANGUAGES.map((code) => (
            <button
              key={code}
              type="button"
              className={`${styles.langChip} ${language === code ? styles.langChipActive : ''}`}
              onClick={() => void setLanguage(code)}
              aria-pressed={language === code}
            >
              {LANGUAGE_SHORT[code]}
            </button>
          ))}
        </div>
        {writable && (
          <div className={styles.actions}>
            {saveState !== 'idle' && (
              <span className={styles.saveHint} data-state={saveState}>
                {saveState === 'saving' ? '保存中…' : saveState === 'saved' ? '已保存' : '保存失败'}
              </span>
            )}
            <button type="button" className={styles.deleteBtn} onClick={() => setConfirmOpen(true)}>
              删除
            </button>
          </div>
        )}
      </div>

      <div className={styles.editorWrap}>
        {content ? (
          <BookEditor
            key={`${article.id}-${lang}`}
            initialValue={content.length ? content : EMPTY_DOC}
            readOnly={mode === 'read' || !writable}
            persistKey=""
            onSave={handleSave}
          />
        ) : loadError ? (
          <div className={styles.stateBox}>
            <p>正文加载失败：{loadError}</p>
            <p className={styles.stateHint}>确认本地 API 已启动（pnpm dev:server）</p>
          </div>
        ) : (
          <div className={styles.stateBox}>正文加载中…</div>
        )}
      </div>

      <Modal
        open={confirmOpen}
        title="删除这篇文档？"
        okText="删除"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        confirmLoading={deleting}
        onOk={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      >
        <p>删除后文件会直接从磁盘移除，不可恢复。</p>
      </Modal>
    </div>
  );
}
