import React from 'react';
import css from './Buttons.module.css';

type Variant = 'brown' | 'white' | 'transparent';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'brown', size = 'md', iconLeft, iconRight, className = '', ...rest },
    ref
  ) => {
    const variantClass =
      variant === 'brown' ? css.btnBrown : variant === 'white' ? css.btnWhite : css.btnTransparent;

    const realSize: Size | null = variant === 'transparent' ? null : size;

    const sizeClass =
      realSize === 'sm'
        ? css.btnSm
        : realSize === 'md'
        ? css.btnMd
        : realSize === 'lg'
        ? css.btnLg
        : realSize === 'xl'
        ? css.btnXl
        : '';

    const buttonClasses = [css.btn, variantClass, sizeClass, className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {iconLeft && <span className={css.iconLeft}>{iconLeft}</span>}
        <span className={css.buttonText}>{children}</span>
        {iconRight && <span className={css.iconRight}>{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
