import type { CSSProperties } from 'react';
export function Handwritten({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`handwritten ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {Array.from(text).map((letter, index) => (
          <span
            className="written-letter"
            key={`${index}-${letter}`}
            style={
              { '--letter-delay': `${delay + index * 0.07}s` } as CSSProperties
            }
          >
            {letter === ' ' ? '\u00a0' : letter}
          </span>
        ))}
      </span>
    </span>
  );
}
export function InkLine() {
  return (
    <svg
      className="ink-line"
      viewBox="0 0 440 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        pathLength="1"
        d="M8 22C86 7 216 10 324 12S407 13 429 8"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        pathLength="1"
        d="M48 28C159 19 321 22 397 17"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
