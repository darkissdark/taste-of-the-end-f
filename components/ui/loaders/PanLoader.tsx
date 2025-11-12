import type { SVGProps } from "react";
import styles from "./PanLoader.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "large";
}

const dropCoordinates: Record<number, { cx: number; cy: number }> = {
  1: { cx: 13, cy: 60 },
  2: { cx: 13, cy: 60 },
  3: { cx: 67, cy: 72 },
  4: { cx: 67, cy: 72 },
  5: { cx: 67, cy: 72 },
};

const PanLoader = ({ size = "small" }: LoadingSpinnerProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <svg
        className={styles.loader}
        viewBox="0 0 128 128"
        role="img"
        aria-label="Pan animation"
      >
        <clipPath id="pan-loader-clip">
          <rect rx="12" ry="14" x="4" y="52" width="68" height="28" />
        </clipPath>

        <defs>
          <linearGradient id="pan-loader-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>

          <mask id="pan-loader-mask">
            <rect
              x="0"
              y="0"
              width="88"
              height="80"
              fill="url(#pan-loader-gradient)"
            />
          </mask>
        </defs>

        <g fill="currentColor">
          <g
            fill="none"
            strokeDasharray="20 221"
            strokeDashoffset="20"
            strokeLinecap="round"
            strokeWidth="4"
          >
            <g stroke="hsl(38, 90%, 50%)">
              <circle
                className={styles.ring}
                cx="44"
                cy="40"
                r="35"
                transform="rotate(90,44,40)"
              />
            </g>
            <g stroke="hsl(8, 90%, 40%)" mask="url(#pan-loader-mask)">
              <circle
                className={styles.ring}
                cx="44"
                cy="40"
                r="35"
                transform="rotate(90,44,40)"
              />
            </g>
          </g>

          <g fill="transparent">
            {[1, 2, 3, 4, 5].map((n) => {
              const { cx, cy } = dropCoordinates[n];
              const dropClassName = `${styles.drop} ${styles[`drop${n}`]}`;
              return (
                <g key={n} className={dropClassName}>
                  <circle className={styles.dropInner} cx={cx} cy={cy} r="2" />
                </g>
              );
            })}
          </g>

          <g className={styles.pan}>
            <rect
              rx="2"
              ry="2"
              x="4"
              y="66"
              width="68"
              height="14"
              clipPath="url(#pan-loader-clip)"
            />
            <rect rx="2" ry="2" x="76" y="66" width="48" height="7" />
          </g>

          <rect
            className={styles.shadow}
            rx="3.5"
            ry="3.5"
            x="10"
            y="121"
            width="60"
            height="7"
          />
        </g>
      </svg>
    </div>
  );
};

export default PanLoader;
