import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CanvasBoard } from 'drawui-react';
import type { Editor, EditorData } from 'drawui-core';
import 'drawui-react/styles.css';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import type { AppLanguage } from '@/i18n';
import { lockPageScroll } from '@/utils/scroll-lock';
import { playgroundPresets } from './presets';
import { useDocsContent } from './content';
import styles from './Drawui.module.less';

/** 站点语言 → drawui 引擎语言码 */
const DRAWUI_LANGUAGE = {
  zh: 'zh-CN',
  'zh-TW': 'zh-TW',
  en: 'en-US',
  ja: 'ja-JP',
  ko: 'ko-KR',
  fr: 'fr-FR',
  de: 'de-DE',
} as const satisfies Record<AppLanguage, string>;

export default function Playground({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [presetId, setPresetId] = useState(playgroundPresets[0].id);
  const [count, setCount] = useState(playgroundPresets[0].shapes.length);
  const editorRef = useRef<Editor | null>(null);
  const { themeColor } = useTheme();
  const { language: appLanguage } = useLanguage();
  const c = useDocsContent().playground;
  const language = DRAWUI_LANGUAGE[appLanguage];

  const activePreset =
    playgroundPresets.find((preset) => preset.id === presetId) ?? playgroundPresets[0];

  useEffect(() => {
    if (!open) return;
    const unlock = lockPageScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey, true);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) editorRef.current = null;
  }, [open]);

  if (!open) return null;

  const applyPreset = (id: string) => {
    const preset = playgroundPresets.find((item) => item.id === id);
    if (!preset) return;
    setPresetId(id);
    setCount(preset.shapes.length);
    const editor = editorRef.current;
    if (editor) {
      editor.setShapes(preset.shapes);
      editor.resetZoom();
    }
  };

  const reset = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.setShapes(activePreset.shapes);
    editor.resetZoom();
    setCount(activePreset.shapes.length);
  };

  const clear = () => {
    editorRef.current?.setShapes([]);
    setCount(0);
  };

  return createPortal(
    <div className={styles.playground}>
      <div className={styles.playgroundHeader}>
        <div className={styles.playgroundTitle}>
          <span className={styles.playgroundBadge}>drawui</span>
          <b>{c.title}</b>
          <span className={styles.playgroundHint}>{c.hint.replace('{count}', String(count))}</span>
        </div>
        <div className={styles.playgroundTools}>
          <div className={styles.presetTabs}>
            {playgroundPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`${styles.presetTab} ${preset.id === presetId ? styles.presetTabActive : ''}`}
                onClick={() => applyPreset(preset.id)}
              >
                {c.presetNames[preset.id] ?? preset.name}
              </button>
            ))}
          </div>
          <button type="button" className={styles.playgroundBtn} onClick={reset}>
            {c.reset}
          </button>
          <button type="button" className={styles.playgroundBtn} onClick={clear}>
            {c.clear}
          </button>
          <button
            type="button"
            className={styles.playgroundClose}
            onClick={onClose}
            aria-label={c.closeAria}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.playgroundBody}>
        <CanvasBoard
          data={activePreset.shapes}
          themeColor={themeColor}
          language={language}
          onChange={(data: EditorData) => setCount(data.shapes.length)}
          onReady={(editor: Editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
