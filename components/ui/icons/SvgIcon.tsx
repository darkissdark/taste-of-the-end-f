'use client';

type Props = {
  name: string;
  size?: number | string;
  className?: string;
  title?: string;
  role?: string;
  style?: React.CSSProperties;
};

export function SvgIcon({ name, size = 24, className, title, role, style }: Props) {
  const aria = title
    ? { role: role ?? 'img', 'aria-label': title }
    : { 'aria-hidden': true as const };
  return (
    <svg width={size} height={size} className={className} style={style} focusable="false" {...aria}>
      <use href={`#${name}`} />
    </svg>
  );
}
