"use client";

type Props = {
  name: string;
  size?: number | string;
  className?: string;
  title?: string;
  role?: string;
};

export function SvgIcon({ name, size = 24, className, title, role }: Props) {
  const aria = title
    ? { role: role ?? "img", "aria-label": title }
    : { "aria-hidden": true };
  return (
    <svg width={size} height={size} className={className} {...aria}>
      <use href={`#${name}`} />
    </svg>
  );
}
