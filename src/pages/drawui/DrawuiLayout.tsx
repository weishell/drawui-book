import { createContext, useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_SHORT } from '@/i18n';
import Playground from './Playground';
import { useDocsContent } from './content';
import styles from './Drawui.module.less';

interface DrawuiDocsContextValue {
  openPlayground: () => void;
}

const DrawuiDocsContext = createContext<DrawuiDocsContextValue>({
  openPlayground: () => undefined,
});

export function useDrawuiDocs() {
  return useContext(DrawuiDocsContext);
}

export default function DrawuiLayout() {
  const [playOpen, setPlayOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { language, setLanguage } = useLanguage();
  const c = useDocsContent().layout;
  const anchors = c.anchorsByPath[pathname] ?? [];

  // 路由切换（含跨页 #锚点）后，等目标页内容渲染完再滚到对应小节
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);

  const openPlayground = () => setPlayOpen(true);

  return (
    <DrawuiDocsContext.Provider value={{ openPlayground }}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <img className={styles.sidebarLogo} src="/favicon.svg" alt="" width="34" height="34" />
            <span>
              <b>drawui</b>
              <small>{c.brandTag}</small>
            </span>
          </div>

          <nav className={styles.sidebarNav}>
            {c.navGroups.map((group) => (
              <div key={group.title} className={styles.navGroup}>
                <div className={styles.navGroupTitle}>{group.title}</div>
                {group.items.map((item) => {
                  const isPlayground = item.to === '/drawui#playground';
                  if (isPlayground) {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={styles.navJump}
                        onClick={openPlayground}
                      >
                        {item.label}
                        <span className={styles.navArrow}>↗</span>
                      </button>
                    );
                  }
                  if (item.to.includes('#')) {
                    return (
                      <Link key={item.label} className={styles.navAncestor} to={item.to}>
                        {item.label}
                      </Link>
                    );
                  }
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            ))}

            {anchors.length > 0 && (
              <div className={styles.navGroup}>
                <div className={styles.navGroupTitle}>{c.pageContentsLabel}</div>
                {anchors.map((anchor) => (
                  <a
                    key={anchor.hash}
                    className={styles.navAnchor}
                    href={`#${anchor.hash}`}
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById(anchor.hash)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {anchor.label}
                  </a>
                ))}
              </div>
            )}
          </nav>

          <div className={styles.sidebarFoot}>
            <span className={styles.versionTag}>v0.6.0 · MIT</span>
            <a href="https://www.npmjs.com/package/drawui-core" target="_blank" rel="noreferrer">
              {c.npmLabel}
            </a>
            <div className={styles.langRow} role="group" aria-label="Language">
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
          </div>
        </aside>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>

      <Playground open={playOpen} onClose={() => setPlayOpen(false)} />
    </DrawuiDocsContext.Provider>
  );
}
