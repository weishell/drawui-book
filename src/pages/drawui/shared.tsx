import { useEffect, useRef, useState, type ReactNode } from 'react';
import { renderToCanvas } from 'drawui-core';
import type { Shape } from 'drawui-core';
import { useDocsContent } from './content';
import styles from './Drawui.module.less';

/** 用 drawui-core 的真实渲染器把图形画到 canvas 上，保证官网配图与产品输出一致。 */
export function CanvasFigure({
  shapes,
  height = 210,
  background = '#ffffff',
  padding = 18,
}: {
  shapes: Shape[];
  height?: number;
  background?: string;
  padding?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || shapes.length === 0) return;
    try {
      const source = renderToCanvas(shapes, {
        padding,
        scale: 2,
        background,
        maxSize: 1600,
      });
      el.width = source.width;
      el.height = source.height;
      const ctx = el.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.drawImage(source, 0, 0);
    } catch (err) {
      console.warn('[drawui-docs] canvas render failed', err);
    }
  }, [shapes, background, padding]);

  return (
    <div className={styles.figure} style={{ height }}>
      <canvas ref={canvasRef} className={styles.figureCanvas} aria-hidden="true" />
    </div>
  );
}

export function CodeBlock({
  code,
  label,
  language = 'ts',
}: {
  code: string;
  label?: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  const common = useDocsContent().common;

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 剪贴板不可用时保持原样 */
    }
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHead}>
        <span className={styles.codeLabel}>{label ?? language}</span>
        <button type="button" className={styles.copyBtn} onClick={copy}>
          {copied ? common.copied : common.copy}
        </button>
      </div>
      <pre className={styles.codePre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DocSection({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {desc && <p className={styles.sectionDesc}>{desc}</p>}
      {children}
    </section>
  );
}

export function ApiTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.apiTable}>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 浏览器窗口形式的 Hero 演示框：内部是真实画布渲染结果。 */
export function WindowMock({ shapes }: { shapes: Shape[] }) {
  return (
    <div className={styles.window}>
      <div className={styles.windowBar}>
        <span className={styles.windowDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.windowTitle}>drawui canvas</span>
        <span className={styles.windowTools}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={styles.windowBody}>
        <CanvasFigure shapes={shapes} height={252} padding={22} />
      </div>
    </div>
  );
}

export function Badge({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'accent';
}) {
  return (
    <span className={`${styles.badge} ${tone === 'accent' ? styles.badgeAccent : ''}`}>
      {children}
    </span>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}>
          <span className={styles.checkMark} aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
