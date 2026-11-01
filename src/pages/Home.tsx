import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllArticles, getAllCategories, getAllTags, getArticleTotal } from '@/data/articles';
import { localizeArticleIndex } from '@/data/localize';
import { assetUrl } from '@/data/assets';
import { canWrite, getDataState } from '@/data/store';
import { HERO_SCENE, HeroSceneBackdrop } from '@/pages/home/scenes';
import NewArticleModal from './NewArticleModal';
import TaxonomyManager from '@/components/TaxonomyManager';
import styles from './Home.module.less';

export default function Home() {
  const { t, i18n } = useTranslation();
  const categories = getAllCategories();
  const tags = getAllTags();
  const total = getArticleTotal();
  const latest = getAllArticles().slice(0, 5);
  const writable = canWrite();
  const source = getDataState().source;
  const [newOpen, setNewOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  // 维护面板改完分类/标签后自增，触发本页重新渲染（数据在 store 里已更新）
  const [, bumpVersion] = useState(0);
  // 首页氛围背景固定为「水墨远山」，不再提供切换器
  const scene = HERO_SCENE;

  return (
    <div className={styles.page}>
      {/* Hero：整幅氛围背景铺底，左侧文案 + 右侧数据卡。
          背景固定为水墨远山（浅色），文字用深色，保证对比度。 */}
      <section className={`${styles.hero} ${scene.tone === 'dark' ? styles.heroDark : ''}`}>
        <HeroSceneBackdrop />
        <span className={styles.heroVeil} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.heroBadge}>{t('home.badge')}</span>
            <h1 className={styles.heroTitle}>{t('home.title')}</h1>
            <p className={styles.heroDesc}>{t('home.desc')}</p>
            {writable && (
              <div className={styles.heroActions}>
                <button
                  type="button"
                  className={styles.heroBtnPrimary}
                  onClick={() => setNewOpen(true)}
                >
                  {t('home.newDoc')}
                </button>
                <button
                  type="button"
                  className={styles.heroBtnGhost}
                  onClick={() => setManageOpen(true)}
                >
                  {t('home.manage')}
                </button>
              </div>
            )}
          </div>

          {total > 0 && (
            <aside className={styles.heroAside} aria-label="全站统计">
              <div className={styles.statCard}>
                <b>{total}</b>
                <span>{t('home.articles')}</span>
              </div>
              <div className={styles.statCard}>
                <b>{categories.length}</b>
                <span>{t('home.categories')}</span>
              </div>
              <div className={styles.statCard}>
                <b>{tags.length}</b>
                <span>{t('home.tags')}</span>
              </div>
            </aside>
          )}
        </div>
      </section>

      {latest.length > 0 && (
        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>{t('home.recentTitle')}</h2>
            <span className={styles.blockDesc}>
              {writable
                ? t('home.recentLive')
                : source === 'offline'
                  ? t('home.recentOffline')
                  : t('home.recentStatic')}
            </span>
            <Link to="/articles" className={styles.moreLink}>
              {t('home.more')}
              <span className={styles.moreArrow}>›</span>
            </Link>
          </div>
          <div className={styles.latestList}>
            {latest.map((a, i) => (
              <Link key={a.id} to={`/article/${a.id}`} className={styles.latestRow}>
                <span className={styles.latestIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.latestTitle}>
                  {localizeArticleIndex(a, i18n.language).title}
                </span>
                <span className={styles.latestDate}>{a.date}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>{t('home.categoriesTitle')}</h2>
            <span className={styles.blockDesc}>{t('home.categoriesDesc')}</span>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className={styles.categoryCard}
                style={{ '--card-color': c.color } as CSSProperties}
              >
                <span
                  className={styles.categoryCover}
                  style={{ backgroundImage: `url(${assetUrl(c.cover)})` }}
                />
                <span className={styles.categoryBody}>
                  <span className={styles.categoryIcon}>{c.icon}</span>
                  <span className={styles.categoryName}>{c.name}</span>
                  <span className={styles.categoryDesc}>{c.desc}</span>
                  <span className={styles.categoryCount}>
                    {t('home.posts', { count: c.count })}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {tags.length > 0 && (
        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>{t('home.tagsTitle')}</h2>
            <span className={styles.blockDesc}>{t('home.tagsDesc')}</span>
          </div>
          <div className={styles.tagCloud}>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tag/${tag.id}`}
                className={styles.tagCard}
                style={{ '--card-color': tag.color } as CSSProperties}
              >
                <span className={styles.tagName}># {tag.name}</span>
                <span className={styles.tagCount}>{tag.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <NewArticleModal open={newOpen} onClose={() => setNewOpen(false)} />
      <TaxonomyManager
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        onChanged={() => bumpVersion((v) => v + 1)}
      />
    </div>
  );
}
