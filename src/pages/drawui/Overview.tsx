import { Link } from 'react-router-dom';
import { useDrawuiDocs } from './DrawuiLayout';
import { CanvasFigure, WindowMock, CodeBlock, DocSection, Badge, CheckList } from './shared';
import { useDocsContent } from './content';
import {
  flowchartShapes,
  mindMapShapes,
  tableShapes,
  umlShapes,
  stickyShapes,
  shapeGallery,
  compactFlow,
  compactGallery,
  heroShapes,
} from './presets';
import styles from './Drawui.module.less';

// 图形数据不参与翻译，按顺序与文案数组一一对应
const FEATURE_SHAPES = [
  compactGallery,
  mindMapShapes,
  tableShapes,
  umlShapes,
  stickyShapes,
  compactFlow,
];

const GALLERY_SHAPES = [
  flowchartShapes,
  mindMapShapes,
  tableShapes,
  umlShapes,
  shapeGallery,
  stickyShapes,
];

export default function DrawuiOverview() {
  const { openPlayground } = useDrawuiDocs();
  const c = useDocsContent().overview;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>{c.eyebrow}</div>
          <h1 className={styles.heroTitle}>
            {c.heroTitleLines[0]}
            <br />
            {c.heroTitleLines[1]}
          </h1>
          <p className={styles.heroLead}>{c.heroLead}</p>
          <div className={styles.metaRow}>
            <Badge tone="accent">v0.6.0</Badge>
            {c.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <div className={styles.heroActions}>
            <Link to="/drawui/react" className={styles.primaryBtn}>
              {c.heroActions.startReact}
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/drawui/core" className={styles.ghostBtn}>
              {c.heroActions.learnCore}
            </Link>
            <button type="button" className={styles.textBtn} onClick={openPlayground}>
              {c.heroActions.openPlayground}
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <WindowMock shapes={heroShapes} />
          <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
            <span className={styles.floatIcon}>↺</span>
            <span>
              <b>{c.floatCards.undoTitle}</b>
              <small>{c.floatCards.undoDesc}</small>
            </span>
          </div>
          <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
            <span className={styles.floatIcon}>⇧</span>
            <span>
              <b>{c.floatCards.dragTitle}</b>
              <small>{c.floatCards.dragDesc}</small>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        {c.stats.map((item) => (
          <div key={item.label} className={styles.stat}>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <DocSection id="features" title={c.featuresSection.title} desc={c.featuresSection.desc}>
        <div className={styles.featureGrid}>
          {c.features.map((feature, index) => (
            <article key={feature.title} className={styles.featureCard}>
              <CanvasFigure shapes={FEATURE_SHAPES[index]} height={214} padding={16} />
              <div className={styles.featureBody}>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </DocSection>

      <DocSection id="packages" title={c.packagesSection.title} desc={c.packagesSection.desc}>
        <div className={styles.packageGrid}>
          <article className={styles.packageCard}>
            <div className={styles.packageHead}>
              <span className={styles.packageName}>drawui-core</span>
              <Badge>{c.packages.coreTag}</Badge>
            </div>
            <p className={styles.packageDesc}>{c.packages.coreDesc}</p>
            <CheckList items={c.packages.corePoints} />
            <CodeBlock
              label="core.ts"
              code={`import { Editor } from 'drawui-core'

const canvas = document.getElementById('board') as HTMLCanvasElement
const editor = new Editor(canvas, { language: 'zh-CN' })
editor.subscribe(() => console.log('changed'))`}
            />
          </article>

          <article className={styles.packageCard}>
            <div className={styles.packageHead}>
              <span className={styles.packageName}>drawui-react</span>
              <Badge tone="accent">{c.packages.reactTag}</Badge>
            </div>
            <p className={styles.packageDesc}>{c.packages.reactDesc}</p>
            <CheckList items={c.packages.reactPoints} />
            <CodeBlock
              label="App.tsx"
              code={`import { CanvasBoard } from 'drawui-react'
import 'drawui-react/styles.css'

<CanvasBoard
  themeColor="#3370ff"
  language="zh-CN"
  onChange={(data) => console.log(data.shapes.length)}
/>`}
            />
          </article>
        </div>
      </DocSection>

      <DocSection id="gallery" title={c.gallerySection.title} desc={c.gallerySection.desc}>
        <div className={styles.galleryGrid}>
          {c.gallery.map((item, index) => (
            <figure key={item.title} className={styles.galleryCard}>
              <CanvasFigure shapes={GALLERY_SHAPES[index]} height={198} padding={14} />
              <figcaption>
                <b>{item.title}</b>
                <span>{item.desc}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </DocSection>

      <DocSection id="quickstart" title={c.quickstartSection.title} desc={c.quickstartSection.desc}>
        <div className={styles.quickGrid}>
          <div>
            <h3 className={styles.miniTitle}>{c.quickstart.installTitle}</h3>
            <CodeBlock
              label="bash"
              language="bash"
              code={`npm install drawui-react\n# drawui-core 会自动安装`}
            />
          </div>
          <div>
            <h3 className={styles.miniTitle}>{c.quickstart.renderTitle}</h3>
            <CodeBlock
              label="App.tsx"
              code={`import { CanvasBoard } from 'drawui-react'
import 'drawui-react/styles.css'

export default function App() {
  return <CanvasBoard themeColor="#3370ff" />
}`}
            />
          </div>
        </div>
        <div className={styles.callout}>
          <span className={styles.calloutIcon}>i</span>
          <p>{c.quickstart.callout}</p>
        </div>
      </DocSection>

      <DocSection id="scenes" title={c.scenesSection.title} desc={c.scenesSection.desc}>
        <div className={styles.sceneGrid}>
          {c.scenes.map((scene, index) => (
            <article key={scene.title} className={styles.sceneCard}>
              <span className={styles.sceneIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{scene.title}</h3>
              <p>{scene.desc}</p>
              <ul>
                {scene.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </DocSection>

      <div className={styles.endCap}>
        <div>
          <h2>{c.end.title}</h2>
          <p>{c.end.desc}</p>
        </div>
        <div className={styles.endActions}>
          <button type="button" className={styles.primaryBtn} onClick={openPlayground}>
            {c.end.open}
          </button>
          <Link to="/drawui/react" className={styles.ghostBtn}>
            {c.end.react}
          </Link>
        </div>
      </div>
    </div>
  );
}
