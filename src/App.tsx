import { useState } from 'react';
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import ArticleList from '@/pages/ArticleList';
import Article from '@/pages/Article';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import DrawuiLayout from '@/pages/drawui/DrawuiLayout';
import DrawuiOverview from '@/pages/drawui/Overview';
import CoreDocs from '@/pages/drawui/CoreDocs';
import ReactDocs from '@/pages/drawui/ReactDocs';
import AntdThemeBridge from '@/components/AntdThemeBridge';
import { InlineToastHost } from '@/components/InlineToast';
import { BackToTop } from '@/components/BackToTop/BackToTop';
import { Outline } from '@/components/Outline/Outline';
import { WallpaperHost } from '@/components/wallpapers';
import { EditorProvider } from '@/context/EditorContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { FindReplaceProvider, FindReplacePanel } from '@/components/find-replace';
import styles from './App.module.less';

/** 顶栏搜索框：回车跳转到 /search?q=… */
function HeaderSearch() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const submit = () => {
    const q = value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={styles.searchBox}>
      <svg
        className={styles.searchIcon}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.2-3.2" />
      </svg>
      <input
        value={value}
        placeholder={t('header.searchPlaceholder')}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
    </div>
  );
}

/** 顶栏导航图标：和设置页同一套线性风格，尺寸压到 15px 不抢文字 */
function NavIcon({ name }: { name: 'home' | 'articles' | 'canvas' | 'settings' }) {
  const common = {
    className: styles.navIcon,
    width: 15,
    height: 15,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 10.6L12 4l8 6.6" />
          <path d="M6.6 9.6V20h10.8V9.6" />
        </svg>
      );
    case 'articles':
      return (
        <svg {...common}>
          <rect x="4.5" y="4" width="15" height="16" rx="2.6" />
          <path d="M8.2 9h7.6M8.2 13h7.6M8.2 17h4.8" />
        </svg>
      );
    case 'canvas':
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
          <circle cx="8" cy="9.5" r="1.4" />
          <path d="M5 16.5l3.6-3.4 2.6 2.4 3-2.9 3.3 3.2" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
          <circle cx="9" cy="7" r="2.1" />
          <circle cx="15" cy="12" r="2.1" />
          <circle cx="9" cy="17" r="2.1" />
        </svg>
      );
    default:
      return null;
  }
}

/** 顶栏导航：设置是独立路由页，不再用下拉浮层 */
function HeaderNav() {
  const { t } = useTranslation();
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  return (
    <nav className={styles.nav}>
      <NavLink to="/" end className={navClass}>
        <NavIcon name="home" />
        {t('nav.home')}
      </NavLink>
      <NavLink to="/articles" className={navClass}>
        <NavIcon name="articles" />
        {t('nav.articles')}
      </NavLink>
      <NavLink to="/drawui" className={navClass}>
        <NavIcon name="canvas" />
        {t('nav.drawui')}
      </NavLink>
      <NavLink to="/settings" className={navClass}>
        <NavIcon name="settings" />
        {t('nav.settings')}
      </NavLink>
    </nav>
  );
}

function AppFrame() {
  const { pathname } = useLocation();

  // 目录只属于正在看的那篇文档。除了不渲染 <Outline />（组件内部也会判断），
  // 这里连「给它留的那 240px 左栏」也一起收掉 —— 否则回到首页后会空出一条
  // 竖着的空白栏，看起来就像目录还挂着。
  const isDocRoute = pathname.startsWith('/article/');

  return (
    <div className={styles.container}>
      <WallpaperHost />
      <header className={styles.header}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo} aria-label="drawui">
            <img className={styles.logoMark} src="/favicon.svg" alt="" />
            drawui
          </Link>
          <HeaderNav />
        </div>
        <div className={styles.controls}>
          <HeaderSearch />
        </div>
      </header>
      <main className={`${styles.main} ${isDocRoute ? styles.mainDoc : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:name" element={<ArticleList kind="category" />} />
          <Route path="/tag/:name" element={<ArticleList kind="tag" />} />
          <Route path="/articles" element={<ArticleList kind="all" />} />
          <Route path="/drawui" element={<DrawuiLayout />}>
            <Route index element={<DrawuiOverview />} />
            <Route path="core" element={<CoreDocs />} />
            <Route path="react" element={<ReactDocs />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          {/* 旧的 /appearance 已并入 /settings，保留跳转免得书签失效 */}
          <Route path="/appearance" element={<Navigate to="/settings" replace />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Outline />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AntdThemeBridge>
          <EditorProvider>
            <FindReplaceProvider>
              <BrowserRouter>
                <AppFrame />
              </BrowserRouter>
              <FindReplacePanel />
              <InlineToastHost />
            </FindReplaceProvider>
          </EditorProvider>
        </AntdThemeBridge>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
