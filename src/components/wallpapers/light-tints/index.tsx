// 浅色柔和壁纸（护眼系列）
// - 全部为纯 CSS 渐变 + 极轻装饰，静态或近乎静态，不干扰正文阅读
// - tint：整体色调，染到顶栏/容器；paper：编辑纸面底色（高不透明度，保证深色文字可读）
// - 两者由 WallpaperHost 写入 CSS 变量 --lw-tint / --lw-paper
import type { CSSProperties, ReactNode } from 'react';

function SoftTint({ background, children }: { background: string; children?: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

const blob = (top: string, left: string, size: string, color: string): CSSProperties => ({
  position: 'absolute',
  top,
  left,
  width: size,
  height: size,
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
});

/** 豆沙绿护眼 —— 经典护眼绿，柔光斑点点 */
export function GreenEyeWallpaper() {
  return (
    <SoftTint background="linear-gradient(180deg, #d9efde 0%, #cde9d5 48%, #c4e3cd 100%)">
      <span style={blob('8%', '12%', '34vw', 'rgba(255,255,255,0.55)')} />
      <span style={blob('55%', '78%', '40vw', 'rgba(163,214,178,0.5)')} />
      <span style={blob('78%', '6%', '30vw', 'rgba(178,220,190,0.45)')} />
    </SoftTint>
  );
}

/** 晨雾青 —— 淡青渐变 + 远山与薄日 */
export function MistMorningWallpaper() {
  return (
    <SoftTint background="linear-gradient(180deg, #e2f0f4 0%, #d3e9ee 42%, #d8eee6 100%)">
      {/* 薄日 */}
      <span
        style={{
          position: 'absolute',
          top: '9%',
          right: '16%',
          width: 74,
          height: 74,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 38% 34%, rgba(255,252,240,0.95), rgba(255,238,200,0.55) 60%, transparent 75%)',
        }}
      />
      {/* 远山两叠 */}
      <span
        style={{
          position: 'absolute',
          bottom: '-4%',
          left: '-6%',
          right: '-6%',
          height: '26%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(154,196,188,0.35) 100%)',
          clipPath:
            'polygon(0 62%, 14% 38%, 30% 58%, 47% 30%, 63% 56%, 80% 36%, 100% 60%, 100% 100%, 0 100%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '-4%',
          left: '-6%',
          right: '-6%',
          height: '18%',
          background: 'rgba(140,186,178,0.4)',
          clipPath:
            'polygon(0 70%, 22% 44%, 42% 68%, 61% 40%, 82% 66%, 100% 48%, 100% 100%, 0 100%)',
        }}
      />
    </SoftTint>
  );
}

/** 湖畔清晨 —— 淡蓝天光 + 远山与湖面倒影 */
export function LakeMorningWallpaper() {
  return (
    <SoftTint background="linear-gradient(180deg, #e8f3f8 0%, #dcebf2 48%, #d3e4ee 100%)">
      {/* 晨光 */}
      <span
        style={{
          position: 'absolute',
          top: '8%',
          left: '62%',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 44% 40%, rgba(255,252,238,0.9), rgba(255,243,214,0.4) 58%, transparent 76%)',
        }}
      />
      {/* 远山 */}
      <span
        style={{
          position: 'absolute',
          top: '46%',
          left: '-6%',
          right: '-6%',
          height: '16%',
          background: 'rgba(148,182,200,0.38)',
          clipPath:
            'polygon(0 74%, 16% 38%, 32% 66%, 50% 28%, 68% 62%, 84% 40%, 100% 68%, 100% 100%, 0 100%)',
        }}
      />
      {/* 湖面（下 1/3） + 倒影光带 */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '34%',
          background:
            'linear-gradient(180deg, rgba(196,222,236,0.55) 0%, rgba(208,230,240,0.7) 100%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '16%',
          left: '58%',
          width: '26%',
          height: 3,
          borderRadius: 3,
          background: 'rgba(255,250,235,0.6)',
        }}
      />
    </SoftTint>
  );
}
