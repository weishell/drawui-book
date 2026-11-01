import { CanvasFigure, CodeBlock, DocSection, Badge, ApiTable, CheckList } from './shared';
import { tableShapes } from './presets';
import { useDrawuiDocs } from './DrawuiLayout';
import { useDocsContent } from './content';
import styles from './Drawui.module.less';

export default function ReactDocs() {
  const { openPlayground } = useDrawuiDocs();
  const c = useDocsContent().react;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.eyebrow}>drawui-react</div>
        <h1 className={styles.pageTitle}>{c.pageTitle}</h1>
        <p className={styles.pageLead}>{c.pageLead}</p>
        <div className={styles.metaRow}>
          {c.badges.map((badge, index) => (
            <Badge key={badge} tone={index === 0 ? 'accent' : 'default'}>
              {badge}
            </Badge>
          ))}
        </div>
        <div className={styles.heroActions}>
          <button type="button" className={styles.primaryBtn} onClick={openPlayground}>
            {c.heroActions.openPlayground}
          </button>
          <a
            className={styles.ghostBtn}
            href="https://www.npmjs.com/package/drawui-react"
            target="_blank"
            rel="noreferrer"
          >
            {c.heroActions.npm}
          </a>
        </div>
      </header>

      <div className={styles.splitShowcase}>
        <CanvasFigure shapes={tableShapes} height={210} padding={18} />
        <div className={styles.splitCopy}>
          <h3>{c.split.title}</h3>
          <p>{c.split.body}</p>
          <CheckList items={c.split.points} />
        </div>
      </div>

      <DocSection id="features" title={c.featuresSection.title}>
        <div className={styles.cardGrid}>
          {c.features.map((feature) => (
            <article key={feature.title} className={styles.simpleCard}>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </DocSection>

      <DocSection id="quickstart" title={c.quickstartSection.title} desc={c.quickstartSection.desc}>
        <CodeBlock label="bash" language="bash" code={`npm install drawui-react`} />
        <CodeBlock
          label="App.tsx"
          code={`import { CanvasBoard } from 'drawui-react'
import 'drawui-react/styles.css'
import type { Editor, EditorData } from 'drawui-core'

export function App() {
  return (
    <CanvasBoard
      themeColor="#3370ff"
      language="zh-CN"
      onChange={(data: EditorData) => console.log(data.shapes.length)}
      onReady={(editor: Editor) => editor.setShapes([])}
    />
  )
}`}
        />
        <div className={styles.callout}>
          <span className={styles.calloutIcon}>i</span>
          <p>{c.quickstart.callout}</p>
        </div>
      </DocSection>

      <DocSection id="props" title={c.props.title}>
        <ApiTable head={c.props.tableHead} rows={c.props.tableRows} />

        <h3 className={styles.miniTitle}>{c.props.exportsTitle}</h3>
        <ApiTable head={c.props.exportsHead} rows={c.props.exportsRows} />

        <CodeBlock
          label="ref-control.tsx"
          code={`import { useRef } from 'react'
import { CanvasBoard } from 'drawui-react'
import type { Editor } from 'drawui-core'

const editorRef = useRef<Editor | null>(null)

<CanvasBoard
  data={initialShapes}
  onReady={(editor) => { editorRef.current = editor }}
/>

// 之后任意位置：
// editorRef.current?.undo()
// editorRef.current?.exportJSON()
// editorRef.current?.exportImage('png', { scale: 2 })`}
        />
      </DocSection>

      <DocSection id="image" title={c.image.title}>
        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.miniTitle}>{c.image.channelA}</h3>
            <CodeBlock
              label="App.tsx"
              code={`<CanvasBoard
  imageUpload={{
    url: 'https://api.example.com/upload',
    responseUrlPath: 'data.url',
    maxSizeBytes: 30 * 1024 * 1024,
  }}
/>`}
            />
          </div>
          <div>
            <h3 className={styles.miniTitle}>{c.image.channelB}</h3>
            <CodeBlock
              label="App.tsx"
              code={`<CanvasBoard
  imageUpload={async (file: File) => {
    const res = await uploadToOss(file)
    return res.url
  }}
/>`}
            />
          </div>
        </div>
        <div className={styles.callout}>
          <span className={styles.calloutIcon}>i</span>
          <p>{c.image.callout}</p>
        </div>
      </DocSection>

      <DocSection id="changelog" title={c.changelogSection.title} desc={c.changelogSection.desc}>
        <div className={styles.timeline}>
          {c.changelog.map((item) => (
            <article key={item.version} className={styles.timelineItem}>
              <div className={styles.timelineHead}>
                <b>{item.version}</b>
                <span>{item.date}</span>
              </div>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </DocSection>

      <div className={styles.nextCard}>
        <div>
          <h3>{c.next.title}</h3>
          <p>{c.next.desc}</p>
        </div>
        <button type="button" className={styles.primaryBtn} onClick={openPlayground}>
          {c.next.button}
        </button>
      </div>
    </div>
  );
}
