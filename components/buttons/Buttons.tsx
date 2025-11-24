import React from 'react';
import css from './Buttons.module.css';

type Variant = 'brown' | 'white' | 'transparent' | 'danger' | 'whiteDialog';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<Variant, string> = {
  brown: css.btnBrown,
  white: css.btnWhite,
  transparent: css.btnTransparent,
  danger: css.btnDanger,
  whiteDialog: css.btnWhiteDialog,
};

const SIZE_CLASS: Record<Size, string> = {
  sm: css.btnSm,
  md: css.btnMd,
  lg: css.btnLg,
  xl: css.btnXl,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'brown', size = 'md', iconLeft, iconRight, className, ...rest }, ref) => {
    const variantClass = VARIANT_CLASS[variant];
    const sizeClass = SIZE_CLASS[size];

    const buttonClasses = [css.btn, variantClass, sizeClass, className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {iconLeft && <span className={css.iconLeft}>{iconLeft}</span>}
        {children && <span className={css.buttonText}>{children}</span>}
        {iconRight && <span className={css.iconRight}>{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
