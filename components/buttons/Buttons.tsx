import React from "react";
import css from "./Buttons.module.css";

type Variant = "brown" | "white" | "transparent";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  variant = "brown",
  size = "md",
  iconLeft,
  iconRight,
  className = "",
  ...rest
}: ButtonProps) {
  // Map variant to CSS class
  const variantClass =
    variant === "brown"
      ? css.btnBrown
      : variant === "white"
      ? css.btnWhite
      : css.btnTransparent;

  // Map size to CSS class
  const sizeClass =
    size === "sm"
      ? css.btnSm
      : size === "md"
      ? css.btnMd
      : size === "lg"
      ? css.btnLg
      : css.btnXl;

  const realSize = variant === "transparent" ? null : size;

  const classes = `
  ${css.btn}
  ${css[variant]}
  ${realSize ? css[realSize] : ""}
`;

  const buttonClasses = [css.btn, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...rest}>
      {iconLeft && <span className={css.iconLeft}>{iconLeft}</span>}
      <span className={css.buttonText}>{children}</span>
      {iconRight && <span className={css.iconRight}>{iconRight}</span>}
    </button>
  );
}
