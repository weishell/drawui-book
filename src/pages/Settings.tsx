// 设置页（独立路由 /settings）
//
// 为什么把原来顶栏那个「设置」下拉整块搬到这里：
// - 下拉浮层里塞了字体/主题/语言/背景几套选择器，一层套一层，
//   选背景还得看缩略图才知道效果，浮层里根本展不开
// - 设置是"低频、想一次看全"的操作，做成整页 + 左侧分组最直观，
//   而且地址栏有 /settings，可以直接分享/收藏
// - 顶栏因此只剩 logo + 导航 + 搜索，干净很多
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme, THEME_PRESETS, type ThemeId } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useEditorMode } from '@/context/EditorContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_SHORT, type AppLanguage } from '@/i18n';
import { FONT_LIST, DEFAULT_FONT_ID, loadFont, getFontById } from '@/plugins/font';
import {
  WALLPAPER_NONE_ID,
  getWallpapersByMode,
  type WallpaperPreset,
} from '@/components/wallpapers';
import styles from './Settings.module.less';

// 语言放在第一位：这是国际化站点，界面语言是最该被看见的设置项
type TabId = 'language' | 'appearance' | 'theme' | 'font' | 'mode';

/** 设置分组：文案全部走 i18n，图标用 SVG（字符图标在不同字体下会变形） */
const TABS: { id: TabId; labelKey: string; noteKey: string }[] = [
  { id: 'language', labelKey: 'settings.tabs.language', noteKey: 'settings.tabs.languageNote' },
  {
    id: 'appearance',
    labelKey: 'settings.tabs.appearance',
    noteKey: 'settings.tabs.appearanceNote',
  },
  { id: 'theme', labelKey: 'settings.tabs.theme', noteKey: 'settings.tabs.themeNote' },
  { id: 'font', labelKey: 'settings.tabs.font', noteKey: 'settings.tabs.fontNote' },
  { id: 'mode', labelKey: 'settings.tabs.mode', noteKey: 'settings.tabs.modeNote' },
];

/** 侧栏图标（16px 线性 SVG，描边跟随文字颜色） */
function TabIcon({ id }: { id: TabId }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;

  switch (id) {
    case 'language':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.2 12h17.6" />
          <path d="M12 3c2.6 2.7 4 5.7 4 9s-1.4 6.3-4 9c-2.6-2.7-4-5.7-4-9s1.4-6.3 4-9z" />
        </svg>
      );
    case 'appearance':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M4 17.5l4.8-4.8 3.4 3.4 2.9-2.4L20 17.5" />
        </svg>
      );
    case 'theme':
      return (
        <svg {...common}>
          <path d="M12 3c5 0 9 3.6 9 8a4 4 0 0 1-4 4h-1.5c-1 0-1.7.8-1.7 1.8 0 .5.2.9.5 1.3.3.4.4.8.4 1.2 0 1-.8 1.7-1.8 1.7A9 9 0 0 1 12 3z" />
          <circle cx="7.6" cy="10.2" r="1" fill="currentColor" stroke="none" />
          <circle cx="9.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
          <circle cx="13.8" cy="6.6" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.8" cy="9.2" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'font':
      return (
        <svg {...common}>
          <path d="M5 19l5.2-14h3.6L19 19" />
          <path d="M7.4 13.4h9.2" />
        </svg>
      );
    case 'mode':
      return (
        <svg {...common}>
          <path d="M12 6c-2.1-1.7-4.7-2-8-2v13.5c3.3 0 5.9.3 8 2 2.1-1.7 4.7-2 8-2V4c-3.3 0-5.9.3-8 2z" />
          <path d="M12 6v13.5" />
        </svg>
      );
    default:
      return null;
  }
}

/** 语言徽标配色：每种语言一个专属渐变圆点，比灰底短码更容易一眼认出 */
const LANG_COLORS: Record<AppLanguage, [string, string]> = {
  en: ['#3b6bff', '#7c3aed'],
  zh: ['#f0603f', '#d92b20'],
  'zh-TW': ['#f6a23c', '#d9730d'],
  ja: ['#ef5a78', '#c92a4b'],
  ko: ['#6d8ff7', '#3b5bdb'],
  fr: ['#4aa3f0', '#2f6fd0'],
  de: ['#e2b93b', '#a8791a'],
};

// 字体没有自带中文名（i18n 里才有），这里给一份兜底，翻译缺失时不至于显示成 id
const FONT_LABELS: Record<string, string> = {
  default: '默认（继承）',
  songti: '宋体',
  heiti: '黑体',
  kaiti: '楷体',
  fangsong: '仿宋',
  yahei: '微软雅黑',
  jinshusong: '寒蝉锦书宋',
  dongfangdakai: '东方大楷',
};

const BLACK_THEME_ID: ThemeId = 'black';
const DEFAULT_THEME: ThemeId = 'blue';
const DEFAULT_LIGHT_WALLPAPER = 'art-ink-mountain';

/** 浅色壁纸的分组顺序：氛围类在前，「柔和护眼」这类纯色垫底 */
const GROUP_ORDER = [
  '古风雅韵',
  '科技极客',
  '山水意境',
  '质感纸纹',
  '风景照片',
  '插画底图',
  '柔和护眼',
];
const FALLBACK_GROUP = '柔和护眼';

/** 壁纸分组的中文 key → i18n key（壁纸数据本身仍存中文，渲染时翻译） */
const GROUP_I18N: Record<string, string> = {
  古风雅韵: 'ancient',
  科技极客: 'tech',
  山水意境: 'landscape',
  质感纸纹: 'paper',
  风景照片: 'photo',
  插画底图: 'illustration',
  柔和护眼: 'eyeCare',
};

/** 暗黑壁纸没有 thumbCss（组件里画的是动画夜空），给一张同色系的静态渐变兜底 */
const DARK_THUMB_FALLBACK =
  'radial-gradient(circle at 78% 18%, rgba(120,150,220,0.35), transparent 52%),' +
  'linear-gradient(180deg, #101725 0%, #080b13 100%)';

interface Group {
  title: string;
  items: WallpaperPreset[];
}

/** 按 group 字段聚合并按固定顺序排列，未知分组排到最后 */
function groupPresets(presets: WallpaperPreset[]): Group[] {
  const map = new Map<string, WallpaperPreset[]>();
  for (const preset of presets) {
    const key = preset.group || FALLBACK_GROUP;
    const list = map.get(key);
    if (list) list.push(preset);
    else map.set(key, [preset]);
  }

  const ordered: Group[] = [];
  for (const title of GROUP_ORDER) {
    const items = map.get(title);
    if (items?.length) {
      ordered.push({ title, items });
      map.delete(title);
    }
  }
  for (const [title, items] of map) ordered.push({ title, items });
  return ordered;
}

export default function Settings() {
  const { t } = useTranslation();
  const {
    theme,
    themeColor,
    isDarkMode,
    wallpaper,
    lightWallpaper,
    setTheme,
    setWallpaper,
    setLightWallpaper,
  } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { globalFont, setGlobalFont, mode, setMode } = useEditorMode();

  // 默认落在语言分组：国际化项目第一次进设置，先看到语言切换
  const [tab, setTab] = useState<TabId>('language');

  const lightGroups = useMemo(
    () => groupPresets(getWallpapersByMode('light').filter((p) => p.id !== WALLPAPER_NONE_ID)),
    [],
  );
  const darkPresets = useMemo(
    () => getWallpapersByMode('dark').filter((p) => p.id !== WALLPAPER_NONE_ID),
    [],
  );

  const activeId = isDarkMode ? wallpaper : lightWallpaper;
  // 无背景是"两套都关掉"的独立选项，不归属任何一组
  const isNone = activeId === WALLPAPER_NONE_ID || !activeId;

  const switchToLight = () => {
    if (isDarkMode) setTheme(DEFAULT_THEME);
  };
  const switchToDark = () => {
    if (!isDarkMode) setTheme(BLACK_THEME_ID);
  };

  // 浅色壁纸配浅色主题、暗黑壁纸配暗黑主题：壁纸和模式必须一致，
  // 否则 WallpaperHost 会把不匹配的壁纸当成"无壁纸"直接不渲染，用户会以为点了没反应
  const pickLight = (id: string) => {
    setLightWallpaper(id);
    if (isDarkMode) setTheme(DEFAULT_THEME);
  };
  const pickDark = (id: string) => {
    setWallpaper(id);
    if (!isDarkMode) setTheme(BLACK_THEME_ID);
  };
  const resetAll = () => {
    setTheme(DEFAULT_THEME);
    setLightWallpaper(DEFAULT_LIGHT_WALLPAPER);
    setWallpaper(WALLPAPER_NONE_ID);
  };

  const currentFontId = FONT_LIST.find((f) => f.family === globalFont)?.id || DEFAULT_FONT_ID;

  const handleFontClick = useCallback(
    async (fontId: string) => {
      const font = getFontById(fontId);
      if (!font) return;
      if (font.id === DEFAULT_FONT_ID) {
        setGlobalFont('inherit');
        return;
      }
      if (font.category === 'web' && font.url) {
        try {
          await loadFont(font);
        } catch (error) {
          console.error('字体加载失败:', font.id, error);
        }
      }
      setGlobalFont(font.family);
    },
    [setGlobalFont],
  );

  // 壁纸名称/描述在数据层仍是中文，这里统一走 i18n（缺翻译时回退原文）
  const wallpaperName = (preset: WallpaperPreset) =>
    t(`wallpapers.${preset.id}.name`, { defaultValue: preset.name });
  const wallpaperDesc = (preset: WallpaperPreset) =>
    preset.description
      ? t(`wallpapers.${preset.id}.description`, { defaultValue: preset.description })
      : '';
  const groupTitle = (title: string) => {
    const key = GROUP_I18N[title];
    return key ? t(`settings.groups.${key}`) : title;
  };

  const renderCard = (preset: WallpaperPreset, onPick: (id: string) => void, dark = false) => {
    const selected = activeId === preset.id;
    const Comp = preset.component;
    return (
      <button
        key={preset.id}
        type="button"
        className={`${styles.card} ${selected ? styles.cardActive : ''}`}
        onClick={() => onPick(preset.id)}
        aria-pressed={selected}
      >
        <span className={styles.thumb}>
          {/* 缩略图直接用真实壁纸渲染：组件本身是 position:absolute; inset:0，
              会以卡片为参照系自适应尺寸，所以缩略图和实际效果一模一样 */}
          {Comp ? (
            <span
              className={styles.thumbLive}
              aria-hidden="true"
              style={{ transform: preset.thumbScale ? `scale(${preset.thumbScale})` : undefined }}
            >
              <Comp />
            </span>
          ) : preset.imageUrl ? (
            <span
              className={styles.thumbLive}
              aria-hidden="true"
              style={{ backgroundImage: `url(${preset.imageUrl})`, backgroundSize: 'cover' }}
            />
          ) : (
            <span
              className={styles.thumbLive}
              aria-hidden="true"
              style={{ backgroundImage: preset.thumbCss || (dark ? DARK_THUMB_FALLBACK : '') }}
            />
          )}
          {selected && <span className={styles.check}>✓</span>}
        </span>
        <span className={styles.cardName}>{wallpaperName(preset)}</span>
        {preset.description && <span className={styles.cardDesc}>{wallpaperDesc(preset)}</span>}
      </button>
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <div className={styles.headMain}>
          <Link to="/" className={styles.backLink}>
            ← {t('settings.backHome')}
          </Link>
          <h1 className={styles.title}>{t('settings.title')}</h1>
          <p className={styles.subtitle}>{t('settings.subtitle')}</p>
        </div>
        <div className={styles.headSide}>
          <div
            className={styles.modeSwitch}
            role="group"
            aria-label={`${t('settings.light')} / ${t('settings.dark')}`}
          >
            <button
              type="button"
              className={`${styles.modeBtn} ${!isDarkMode ? styles.modeBtnActive : ''}`}
              onClick={switchToLight}
            >
              {t('settings.light')}
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${isDarkMode ? styles.modeBtnActive : ''}`}
              onClick={switchToDark}
            >
              {t('settings.dark')}
            </button>
          </div>
          <span className={styles.headNote}>
            {isDarkMode
              ? t('settings.currentDark')
              : t('settings.currentLight', { color: themeColor })}
          </span>
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.side} aria-label={t('settings.title')}>
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.sideItem} ${
                item.id === 'language' ? styles.sideItemAccent : ''
              } ${tab === item.id ? styles.sideItemActive : ''}`}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id}
            >
              <span
                className={`${styles.sideIcon} ${
                  item.id === 'language' ? styles.sideIconAccent : ''
                }`}
              >
                <TabIcon id={item.id} />
              </span>
              <span className={styles.sideMeta}>
                <span className={styles.sideLabel}>{t(item.labelKey)}</span>
                <span className={styles.sideNote}>{t(item.noteKey)}</span>
              </span>
              {item.id === 'language' && (
                <span className={styles.sideBadge}>{SUPPORTED_LANGUAGES.length}</span>
              )}
            </button>
          ))}
        </nav>

        <section className={styles.content}>
          {tab === 'appearance' && (
            <>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t('settings.appearanceTitle')}</h2>
                <span className={styles.sectionDesc}>{t('settings.appearanceDesc')}</span>
              </div>

              <div className={styles.noneRow}>
                <button
                  type="button"
                  className={`${styles.noneCard} ${isNone ? styles.cardActive : ''}`}
                  onClick={() => {
                    setLightWallpaper(WALLPAPER_NONE_ID);
                    setWallpaper(WALLPAPER_NONE_ID);
                  }}
                >
                  <span className={styles.noneThumb} />
                  <span className={styles.noneMeta}>
                    <span className={styles.cardName}>{t('settings.noneName')}</span>
                    <span className={styles.cardDesc}>{t('settings.noneDesc')}</span>
                  </span>
                  {isNone && <span className={styles.noneCheck}>✓</span>}
                </button>
              </div>

              {lightGroups.map((group) => (
                <div key={group.title} className={styles.group}>
                  <h3 className={styles.groupTitle}>{groupTitle(group.title)}</h3>
                  <div className={styles.grid}>
                    {group.items.map((p) => renderCard(p, pickLight))}
                  </div>
                </div>
              ))}

              <div className={styles.group}>
                <h3 className={styles.groupTitle}>
                  {t('settings.darkTitle')}
                  <span className={styles.groupNote}>
                    {isDarkMode ? t('settings.darkActive') : t('settings.darkSelectHint')}
                  </span>
                </h3>
                <div className={styles.grid}>
                  {darkPresets.map((p) => renderCard(p, pickDark, true))}
                </div>
              </div>
            </>
          )}

          {tab === 'theme' && (
            <>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t('settings.themeTitle')}</h2>
                <span className={styles.sectionDesc}>{t('settings.themeDesc')}</span>
              </div>
              <div className={styles.swatchGrid}>
                {THEME_PRESETS.map((preset) => {
                  const active = theme === preset.id;
                  const label =
                    preset.id === BLACK_THEME_ID
                      ? t('settings.dark')
                      : t(`themePresets.${preset.id}`, { defaultValue: preset.name });
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      className={`${styles.themeCard} ${active ? styles.themeCardActive : ''}`}
                      onClick={() => setTheme(preset.id)}
                      aria-pressed={active}
                    >
                      <span className={styles.themeDot} style={{ backgroundColor: preset.color }} />
                      <span className={styles.themeName}>{label}</span>
                      {active && <span className={styles.themeCheck}>✓</span>}
                    </button>
                  );
                })}
              </div>
              <p className={styles.hint}>
                {t('settings.currentColor')} <code style={{ color: themeColor }}>{themeColor}</code>
                {isDarkMode && ` · ${t('settings.darkWallpaperHint')}`}
              </p>
            </>
          )}

          {tab === 'font' && (
            <>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t('settings.fontTitle')}</h2>
                <span className={styles.sectionDesc}>{t('settings.fontDesc')}</span>
              </div>
              <div className={styles.optionList}>
                {FONT_LIST.map((font) => {
                  const active = currentFontId === font.id;
                  const isDefault = font.id === DEFAULT_FONT_ID;
                  const label = t(`fontSwitcher.names.${font.id}`, {
                    defaultValue: FONT_LABELS[font.id] || font.id,
                  });
                  return (
                    <button
                      key={font.id}
                      type="button"
                      className={`${styles.optionRow} ${active ? styles.optionRowActive : ''}`}
                      onClick={() => handleFontClick(font.id)}
                      aria-pressed={active}
                    >
                      <span
                        className={styles.optionPreview}
                        style={{ fontFamily: isDefault ? undefined : font.family }}
                      >
                        永
                      </span>
                      <span
                        className={styles.optionText}
                        style={{ fontFamily: isDefault ? undefined : font.family }}
                      >
                        {label}
                      </span>
                      {font.category === 'web' && <span className={styles.tag}>Web</span>}
                      {active && <span className={styles.optionCheck}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {tab === 'language' && (
            <>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t('settings.languageTitle')}</h2>
                <span className={styles.sectionDesc}>{t('settings.languageDesc')}</span>
              </div>
              <div className={styles.langGrid}>
                {SUPPORTED_LANGUAGES.map((code: AppLanguage) => {
                  const active = language === code;
                  const [from, to] = LANG_COLORS[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`${styles.langCard} ${active ? styles.langCardActive : ''}`}
                      onClick={() => setLanguage(code)}
                      aria-pressed={active}
                    >
                      <span
                        className={styles.langBadge}
                        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                      >
                        {LANGUAGE_SHORT[code]}
                      </span>
                      <span className={styles.langName}>{t(`languages.${code}`)}</span>
                      {code === 'en' && (
                        <span className={styles.langDefaultTag}>
                          {t('settings.languageDefault')}
                        </span>
                      )}
                      {active && <span className={styles.langCheck}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {tab === 'mode' && (
            <>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{t('settings.modeTitle')}</h2>
                <span className={styles.sectionDesc}>{t('settings.modeDesc')}</span>
              </div>
              <div className={styles.modeCards}>
                <button
                  type="button"
                  className={`${styles.modeCard} ${mode === 'edit' ? styles.modeCardActive : ''}`}
                  onClick={() => setMode('edit')}
                  aria-pressed={mode === 'edit'}
                >
                  <span className={styles.modeCardTitle}>{t('settings.editTitle')}</span>
                  <span className={styles.modeCardDesc}>{t('settings.editDesc')}</span>
                </button>
                <button
                  type="button"
                  className={`${styles.modeCard} ${mode === 'read' ? styles.modeCardActive : ''}`}
                  onClick={() => setMode('read')}
                  aria-pressed={mode === 'read'}
                >
                  <span className={styles.modeCardTitle}>{t('settings.readTitle')}</span>
                  <span className={styles.modeCardDesc}>{t('settings.readDesc')}</span>
                </button>
              </div>
            </>
          )}
        </section>
      </div>

      <footer className={styles.foot}>
        <button type="button" className={styles.resetBtn} onClick={resetAll}>
          {t('settings.resetAppearance')}
        </button>
        <span className={styles.footNote}>{t('settings.resetNote')}</span>
      </footer>
    </div>
  );
}
