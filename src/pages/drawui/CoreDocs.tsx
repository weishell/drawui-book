import { Link } from 'react-router-dom';
import { CanvasFigure, CodeBlock, DocSection, Badge, ApiTable, CheckList } from './shared';
import { mindMapShapes } from './presets';
import { useDocsContent } from './content';
import styles from './Drawui.module.less';

export default function CoreDocs() {
  const c = useDocsContent().core;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.eyebrow}>drawui-core</div>
        <h1 className={styles.pageTitle}>{c.pageTitle}</h1>
        <p className={styles.pageLead}>{c.pageLead}</p>
        <div className={styles.metaRow}>
          {c.badges.map((badge, index) => (
            <Badge key={badge} tone={index === 0 ? 'accent' : 'default'}>
              {badge}
            </Badge>
          ))}
        </div>
      </header>

      <div className={styles.splitShowcase}>
        <CanvasFigure shapes={mindMapShapes} height={228} padding={20} />
        <div className={styles.splitCopy}>
          <h3>{c.split.title}</h3>
          <p>{c.split.body}</p>
          <CheckList items={c.split.points} />
        </div>
      </div>

      <DocSection id="features" title={c.featuresSection.title}>
        <div className={styles.featureList}>
          {c.features.map((feature) => (
            <div key={feature.title} className={styles.featureRow}>
              <span className={styles.featureDot} aria-hidden="true" />
              <div>
                <b>{feature.title}</b>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="quickstart" title={c.quickstartSection.title} desc={c.quickstartSection.desc}>
        <CodeBlock label="bash" language="bash" code={`npm install drawui-core`} />
        <CodeBlock
          label="board.ts"
          code={`import { Editor } from 'drawui-core'

const canvas = document.getElementById('board') as HTMLCanvasElement

const editor = new Editor(canvas, {
  language: 'zh-CN',
  persist: true, // 默认写入 localStorage；传入 shapes 时自动关闭
})

editor.subscribe(() => {
  console.log('图形或相机发生变化')
})

editor.setShapes([
  {
    id: 'r1',
    type: 'rectangle',
    x: 120, y: 100, width: 180, height: 90, rotation: 0,
    text: 'Hello drawui',
    style: {
      strokeColor: '#3370ff',
      fillColor: '#eef4ff',
      strokeWidth: 2,
      strokeDash: null,
    },
  },
])`}
        />

        <h3 className={styles.miniTitle}>{c.quickstart.optionsTitle}</h3>
        <ApiTable head={c.quickstart.tableHead} rows={c.quickstart.tableRows} />
      </DocSection>

      <DocSection id="api" title={c.apiSection.title}>
        <h3 className={styles.miniTitle}>{c.apiSection.exportsTitle}</h3>
        <ApiTable head={c.apiSection.exportsHead} rows={c.apiSection.exportsRows} />

        <h3 className={styles.miniTitle}>{c.apiSection.methodsTitle}</h3>
        <ApiTable head={c.apiSection.methodsHead} rows={c.apiSection.methodsRows} />

        <CodeBlock
          label="export.ts"
          code={`// 导出整幅画布
const blob = await editor.exportImage('png', {
  scale: 2,
  padding: 24,
  background: '#ffffff',
})

// 无编辑器也能出图：适合生成缩略图 / 分享图
import { renderToCanvas, renderSVGString } from 'drawui-core'

const canvas = renderToCanvas(shapes, { scale: 2, background: '#ffffff' })
const svg = renderSVGString(shapes, { padding: 24 })`}
        />
      </DocSection>

      <DocSection id="image" title={c.image.title} desc={c.image.desc}>
        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.miniTitle}>{c.image.channelA}</h3>
            <CodeBlock
              label="config.ts"
              code={`const editor = new Editor(canvas, {
  imageUpload: {
    url: 'https://api.example.com/upload',
    method: 'POST',
    headers: { Authorization: 'Bearer <token>' },
    responseUrlPath: 'data.url',
    timeoutMs: 60000,
    maxSizeBytes: 30 * 1024 * 1024,
  },
})`}
            />
          </div>
          <div>
            <h3 className={styles.miniTitle}>{c.image.channelB}</h3>
            <CodeBlock
              label="uploader.ts"
              code={`const editor = new Editor(canvas, {
  imageUpload: async (file: File) => {
    // 适合 OSS STS 直传、分片、压缩、重试
    const res = await myUpload(file)
    return res.url // 返回可访问的图片地址
  },
})`}
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
        <Link className={styles.primaryBtn} to="/drawui/react">
          {c.next.link}
        </Link>
      </div>
    </div>
  );
}
