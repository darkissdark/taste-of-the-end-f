import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import type { MouseEvent } from 'react';
import css from './FavoriteButtonIcon.module.css';
interface Props {
  isFavorite: boolean;
  loading: boolean;
  toggleFavorite: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export function FavoriteButtonIcon({ isFavorite, loading, toggleFavorite }: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    void toggleFavorite(event);
  };

  return (
    <button
      className={isFavorite ? css.favoriteButton : css.notFavoriteButton}
      title={isFavorite ? 'Unsave recipe' : 'Save recipe'}
      disabled={loading}
      onClick={toggleFavorite}
    >
      <SvgIcon name="save_tooth" />
    </button>
  );
}
