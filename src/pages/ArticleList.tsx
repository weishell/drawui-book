import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'antd';
import {
  ARTICLE_PAGE_SIZE,
  getAllArticles,
  getArticlesByCategory,
  getArticlesByTag,
  getCategory,
  getTag,
} from '@/data/articles';
import ArticleRow from './ArticleRow';
import NotFound from './NotFound';
import styles from './ArticleList.module.less';

interface ListMeta {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

export default function ArticleList({ kind }: { kind: 'category' | 'tag' | 'all' }) {
  const { t } = useTranslation();
  const { name = '' } = useParams();
  const [page, setPage] = useState(1);

  const articles = useMemo(
    () =>
      kind === 'category'
        ? getArticlesByCategory(name)
        : kind === 'tag'
          ? getArticlesByTag(name)
          : getAllArticles(),
    [kind, name],
  );

  const meta: ListMeta = useMemo(() => {
    if (kind === 'category') {
      const c = getCategory(name);
      return c
        ? { title: c.name, subtitle: c.desc, color: c.color, icon: c.icon }
        : { title: '', subtitle: '', color: '', icon: '' };
    }
    if (kind === 'tag') {
      const tag = getTag(name);
      return tag
        ? { title: tag.name, subtitle: `# ${tag.name}`, color: tag.color, icon: '#' }
        : { title: '', subtitle: '', color: '', icon: '' };
    }
    return {
      title: t('list.allTitle'),
      subtitle: t('list.allSubtitle'),
      color: 'var(--theme-primary)',
      icon: '📚',
    };
  }, [kind, name, t]);

  if (kind !== 'all' && !meta.title) return <NotFound />;

  const total = articles.length;
  const pageSize = ARTICLE_PAGE_SIZE;
  const start = (page - 1) * pageSize;
  const pageArticles = articles.slice(start, start + pageSize);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.crumb}>
        <Link to="/">{t('nav.home')}</Link>
        <span className={styles.crumbSep}>/</span>
        <span style={{ color: meta.color }}>
          {kind === 'category'
            ? t('list.categoryPrefix', { name: meta.title })
            : kind === 'tag'
              ? t('list.tagPrefix', { name: meta.title })
              : meta.title}
        </span>
      </div>

      <header className={styles.header}>
        <div className={styles.headerIcon} style={{ background: meta.color }}>
          {meta.icon}
        </div>
        <div>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.subtitle}>
            {meta.subtitle} · {t('list.countInfo', { count: total, pageSize })}
          </p>
        </div>
      </header>

      {pageArticles.length === 0 ? (
        <div className={styles.empty}>
          {kind === 'all' ? t('list.emptyAll') : t('list.emptyFiltered')}
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {pageArticles.map((a) => (
              <ArticleRow key={a.id} article={a} />
            ))}
          </div>
          {total > pageSize && (
            <div className={styles.pager}>
              <Pagination
                current={page}
                total={total}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showTotal={(count) => t('list.total', { count })}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
