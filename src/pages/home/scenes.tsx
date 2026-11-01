// 首页 Hero 的氛围背景
//
// 为什么不直接复用全局壁纸（components/wallpapers）：
// - 全局壁纸按 1200×800 的整屏竖构图设计，塞进横幅里 preserveAspectRatio="slice"
//   会把底部的山脚、水纹整片裁掉，只剩中间一层灰雾
// - 全局壁纸不区分"这块区域上有没有字"，而 Hero 里压着大标题，背景必须自带色调
//   才能保证文字对比度
// 所以这里按横幅比例另画一套，全部内联 SVG + CSS 渐变，零图片资源。
//
// 只保留「水墨远山」这一套：这是首页固定的氛围底，不再提供切换器。
import type { CSSProperties, ReactNode } from 'react';

/** 场景色调：决定 Hero 上的文字/按钮用深色还是浅色 */
export type HeroSceneTone = 'light' | 'dark';

export interface HeroScene {
  tone: HeroSceneTone;
  render: () => ReactNode;
}

/** 铺满 Hero 的画布 */
function Canvas({ background, children }: { background: string; children?: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, background, overflow: 'hidden' }}
    >
      {children}
    </div>
  );
}

/** 1200×460 横幅视图，slice 保证任何比例都铺满不变形 */
function Layer({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1200 460"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}
    >
      {children}
    </svg>
  );
}

/* ==========================================================================
   水墨远山 —— 宣纸底 + 三层淡墨山峦 + 淡日飞鸟
   ========================================================================== */
function InkMountainScene() {
  return (
    <Canvas background="linear-gradient(180deg, #f8f4e9 0%, #f4f1e6 46%, #e9e9de 100%)">
      {/* 右上暖光 / 左下冷调：模拟宣纸吸墨不匀 */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(760px 420px at 86% -14%, rgba(255,251,236,0.95), transparent 64%),' +
            'radial-gradient(680px 380px at 4% 104%, rgba(198,214,203,0.45), transparent 66%)',
        }}
      />
      <Layer>
        {/* 淡日放在中偏左：右侧留给数据卡，别让卡片刚好压在太阳上像误触 */}
        <circle cx="702" cy="132" r="70" fill="#e9c9a1" opacity="0.26" />
        <circle cx="702" cy="132" r="40" fill="#dfae80" opacity="0.4" />
        {/* 远山：几乎化进雾里 */}
        <path
          d="M0 344 L118 268 L226 322 L352 236 L470 312 L586 262 L706 330 L826 254 L940 318 L1064 250 L1200 312 L1200 460 L0 460 Z"
          fill="#9aa9a0"
          opacity="0.3"
        />
        {/* 中山 */}
        <path
          d="M0 396 L150 322 L286 384 L432 300 L580 380 L736 314 L878 388 L1040 316 L1200 372 L1200 460 L0 460 Z"
          fill="#7b8b82"
          opacity="0.34"
        />
        {/* 近山 */}
        <path
          d="M0 440 L196 392 L392 430 L592 382 L792 432 L992 388 L1200 424 L1200 460 L0 460 Z"
          fill="#59695f"
          opacity="0.36"
        />
        {/* 水纹三条，越远越淡 */}
        {[424, 440, 454].map((y, i) => (
          <path
            key={y}
            d={`M${140 + i * 46} ${y} q 62 -6 124 0 t 124 0 t 124 0`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity={0.3 - i * 0.07}
          />
        ))}
        {/* 飞鸟 */}
        <g stroke="#5c6b62" strokeWidth="2" fill="none" opacity="0.34" strokeLinecap="round">
          <path d="M846 168 q 11 -9 22 0 q 11 -9 22 0" />
          <path d="M918 130 q 8 -7 16 0 q 8 -7 16 0" />
          <path d="M798 136 q 7 -6 14 0 q 7 -6 14 0" />
        </g>
      </Layer>
    </Canvas>
  );
}

export const HERO_SCENE: HeroScene = {
  tone: 'light',
  render: () => <InkMountainScene />,
};

/** Hero 背景层：场景组件自己就是 absolute inset:0，直接垫在内容下面即可 */
export function HeroSceneBackdrop() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {HERO_SCENE.render()}
    </div>
  );
}
