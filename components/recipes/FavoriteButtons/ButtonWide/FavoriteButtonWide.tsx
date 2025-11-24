import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import type { MouseEventHandler } from 'react';
import css from './FavoriteButtonWide.module.css';
interface Props {
  isFavorite: boolean;
  loading: boolean;
  toggleFavorite: MouseEventHandler<HTMLButtonElement>;
}

export function FavoriteButtonWide({ isFavorite, loading, toggleFavorite }: Props) {
  return (
    <button className={css.favoriteButton} disabled={loading} onClick={toggleFavorite}>
      <span>{isFavorite ? 'Unsave' : 'Save'}</span>
      <SvgIcon className={isFavorite ? css.favoriteActive : css.noFavorite} name="save_tooth" />
    </button>
  );
}
