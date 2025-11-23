import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import type { MouseEventHandler } from 'react';
import css from './FavoriteButtonIcon.module.css';
interface Props {
  isFavorite: boolean;
  loading: boolean;
  toggleFavorite: MouseEventHandler<HTMLButtonElement>;
}

export function FavoriteButtonIcon({ isFavorite, loading, toggleFavorite }: Props) {
  return (
    <button
      className={isFavorite ? css.favoriteButton : css.notFavoriteButton}
      disabled={loading}
      onClick={toggleFavorite}
    >
      <SvgIcon name="save_tooth" />
    </button>
  );
}
